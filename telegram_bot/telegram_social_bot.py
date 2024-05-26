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

    async def handle_message(
        self, update: Update, context: ContextTypes.DEFAULT_TYPE
    ) -> None:
        """Sends a message to the telegram wall"""

        message = update.message
        user = message.from_user
        username = user.username
        if username in self.__auth_users:
            print(message)
            displayName = f"{user.first_name} {user.last_name}"

            user_profile_photos = await context.bot.get_user_profile_photos(user.id)

            if user_profile_photos.total_count > 0:
                photo = user_profile_photos.photos[0][
                    0
                ]  # Get the lowest resolution photo
                file_id = photo.file_id
                file = await context.bot.get_file(file_id)

            await self.__server.send(
                {
                    "message": message.text,
                    "name": displayName,
                    "profile_picture_url": file.file_path,
                }
            )

        else:
            await update.message.reply_text(
                "Sorry! Use /password to authenticate before sending your message."
            )

    async def post_init(self, application):
        self.__server_task = asyncio.create_task(self.__server.run())

    async def post_shutdown(self, application):
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
