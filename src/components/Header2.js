import { scaleService } from "chart.js";
import React from "react";
import { NavLink } from "react-router-dom";
import "./static/Header2.css";

const Header2 = function() {

    const handleDropDown = function() {
        // console.log("dropdown function entered"); // testing
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
    }

    return(
        <div className="topnav" id="myTopnav">
            <NavLink to="/" style={{ textDecoration: 'none' }}>
                <h2 className="nav-h2">Games</h2>
            </NavLink>
            <NavLink to="/charts" style={{ textDecoration: 'none' }}>
                <h2 className="nav-h2">Charts</h2>
            </NavLink>
            <NavLink to="/roster" style={{ textDecoration: 'none' }}>
                <h2 className="nav-h2">Roster</h2>
            </NavLink>
            <a href="javascript:void(0);" className="icon" onClick={() => handleDropDown()}>
                <i class="fa fa-bars" style={{ transform: "scale(2.5)" }}></i>
            </a>
        </div>
    )
}

export default Header2;
