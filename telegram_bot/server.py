import asyncio
import json
from os import environ
import websockets


class Server:
    def __init__(self) -> None:
        self.__connections = set()

    async def register(self, websocket) -> None:
        self.__connections.add(websocket)
        print(f"New connection: {websocket}")
        try:
            await websocket.wait_closed()
        finally:
            self.__connections.remove(websocket)
            print(f"Connection removed: {websocket}")

    async def send(self, message: dict) -> None:
        print(f"Broadcasting message: {message}")
        websockets.broadcast(self.__connections, json.dumps(message))

    async def run(self) -> None:
        port = environ["VITE_WEBSOCKET_PORT"]
        print("Opening web socket")
        try:
            async with websockets.serve(self.register, "localhost", port):
                await asyncio.Future()  # run forever
        except:
            print("Closing socket")
