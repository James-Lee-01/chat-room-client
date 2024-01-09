// ChatTypeSelect.jsx
import { useState,useEffect } from "react";
import { Button, Container, Typography, Box, TextField } from "@mui/material";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";


const ChatTypeSelect = () => {
  const { username, logout } = useUser();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);


  // 進入公開聊天室的邏輯
  const handleEnterPublicChat = () => {
    navigate("/chat/public");
  };

  // 進入私人聊天室的邏輯
  const handleEnterPrivateChat = () => {
    if (roomCode.trim() !== "") {
      navigate(`/chat/${roomCode}`);
    } else {
      setError(true);
    }
  };

  // 登出的邏輯
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 頁面限制導向邏輯
  useEffect(() => {
    if (username.trim() === "") {
      navigate("/");
    }
  }, [username, navigate]);

  return (
    <Container
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#333333", // 最外層背景色
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      maxWidth={false}
    >
      <Container
        sx={{
          maxWidth: "500px",
          background:
            "linear-gradient(0deg, hsla(331, 78%, 69%, 1) 0%, hsla(238, 82%, 70%, 1) 100%);", // 最外層背景色，漸層必須以圖片形式輸入，非backgroundColor
          borderRadius: "20px",
          padding: "2rem",
          textAlign: "center",
        }}
        maxWidth={false}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)", // 珍珠白半透明背景色
            borderRadius: "25px",
            padding: "2rem",
          }}
        >
          <Typography
            variant='h1'
            component='h1'
          >
            Welcome, {username}! <br /> Choose Your Chat Room
          </Typography>
          <Button
            sx={{
              display: "block",
              margin: "1rem auto",
              width: "80%",
              background: "#4CAF50",
              color: "white",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
            variant='contained'
            onClick={handleEnterPublicChat}
          >
            Public Chat Room
          </Button>
          <Typography
            sx={{
              fontSize: "1rem",
            }}
            component='p'
          >
            OR
          </Typography>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <TextField
              sx={{
                width: "80%",
              }}
              label='Enter room code'
              variant='standard'
              fullWidth
              value={roomCode}
              error={error}
              helperText={error ? "Room code cannot be empty" : "\u200B"} // 錯誤訊息或零寬度空格
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <Button
              sx={{
                display: "block",
                width: "80%",
                background: "#008CBA",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0077a3",
                },
              }}
              variant='contained'
              onClick={handleEnterPrivateChat}
            >
              Private Chat Room
            </Button>
          </Box>
          <Button
            sx={{ margin: "4rem 0 0" }}
            variant='contained'
            color='secondary'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default ChatTypeSelect;
