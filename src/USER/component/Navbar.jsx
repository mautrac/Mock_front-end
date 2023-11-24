import React, { useState } from "react";

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
         <img src='https://betacinemas.vn/Assets/Common/logo/logo.png'alt='logo' ></img> 
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to={"/lich-theo-rap"}>LỊCH THEO RẠP</NavLink>
        </li>
        <li>
          <NavLink to={"/phim"}>PHIM</NavLink>
        </li>
        <li>
          <NavLink  to={"/rap"}>RẠP</NavLink>
        </li>
        <li>
          <NavLink to={"/gia-ve"}>GIÁ VÉ</NavLink>
        </li>
        <li>
          <NavLink to={"/tin-moi-va-uu-dai"}>TIN MỚI VÀ ƯU ĐÃI</NavLink>
        </li>
        <li>
          <NavLink to={"/thanh-vien"}>THÀNH VIÊN</NavLink>
        </li>
      </ul>
    </nav>
  );
};
