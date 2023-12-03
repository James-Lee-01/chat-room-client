import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import LobbyPage from "./pages/LobbyPage";
import ChatTypeSelect from "./pages/ChatTypeSelect";
import ChatPage from "./pages/ChatPage";
import PrivateChatPage from "./pages/PrivateChatPage";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
