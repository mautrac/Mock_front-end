import React, { useState } from "react";

import "../css/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
import Storage from "../../Storage/Storage";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const role = Storage.getUserInfo().role;
  const checkRole = role == "Admin";

  return (
    <div className="f">
    <div className="bt"> 
        <button className="btc"> 
        <Link className="dangnhap" to="/sign-in">Sign in</Link>
        </button> 
        <GoSignIn className="c"></GoSignIn>
        <button className="btc">
          <Link className="dangky" to="/sign-up">Sign up</Link>   
        </button>
       
      </div>
    <nav className="father">
      <Link to="/" className="title">
         <img src='https://betacinemas.vn/Assets/Common/logo/logo.png'alt='logo' ></img> 
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="s"></span>
        <span className="s"></span>
        <span className="s"></span>
      </div>
      <ul className= {menuOpen ? "open" :"notOpen"} style={{marginBottom: 0}} > 
        {checkRole &&
          <li className="abc">
              <NavLink className="z" to="/admin">ADMIN PAGE</NavLink>
          </li>     
        }
        <li className="abc">
          <NavLink className={"z"} to={"/schedules"}> FILM SCHEDULES</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/films"}>FILMS</NavLink>
        </li>

        <li className="abc">
          <NavLink className={"z"} to={"/ticket-price"}>TICKET PRICE</NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/tin-moi-va-uu-dai"}>NEWS AND OFFERS </NavLink>
        </li>
        <li className="abc">
          <NavLink className={"z"} to={"/thanh-vien"}>MEMBERS</NavLink>
        </li>
      </ul>
    </nav>
    </div>
  );
};
