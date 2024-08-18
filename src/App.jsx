import { Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem.jsx";
import Homepage from "./components/Homepage.jsx";
import Gallery from "./components/Gallery.jsx";

function App() {
  return (
    <div className="app bg-[#0E0E0E]">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/characters/:id" element={<Gallery />} />
      </Routes>
    </div>
  );
  S;
}

export default App;
