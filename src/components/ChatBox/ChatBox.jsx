// ChatBox.js
import { useState, useEffect, useRef } from "react";
import { Paper, Typography, TextField, Button, Box, Grid } from "@mui/material";
import { io } from "socket.io-client";
import { useUser } from "../../contexts/UserContext";

const ChatBox = () => {
  const { username, userId } = useUser(); //導入使用者資訊
  const [message, setMessage] = useState(""); //訊息輸入框
  const [messages, setMessages] = useState([]); //聊天室訊息列表
  const [socket, setSocket] = useState(null); //Socket.io
  const [roomName] = useState("public"); //預設聊天室名稱
  const chatBoxRef = useRef(null); //聊天室DOM元素

  useEffect(() => {
    //建立連線
    const socketInstance = io("http://localhost:3001", {
      withCredentials: true,
    });

    //當連接成功時
    socketInstance.on("connect", () => {
      //加入聊天室
      socketInstance.emit("join room", { userId, username, roomName });
    });

    //當收到訊息時
    socketInstance.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    //當有人加入聊天室時的系統訊息
    socketInstance.on("user joined", ({ userId, username }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: userId,
          sender: "System",
          text: `${username} joined.`,
          systemMessage: true,
        },
      ]);
    });

    //當有人離開聊天室時的系統訊息
    socketInstance.on("user left", ({ userId, username }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: userId,
          sender: "System",
          text: `${username} left.`,
          systemMessage: true,
        },
      ]);
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.emit("leave room", { userId, roomName });
        socketInstance.disconnect();
      }
    };
  }, [userId, username, roomName]);

  //處理發送訊息
  const handleSendMessage = () => {
    if (message.trim() !== "" && socket) {
      const newMessage = {
        senderId: userId,
        sender: username,
        text: message,
        room: roomName,
      };

      socket.emit("chat message", JSON.stringify(newMessage));
      setMessage("");
    }
  };

  useEffect(() => {
    // 每次 messages 更新後，將滾動到最下層
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <Paper elevation={3} style={{ padding: "16px", height: "500px" }}>
      <Box display='flex' flexDirection='column' height='100%'>
        <Box
          flexGrow={1}
          overflow='auto'
          ref={chatBoxRef} // 設定 ref
          style={{ scrollBehavior: "smooth" }}
        >
          <Grid container direction='column' spacing={1}>
            {messages.map((msg, index) => (
              <Grid
                item
                key={index}
                alignSelf={
                  msg.systemMessage
                    ? "center"
                    : msg.senderId === userId
                    ? "flex-end"
                    : "flex-start"
                }
              >
                {msg.systemMessage ? (
                  <Typography
                    variant='caption'
                    color='textSecondary'
                    align='center'
                  >
                    {msg.text}
                  </Typography>
                ) : (
                  <>
                    <Typography variant='caption' color='textSecondary'>
                      {msg.sender}
                    </Typography>
                    <Paper
                      elevation={2}
                      style={{ padding: "8px", maxWidth: "300px" }}
                    >
                      {msg.text}
                    </Paper>
                  </>
                )}
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
