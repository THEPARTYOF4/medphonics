import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import Signup from "./components/Signup";
import LoginPage from "./components/LoginPage";
import { LandingPage } from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page at root */}
        <Route path="/" element={<LandingPage />} />

        {/* Main app */}
        <Route path="/home" element={<Home />} />

        {/* Placeholder routes (optional, replace later) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
