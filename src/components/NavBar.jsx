import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

/**
 * Application navigation bar.
 * All links point to TN-DL Practice Test; no KY-DL references remain.
 */
export default function NavBar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-brand">Driver's Licence Prep</div>
      <ul className="navbar-links" role="list">
        <li>
          <NavLink
            to="/tn-dl-practice-test"
            className={({ isActive }) => isActive ? "navbar-link navbar-link--active" : "navbar-link"}
          >
            TN-DL Practice Test
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}