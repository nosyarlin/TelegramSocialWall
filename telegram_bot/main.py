from os import wait
import time
from telegram_social_bot import TelegramSocialBot
from server import Server
from dotenv import load_dotenv
import asyncio

if __name__ == '__main__':
    load_dotenv()

    try:
        # start websocket server
        server = Server()
        loop = asyncio.get_event_loop()
        server_task = loop.create_task(server.run())

        # start telegram bot
        bot = TelegramSocialBot(server)
        bot.run()

    finally:
        server_task.cancel()
        loop.run_until_complete(server_task)
        server_task.exception()
        loop.close()
