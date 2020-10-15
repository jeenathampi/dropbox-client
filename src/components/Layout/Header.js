import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            File Saving App
          </a>
        </nav>
      </div>
    );
  }
}

export default Header;
