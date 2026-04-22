import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Project from "./pages/Project.jsx";
import Profile from "./pages/Profile.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <div className="cont">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="project" element={<Project />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
