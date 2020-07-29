import React from "react";
import "./App.css";
import { Layout } from "./Components/Layout";

function App() {
  return (
    <div className="App">
      <header>
        <h1 style={{ display: "flex" }}>Weather Forecast</h1>
      </header>
      <Layout />
    </div>
  );
}

export default App;
