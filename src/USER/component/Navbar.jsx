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
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="s"></span>
        <span className="s"></span>
        <span className="s"></span>
      </div>
      <ul className= {menuOpen ? "open" :"notOpen"} >      
        <li className="abc">
          <NavLink className={"z"} to={"/lich-theo-rap"}>LỊCH THEO RẠP</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/phim"}>PHIM</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"}  to={"/rap"}>RẠP</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/gia-ve"}>GIÁ VÉ</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/tin-moi-va-uu-dai"}>TIN MỚI VÀ ƯU ĐÃI</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/nhuong-quyen"}>NHƯỢNG QUYỀN</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/thanh-vien"}>THÀNH VIÊN</NavLink>
        </li>
      </ul>
    </nav>
  );
};
