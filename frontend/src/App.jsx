import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  return (
      <div  id="root">
        <Sidebar />
        <div className="main-content">
          <Home />
        </div>
      </div>
      );
};

export default App;
