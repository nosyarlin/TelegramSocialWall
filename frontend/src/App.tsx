import {
  Avatar,
  CssBaseline,
  CssVarsProvider,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Stack
        width={"100%"}
        direction="column"
        alignItems="center"
        marginTop="36px"
        marginBottom="36px"
      >
        <Typography level="h1">joejyn&jinghui</Typography>
        <Typography level="h1">
          {import.meta.env.VITE_TELEGRAM_BOT_PASSWORD}
        </Typography>
      </Stack>
      <Stack direction="row">
        <List
          variant="outlined"
          sx={{
            "--ListItemDecorator-size": "56px",
            maxWidth: 600,
            borderRadius: "sm",
          }}
        >
          <ListItem>
            <ListItemDecorator>
              <Avatar src="/static/images/avatar/1.jpg" />
            </ListItemDecorator>
            <ListItemContent>
              <Typography level="title-lg">Brunch this weekend?</Typography>
              <Typography level="body-lg">
                I&apos;ll be in your neighborhood doing errands this Tuesday.
              </Typography>
            </ListItemContent>
          </ListItem>
        </List>
      </Stack>
    </CssVarsProvider>
  );
}

export default App;
