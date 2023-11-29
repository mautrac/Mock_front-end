import React, { useState } from "react";

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="father">
      <Link to="/" className="title">
         <img src='https://betacinemas.vn/Assets/Common/logo/logo.png'alt='logo' ></img> 
      </Link>
      <div>
        <NavLink className="z" to="/admin">MANAGER</NavLink>
      </div>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="s"></span>
        <span className="s"></span>
        <span className="s"></span>
      </div>
      <ul className= {menuOpen ? "open" :"notOpen"} >      
        <li className="abc">
          <NavLink className={"z"} to={"/schedules"}>FILM SCHEDULE</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/phim"}>FILM</NavLink>
        </li>

        <li className="abc">
          <NavLink className={"z"} to={"/ticket-price"}>TICKET PRICE</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/tin-moi-va-uu-dai"}>NEWS AND OFFERS</NavLink>
        </li>
        {/* <li className="abc">
          <NavLink className={"z"} to={"/nhuong-quyen"}>NHƯỢNG QUYỀN</NavLink>
        </li> */}
        <li className="abc">
          <NavLink className={"z"} to={"/thanh-vien"}>MEMBERS</NavLink>
        </li>
      </ul>
    </nav>
  );
};
