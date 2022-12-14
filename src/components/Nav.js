import React from "react";
import { Icon } from "antd";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <NavLink
        className="nav__link"
        activeClassName="nav__link--active"
        to="/"
        exact
      >
        <Icon type="search" />
        Back to Search
      </NavLink>
     
    </div>
  );
};

export default Nav;
