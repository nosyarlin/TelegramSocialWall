import { Message } from "./components/MessageList/MessageCard";
import { MessageList } from "./components/MessageList/MessageList";
import { useState } from "react";
import useWebSocket from "react-use-websocket";
import { Box, CssBaseline, Stack, Typography, colors } from "@mui/material";
import { createFakeMessages } from "./components/MessageList/faker";

function App() {
  const port = import.meta.env.VITE_WEBSOCKET_PORT;
  const url = `ws://localhost:${port}/`;
  const useFakerData = import.meta.env.VITE_USE_FAKER;

  const [totalCount, setTotalCount] = useState(0);
  console.log(createFakeMessages(1));
  const [column1, setColumn1] = useState<Message[]>(
    useFakerData ? createFakeMessages(10) : []
  );
  const [column2, setColumn2] = useState<Message[]>(
    useFakerData ? createFakeMessages(10) : []
  );
  const [column3, setColumn3] = useState<Message[]>(
    useFakerData ? createFakeMessages(10) : []
  );
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
      <CssBaseline />
      <Box sx={{ bgcolor: colors.blueGrey[50], height: "100%" }}>
        <Stack
          width={"100%"}
          direction="column"
          alignItems="center"
          paddingTop="48px"
          paddingBottom="36px"
        >
          <Typography variant="h1">Telegram: joejyn&jinghui</Typography>
          <Typography variant="h1" color={colors.grey[500]}>
            {`Password: ${import.meta.env.VITE_TELEGRAM_BOT_PASSWORD}`}
          </Typography>
        </Stack>
        <Stack direction="row" gap={2} marginX={8}>
          <MessageList sx={{ width: "33%" }} messages={column1} />
          <MessageList sx={{ width: "33%" }} messages={column2} />
          <MessageList sx={{ width: "33%" }} messages={column3} />
        </Stack>
      </Box>
    </>
  );
}

export default App;
