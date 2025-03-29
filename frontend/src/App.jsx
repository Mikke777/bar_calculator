import React from "react";
import Sidebar from "./components/Sidebar";
import RightSidebar from "./components/RightSidebar";
import CartItem from "./pages/CartItem";
import "./App.css";

const App = () => {
  return (
      <div  id="root">
        <Sidebar />
        <div className="main-content">
          <CartItem />
        </div>
        <RightSidebar />
      </div>
      );
};

export default App;
