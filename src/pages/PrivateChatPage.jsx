// PrivateChatPage.js
import { useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import PrivateChatBox from "../components/ChatBox/PrivateChatBox";

function ChatPage() {
  const { username, logout } = useUser();
  const navigate = useNavigate();
  const { roomCode } = useParams(); // 透過網址取得房間號碼

  // 返回聊天室選擇頁面
  const handleLeave = () => {
    navigate("/chat");
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
        padding: "10px 0",
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

          display: "flex",
          flexDirection: "column", // 將子元素設為垂直排列
          height: "100%", // 讓 Container 高度填滿整個父元素
        }}
        maxWidth={false}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)", // 珍珠白半透明背景色
            borderRadius: "25px",
            padding: "2rem 0",
            flex: 1, // 自動填滿剩餘空間,
            display: "flex",
            flexDirection: "column", // 將子元素設為垂直排列
            height: "90%",
          }}
        >
          <Typography variant='h1' component='h1'>
            Hi, {username}! <br /> This is Private Room: "{roomCode}"
          </Typography>
          <Box
            sx={{
              margin: "0.5rem 0",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Button variant='contained' color='primary' onClick={handleLeave}>
              Leave
            </Button>
            <Button variant='contained' color='secondary' onClick={logout}>
              Logout
            </Button>
          </Box>
          <PrivateChatBox roomCode={roomCode} />
        </Box>
      </Container>
    </Container>
  );
}

export default ChatPage;
