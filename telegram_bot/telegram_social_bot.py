from ast import If
import asyncio
import re
from os import environ
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
    MessageHandler,
    filters,
    ExtBot
)

from server import Server


class TelegramSocialBot:
    def __init__(self, server: Server) -> None:
        self.__auth_users = set()
        self.__server = server

    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Explains what commands are available"""

        await context.bot.send_message(
            chat_id=update.effective_chat.id,
            text="""
    I can post your messages to the telegram wall!
    You can control me by sending these commands:

    /help - see available commands
    /password - authenticate yourself using the provided password

    Once you have been authenticated, I will post your messages to the wall
            """,
        )

    async def password(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Authenticates a user"""

        password_pattern = "/password ([A-Z]+)"
        text = update.message.text
        result = re.match(password_pattern, text)
        if result is None or result.group(1) != environ["VITE_TELEGRAM_BOT_PASSWORD"]:
            await update.message.reply_text("Sorry! You got the wrong password!")
        else:
            self.__auth_users.add(update.message.chat.username)
            await update.message.reply_text(
                "You have been authenticated! All future messages and photos will be sent to the wall."
            )

    async def get_profile_photo_src(self, user_id: int, bot: ExtBot) -> str | None:
        user_profile_photos = await bot.get_user_profile_photos(user_id)
        if user_profile_photos.total_count <= 0:
            return None

        profile_photo = user_profile_photos.photos[0][
            0
        ]  # Get the lowest resolution photo
        profile_photo_file = await profile_photo.get_file()
        return profile_photo_file.file_path

    async def handle_message(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ) -> None:
        """Sends a message to the telegram wall"""

        message = update.message
        if message is None:
            return

        user = message.from_user
        if user is None:
            return;

        username = user.username

        if username not in self.__auth_users:
            return await update.message.reply_text(
                "Sorry! Use /password to authenticate before sending your message."
            )

        print(message)
        displayName = f"{user.first_name} {user.last_name}"

        try:
            # Get profile photo
            profile_photo_file_path = await self.get_profile_photo_src(user.id, context.bot)

            # Get photo in message if any
            content_photo_file_path = None
            if len(message.photo) > 0:
                content_photo = message.photo[-1] # Get highest resolution photo
                content_photo_file = await content_photo.get_file()
                content_photo_file_path = content_photo_file.file_path

            await self.__server.send(
                {
                    "id": message.id,
                    "text": message.text or message.caption,
                    "photoSrc": content_photo_file_path,
                    "name": displayName,
                    "avatarSrc": profile_photo_file_path,
                }
            )
        except Exception as e:
            print(e)

    async def post_init(self, _):
        self.__server_task = asyncio.create_task(self.__server.run())

    async def post_shutdown(self, _):
        self.__server_task.cancel()
        await self.__server_task

    def run(self) -> None:
        token = environ["TELEGRAM_BOT_TOKEN"]

        application = (
            ApplicationBuilder()
            .token(token)
            .post_init(self.post_init)
            .post_shutdown(self.post_shutdown)
            .build()
        )

        start_handler = CommandHandler("start", self.start)
        help_handler = CommandHandler("help", self.start)
        password_handler = CommandHandler("password", self.password)
        message_handler = MessageHandler(
            filters.PHOTO | filters.TEXT, self.handle_message
        )

        application.add_handler(start_handler)
        application.add_handler(help_handler)
        application.add_handler(password_handler)
        application.add_handler(message_handler)

        print("Telegram bot is starting up")

        application.run_polling()
