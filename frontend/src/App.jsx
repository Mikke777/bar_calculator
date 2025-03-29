import React from "react";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  return (
      <div  id="root">
        <Sidebar />
        <div className="main-content">
          <Home />
        </div>
        <RightSidebar />
      </div>
      );
};

export default App;
