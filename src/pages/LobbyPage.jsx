// LobbyPage.jsx
import { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function LobbyPage() {
  const { username, login } = useUser();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  // 名字填寫邏輯
  const handleUsernameChange = (event) => {
    setInputValue(event.target.value);
    setError(false);
  };

  //進入聊天室頁面導向邏輯
  const handleEnterChat = () => {
    if (inputValue.trim() !== "") {
      login(inputValue);
      navigate("/chat");
    } else {
      setError(true); // 姓名欄空缺
    }
  };

  // 處理按下 Enter 鍵的事件
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // 防止換行行為
      e.preventDefault();
      // 進入聊天室頁面導向邏輯
      handleEnterChat();
    }
  };

  useEffect(() => {
    if (username.trim() !== "") {
      // 如果已經登入，直接導向聊天室
      navigate("/chat");
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
            sx={{
              fontSize: "2rem",
              marginBottom: "1rem",
            }}
            component='h1'
          >
            Secret Chat Room
          </Typography>
          <TextField
            sx={{
              marginTop: "1rem",
              width: "80%",
              display: "block",
              margin: "0 auto",
            }}
            label='Enter your name'
            variant='outlined'
            fullWidth
            required
            helperText={error ? "Name cannot be empty" : "\u200B"} // 錯誤訊息或零寬度空格
            error={error}
            value={inputValue}
            onChange={handleUsernameChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            sx={{
              display: "block",
              margin: "1.5rem auto 0",
            }}
            variant='contained'
            color='primary'
            onClick={handleEnterChat}
          >
            Enter Chat
          </Button>
        </Box>
      </Container>
    </Container>
  );
}

export default LobbyPage;
