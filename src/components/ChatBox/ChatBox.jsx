// ChatBox.js
import { useState } from "react";
import { Paper, Typography, TextField, Button, Box, Grid } from "@mui/material";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Store all the messages

  const handleSendMessage = () => {
    // Handle sending message logic (to be implemented with Socket.io)
    const newMessage = {
      sender: "Me", // For now, assuming the sender is the user (to be updated with actual sender name)
      text: message,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  return (
    <Paper elevation={3} style={{ padding: "16px", height: "100%" }}>
      <Box display='flex' flexDirection='column' height='100%'>
        <Box flexGrow={1} overflow='auto'>
          <Grid container direction='column' spacing={1}>
            {messages.map((msg, index) => (
              <Grid
                item
                key={index}
                alignSelf={msg.sender === "Me" ? "flex-end" : "flex-start"}
              >
                <Typography variant='caption' color='textSecondary'>
                  {msg.sender}
                </Typography>
                <Paper
                  elevation={2}
                  style={{ padding: "8px", maxWidth: "300px" }}
                >
                  {msg.text}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={2} display='flex' alignItems='center'>
          <TextField
            label='Type your message'
            variant='outlined'
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatBox;
