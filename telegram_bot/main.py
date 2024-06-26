from telegram_social_bot import TelegramSocialBot
from server import Server
from dotenv import load_dotenv

if __name__ == "__main__":
    load_dotenv(override=True)
    server = Server()
    bot = TelegramSocialBot(server)
    bot.run()
