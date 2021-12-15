import React from "react";
import { NavLink } from "react-router-dom";
import "./static/Header.css";

const Header = function() {
    return(
        <div className="header">
            <nav className="nav-links">
                <div className="nav-link">
                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                        <h1 className="nav-link-h1">Games</h1>
                    </NavLink>
                </div>
                <div className="nav-link">
                    <NavLink to="/charts" style={{ textDecoration: 'none' }}>
                        <h1 className="nav-link-h1">Charts</h1>
                    </NavLink>
                </div>
                <div className="nav-link">
                    <NavLink to="/roster" style={{ textDecoration: 'none' }}>
                        <h1 className="nav-link-h1">Roster</h1>
                    </NavLink>
                </div>
            </nav>
            <div className="main-title">
                <h1>Clipper's Team Data (2020/21)</h1>
            </div>
        </div>
    )   
}

export default Header;
