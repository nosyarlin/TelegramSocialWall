import { Collapse, Stack } from "@mui/material";
import { Message, MessageCard } from "./MessageCard";
import { TransitionGroup } from "react-transition-group";

type MessageListProps = {
  messages: Message[];
} & React.ComponentProps<typeof Stack>;

export function MessageList({
  messages,
  ...props
}: MessageListProps): JSX.Element {
  return (
    <Stack {...props} direction="column">
      <TransitionGroup>
        {messages.map((message) => (
          <Collapse key={message.id}>
            <MessageCard message={message} />
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
}
