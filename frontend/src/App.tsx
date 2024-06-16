import { Message } from "./components/MessageList/MessageCard";
import { MessageList } from "./components/MessageList/MessageList";
import { useCallback, useEffect, useMemo, useState } from "react";
import useWebSocket from "react-use-websocket";
import { Box, CssBaseline, Stack, Typography } from "@mui/material";
import { createFakeMessages } from "./components/MessageList/faker";
import logo from "../imgs/us_sticker.png";
import { v4 as uuidv4 } from "uuid";

import Papa from "papaparse";
import { random } from "lodash";

type PreloadedMessage = {
  "first name": string;
  "well wishes": string;
};

function App() {
  const port = import.meta.env.VITE_WEBSOCKET_PORT;
  const url = `ws://localhost:${port}/`;
  const useFakerData = import.meta.env.VITE_USE_FAKER;

  const [column1, setColumn1] = useState<Message[]>(
    useFakerData ? createFakeMessages(10) : []
  );
  const [column2, setColumn2] = useState<Message[]>(
    useFakerData ? createFakeMessages(10) : []
  );
  const [column3, setColumn3] = useState<Message[]>(
    useFakerData ? createFakeMessages(10) : []
  );
  const [column4, setColumn4] = useState<Message[]>(
    useFakerData ? createFakeMessages(10) : []
  );
  const setColumnFuncs = useMemo(
    () => [setColumn1, setColumn2, setColumn3, setColumn4],
    []
  );

  const addMessage = useCallback(
    (message: Message) => {
      const setColumnFunc = setColumnFuncs[random(0, 3)];
      setColumnFunc((prevColumn) => [message, ...prevColumn]);
    },
    [setColumnFuncs]
  );

  useWebSocket(url, {
    onOpen: () => console.log("opened"),
    onMessage: (event: WebSocketEventMap["message"]) => {
      const message = JSON.parse(event.data) as Message;
      addMessage(message);
    },
    shouldReconnect: () => true,
  });

  const preloadWellWishes = useCallback(() => {
    fetch("./WellWishes_Chosen.csv")
      .then((data) => data.text())
      .then((csvText): void => {
        const preloadedWishes = Papa.parse<PreloadedMessage>(csvText, {
          delimiter: ",",
          header: true,
        });
        preloadedWishes.data.forEach((wish) => {
          addMessage({
            id: uuidv4(),
            name: wish["first name"],
            text: wish["well wishes"],
          });
        });
      });
  }, [addMessage]);

  useEffect(() => {
    preloadWellWishes();
    // only run on load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "#182734", height: "100%" }}>
        <Stack
          width={"100%"}
          direction="column"
          alignItems="left"
          paddingTop="30px"
          paddingBottom="48px"
          paddingLeft="58px"
        >
          <Stack direction="row" alignItems="center">
            <Typography
              variant="h1"
              fontSize="92px"
              color="#FFFFFF"
              fontFamily={"Elephant"}
              marginRight="30px"
            >
              Joejyn & Jinghui's Digital Wish Board
            </Typography>
            <img src={logo} alt="Logo" width="188px" height="92px" />
          </Stack>
          <Typography
            variant="h2"
            fontSize="66px"
            color="#B1B1B1"
            fontFamily={"Georgia"}
          >
            Send in your well wishes or images to the Telegram bot:{" "}
            <b style={{ color: "#CDCDCD" }}> joejyn&jinghui </b>
          </Typography>
          <Typography
            variant="h2"
            fontSize="66px"
            color="#B1B1B1"
            fontFamily={"Georgia"}
          >
            To start posting, type:{" "}
            <b style={{ color: "#CDCDCD" }}>
              /password {import.meta.env.VITE_TELEGRAM_BOT_PASSWORD}
            </b>
          </Typography>
        </Stack>
        <Stack direction="row" gap={4} marginX={8}>
          <MessageList sx={{ width: "25%" }} messages={column1} />
          <MessageList sx={{ width: "25%" }} messages={column2} />
          <MessageList sx={{ width: "25%" }} messages={column3} />
          <MessageList sx={{ width: "25%" }} messages={column4} />
        </Stack>
      </Box>
    </>
  );
}

export default App;
