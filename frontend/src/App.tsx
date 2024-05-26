import { Message } from "./components/MessageList/MessageListItem";
import { MessageList } from "./components/MessageList/MessageList";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { Stack, Typography } from "@mui/material";

function App() {
  const port = import.meta.env.VITE_WEBSOCKET_PORT;
  const url = `ws://localhost:${port}/`;

  const [totalCount, setTotalCount] = useState(0);
  const [column1, setColumn1] = useState<Message[]>([]);
  const [column2, setColumn2] = useState<Message[]>([]);
  const [column3, setColumn3] = useState<Message[]>([]);
  const setColumnFuncs = [setColumn1, setColumn2, setColumn3];

  useWebSocket(url, {
    onOpen: () => console.log("opened"),
    onMessage: (event: WebSocketEventMap["message"]) => {
      const message = JSON.parse(event.data);
      const setColumnFunc = setColumnFuncs[totalCount % 3];
      setColumnFunc((prevColumn) => [message, ...prevColumn]);
      setTotalCount((prev) => prev + 1);
    },
    shouldReconnect: () => true,
  });

  return (
    <>
      <Stack
        width={"100%"}
        direction="column"
        alignItems="center"
        marginTop="36px"
        marginBottom="36px"
      >
        <Typography variant="h1">joejyn&jinghui</Typography>
        <Typography variant="h1">
          {import.meta.env.VITE_TELEGRAM_BOT_PASSWORD}
        </Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        <MessageList sx={{ width: "33%" }} messages={column1} />
        <MessageList sx={{ width: "33%" }} messages={column2} />
        <MessageList sx={{ width: "33%" }} messages={column3} />
      </Stack>
    </>
  );
}

export default App;
