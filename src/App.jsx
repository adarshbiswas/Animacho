import { Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem.jsx";
import HomePage from "./components/HomePage";
import Gallery from "./components/Gallery";

function App() {
  return (
    <div className="app bg-[#0E0E0E]">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/characters/:id" element={<Gallery />} />
      </Routes>
    </div>
  );
  S;
}

export default App;
