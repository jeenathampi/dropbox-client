import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-primary">
          <a class="navbar-brand" href="/">
            File Saving App
          </a>
        </nav>
      </div>
    );
  }
}

export default Header;
