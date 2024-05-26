import {
  Avatar,
  ListItem,
  ListItemAvatar,
  Stack,
  Typography,
} from "@mui/material";

export type Message = {
  id: string;
  avatarSrc?: string;
  name: string;
  text: string;
};

type MessageListItemProps = {
  message: Message;
};

export function MessageListItem({
  message,
}: MessageListItemProps): JSX.Element {
  return (
    <ListItem
      sx={{
        border: "1px solid black",
        borderRadius: 1,
        mt: 1,
      }}
    >
      <ListItemAvatar>
        <Avatar src={message.avatarSrc} />
      </ListItemAvatar>
      <Stack direction="column">
        <Typography variant="h6">{message.name}</Typography>
        <Typography variant="body1">{message.text}</Typography>
      </Stack>
    </ListItem>
  );
}
