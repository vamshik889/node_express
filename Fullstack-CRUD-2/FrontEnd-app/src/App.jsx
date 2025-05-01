import { useState } from "react";

import "./App.css";
import SIgnup from "./components/SIgnup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Notes Application</h1>
      <Routes>
        <Route path="signup" element={<SIgnup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
