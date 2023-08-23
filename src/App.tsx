import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register, Homepage, Login } from "./pages";
import { UserProvider } from "./Contexts/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
