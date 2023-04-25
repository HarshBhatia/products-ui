import React from 'react';
import './Nav.css';
import { NavLink } from "react-router-dom";


const Nav = () => {
    return (
        <div className="banner">
            <span>You're logged in as {localStorage.getItem('email')}</span>
            <NavLink className="logout-button" to={`/login`}>Logout</NavLink>
        </div>
    );
};

export default Nav;