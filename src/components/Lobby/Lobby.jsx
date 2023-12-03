import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const getUsernameFromSessionStorage = () => {
  return sessionStorage.getItem("chatUsername") || "";
};

function Lobby() {
  const [username, setUsername] = useState("");
  const [isEntered, setIsEntered] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEnterChat = () => {
    if (username.trim() !== "") {
      sessionStorage.setItem("chatUsername", username);
      setIsEntered(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("chatUsername");
    setUsername("");
    setIsEntered(false);
  };

  useEffect(() => {
    // Check if there is a stored username on page load
    const storedUsername = getUsernameFromSessionStorage();
    if (storedUsername) {
      setUsername(storedUsername);
      setIsEntered(true);
    }
  }, []);

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        {isEntered ? (
          <div>
            <Typography variant='h4' component='h1' gutterBottom>
              Welcome to the Chat Room, {username}!
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <Typography variant='h4' component='h1' gutterBottom>
              Chat Room Entrance
            </Typography>
            <TextField
              label='Enter your name'
              variant='outlined'
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              margin='normal'
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleEnterChat}
            >
              Enter Chat
            </Button>
          </div>
        )}
      </Box>
    </Container>
  );
}

export default Lobby;
