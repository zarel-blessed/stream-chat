import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register, Homepage, Login } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
