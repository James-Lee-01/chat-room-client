// ChatPage.js
import { useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import ChatBox from "../components/ChatBox/ChatBox";


function ChatPage() {
  const { username, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (username.trim() === "") {
      navigate("/");
    }
  }, [username, navigate]);

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <div>
          <Typography variant='h4' component='h1' gutterBottom>
            Welcome to the Chat Room, {username}!
          </Typography>
          <Button variant='contained' color='secondary' onClick={logout}>
            Logout
          </Button>
          <ChatBox />
        </div>
      </Box>
    </Container>
  );
}

export default ChatPage;
