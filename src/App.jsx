import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Menu from "./menu/tela_principal/menu";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;