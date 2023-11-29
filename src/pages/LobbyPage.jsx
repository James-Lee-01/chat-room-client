// LobbyPage.js
import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function LobbyPage() {
  const { username, login } = useUser();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleUsernameChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEnterChat = () => {
    if (inputValue.trim() !== "") {
      login(inputValue);
      navigate("/chat");
    }
  };

  useEffect(() => {
    if (username.trim() !== "") {
      navigate("/chat");
    }
  }, [username, navigate]);

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <div>
          <Typography variant='h4' component='h1' gutterBottom>
            Chat Room Entrance
          </Typography>
          <TextField
            label='Enter your name'
            variant='outlined'
            fullWidth
            value={inputValue}
            onChange={handleUsernameChange}
            margin='normal'
          />
          <Button variant='contained' color='primary' onClick={handleEnterChat}>
            Enter Chat
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default LobbyPage;
