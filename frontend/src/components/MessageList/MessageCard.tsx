import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  colors,
} from "@mui/material";
import sample from "lodash.sample";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

export type Message = {
  id: string;
  avatarSrc?: string;
  name: string;
  text?: string;
  photoSrc?: string;
};

type MessageCardProps = {
  message: Message;
};

export function MessageCard({ message }: MessageCardProps): JSX.Element {
  const [hide, setHide] = useState(false);
  const avatarColor: keyof typeof colors = sample([
    "deepPurple",
    "deepOrange",
    "amber",
    "cyan",
    "pink",
  ]);
  const firstName = message.name.split(" ")[0];

  return (
    <Card
      sx={{
        minWidth: "100%",
        mb: hide ? 0 : 3,
        boxShadow: "0px 5px 10px 1px rgba(0,0,0,0.05);",
        height: hide ? 0 : undefined,
        borderRadius: "16px",
      }}
    >
      <CardHeader
        sx={{
          padding: "24px",
        }}
        avatar={
          <Avatar
            src={message.avatarSrc}
            sx={{
              width: "40px",
              height: "40px",
              bgcolor: colors[avatarColor][50],
              color: colors[avatarColor][500],
              ".MuiSvgIcon-fontSizeMedium": {
                width: "50%",
              },
            }}
          />
        }
        title={<Typography variant="h4">{firstName}</Typography>}
        action={
          <IconButton
            onClick={() => setHide(true)}
            sx={{ color: colors.grey[500] }}
          >
            <ClearIcon />
          </IconButton>
        }
      />
      {message.photoSrc && (
        <CardMedia
          component="img"
          sx={{ maxHeight: "2000px", mb: "8px" }}
          image={message.photoSrc}
        />
      )}
      <CardContent sx={{ padding: "26px", pt: 0 }}>
        <Typography
          variant="body1"
          sx={{ color: colors.grey[800], fontSize: "2.5rem" }}
        >
          {message.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
