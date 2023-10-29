import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import History from "./components/History";
import About from "./components/About";
import Identify from "./components/Identify";
import styles from "./styles/home.module.css";

import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

function App() {
  return (
    <div className={styles.colorContainer}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/history" element={<History />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/identify" element={<Identify />}></Route>
      </Routes>
    </div>
  );
}

export default App;
