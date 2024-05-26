import { Collapse, List } from "@mui/material";
import { Message, MessageListItem } from "./MessageListItem";
import { TransitionGroup } from "react-transition-group";

type MessageListProps = {
  messages: Message[];
} & React.ComponentProps<typeof List>;

export function MessageList({
  messages,
  ...props
}: MessageListProps): JSX.Element {
  return (
    <List {...props}>
      <TransitionGroup>
        {messages.map((message) => (
          <Collapse key={message.id}>
            <MessageListItem message={message} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  );
}
