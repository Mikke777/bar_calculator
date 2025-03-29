import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "250px", background: "#f4f4f4", padding: "20px" }}>
      <h2>Sidebar</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
