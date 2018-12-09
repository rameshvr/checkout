import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  renderHeader() {
    return <header className="header" />;
  }

  renderMenu() {
    return (
      <ul className="menu">
        <li>
          <Link to="/plans">Plans</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderMenu()}
      </div>
    );
  }
}

export default Header;
