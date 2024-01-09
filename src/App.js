import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import LobbyPage from "./pages/LobbyPage";
import ChatTypeSelect from "./pages/ChatTypeSelect";
import ChatPage from "./pages/ChatPage";
import PrivateChatPage from "./pages/PrivateChatPage";

import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme(
  {
  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: "400",
      "@media (max-width:425px)": {
        fontSize: "1.25rem",
      },
    },
  },
}
);


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LobbyPage />} />
              <Route path="/chat" element={<ChatTypeSelect />} />
              <Route path="/chat/public" element={<ChatPage />} />
              <Route path="/chat/:roomCode" element={<PrivateChatPage />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
