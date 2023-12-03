import { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid
} from "@mui/material";
import { io } from "socket.io-client";
import { useUser } from "../../contexts/UserContext";

const ChatBox = () => {
  const { username, userId } = useUser(); // 導入使用者資訊
  const [message, setMessage] = useState(""); // 訊息輸入框
  const [messages, setMessages] = useState([]); // 聊天室訊息列表
  const [onlineUsers, setOnlineUsers] = useState([]); // 在線上的使用者列表
  const [socket, setSocket] = useState(null); // Socket.io
  const roomName = "public"; // 公開聊天室
  const chatBoxRef = useRef(null); // 聊天室DOM元素(供自動下滑用)

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

  // 處理按下 Enter 鍵的事件
  const handleKeyDown = (e) => {
    if (e.shiftKey && e.keyCode === 13) {
      // 預設換行
      return;
    } else if (e.keyCode === 13) {
      // 防止換行行為
      e.preventDefault();
      // 發送訊息
      handleSendMessage();
    }
  };

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

    // 監聽在線上使用者列表的事件
    socketInstance.on("online users", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        //主動離開房間
        socketInstance.emit("leave room", { userId, roomName });
        socketInstance.disconnect();
      }
    };
  }, [userId, username, roomName]);

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
    <>
      {/* 在線使用者列表 */}
      <Box>
        <Typography variant='subtitle1' color='textSecondary'>
          Online Users
        </Typography>
        <Box
          sx={{
            maxHeight: "2.5rem",
            margin: "0 10px",
            overflowY: "auto", // 啟用垂直捲軸
            scrollBehavior: "smooth",
            overflowX: "hidden",
            "&::-webkit-scrollbar": {
              width: "10px", // 調整捲軸的寬度
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#B57BCE", // 調整捲軸的顏色
              borderRadius: "5px", // 調整捲軸的圓角
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#F2F2F2", // 調整捲軸軌道的顏色
              borderRadius: "5px", // 調整捲軸軌道的圓角
            },
          }}
        >
          <Typography>
            {onlineUsers.map((user) => user.username).join(", ")}
          </Typography>
        </Box>
      </Box>

      {/* 聊天室 */}
      <Paper
        sx={{
          padding: "1rem 0.5rem",
          height: "500px",
          overflow: "auto",
          background: "rgba(255, 255, 255, 0)",
          border: "2px solid #E6ECF0",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              scrollBehavior: "smooth",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "10px", // 調整捲軸的寬度
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#B57BCE", // 調整捲軸的顏色
                borderRadius: "5px", // 調整捲軸的圓角
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#F2F2F2", // 調整捲軸軌道的顏色
                borderRadius: "5px", // 調整捲軸軌道的圓角
              },
            }}
            ref={chatBoxRef}
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
                    <Box
                      display='flex'
                      flexDirection='column'
                      sx={{
                        textAlign: msg.senderId === userId ? "right" : "left",
                        margin: "0 4px",
                      }}
                    >
                      <Typography
                        variant='caption'
                        color='textSecondary'
                        sx={{ flex: "1" }}
                      >
                        {msg.sender}
                      </Typography>
                      <Paper
                        elevation={1}
                        sx={{
                          padding: "8px",
                          maxWidth: "300px",
                          wordWrap: "break-word",
                          textAlign: "left",
                          flex: "1",
                          backgroundColor:
                            msg.senderId === userId ? "#FFFFFF" : "#832195",
                          color:
                            msg.senderId === userId ? "#000000" : "#FFFFFF",
                        }}
                      >
                        {msg.text}
                      </Paper>
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5px",
              "@media (max-width: 400px)": {
                flexDirection: "column",
              },
            }}
          >
            <TextField
              label='Type your message'
              variant='outlined'
              fullWidth
              multiline
              minRows={1}
              maxRows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                "& textarea": {
                  scrollbarColor: "#B57BCE", // 設置捲軸樣式
                  "&::-webkit-scrollbar": {
                    width: "10px", // 調整捲軸的寬度
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#B57BCE", // 調整捲軸的顏色
                    borderRadius: "5px", // 調整捲軸的圓角
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#F2F2F2", // 調整捲軸軌道的顏色
                    borderRadius: "5px", // 調整捲軸軌道的圓角
                  },
                },
              }}
            />
            <Button
              sx={{
                backgroundColor: "#7478F0",
                "&:hover": {
                  backgroundColor: "#5D60F5",
                },
                "@media (max-width: 400px)": {
                  mt: 0,
                },
              }}
              variant='contained'
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ChatBox;
