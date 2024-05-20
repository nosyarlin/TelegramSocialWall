import re
from dotenv import load_dotenv
from os import environ
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    ContextTypes,
    CommandHandler,
    MessageHandler,
    filters,
)


auth_users = set()


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
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


async def password(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Authenticates a user"""

    password_pattern = "/password ([A-Z]+)"
    text = update.message.text
    result = re.match(password_pattern, text)
    if result is None or result.group(1) != environ["PASSWORD"]:
        await update.message.reply_text("Sorry! You got the wrong password!")
    else:
        auth_users.add(update.message.chat.username)
        await update.message.reply_text(
            "You have been authenticated! All future messages and photos will be sent to the wall."
        )


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Sends a message to the telegram wall"""

    username = update.message.chat.username
    if username in auth_users:
        print(update.message.text)
    else:
        await update.message.reply_text(
            "Sorry! Use /password to authenticate before sending your message."
        )


def main():
    load_dotenv()
    token = environ["TELEGRAM_BOT_TOKEN"]

    application = ApplicationBuilder().token(token).build()

    start_handler = CommandHandler("start", start)
    help_handler = CommandHandler("help", start)
    password_handler = CommandHandler("password", password)
    message_handler = MessageHandler(filters.PHOTO | filters.TEXT, handle_message)

    application.add_handler(start_handler)
    application.add_handler(help_handler)
    application.add_handler(password_handler)
    application.add_handler(message_handler)

    application.run_polling()


if __name__ == "__main__":
    main()
