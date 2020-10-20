import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/securityAction";
import Pool from "../../UserPool";

class Header extends Component {
  onClick(e) {
    this.props.logout();
  }
  checkLoggedIn() {
    const user = Pool.getCurrentUser();
    let isValidSession = false;
    let firstName = "";
    if (user) {
      user.getSession((err, session) => {
        if (session) {
          isValidSession = true;
          firstName = session.getIdToken().payload["custom:firstName"];
        }
      });
    }
    if (isValidSession) {
      return (
        <div>
          <nav className="navbar navbar-dark bg-primary">
            <a className="navbar-brand" href="/dashboard">
              File Saving App
            </a>
            <form className="form-inline my-2 my-lg-0">
              <ul className="navbar-nav mr-3">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Hello, {firstName}{" "}
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
              </ul>
              <Link
                to="/"
                className="btn btn-outline-light"
                onClick={this.onClick.bind(this)}
              >
                Logout
              </Link>
            </form>
          </nav>
        </div>
      );
    } else {
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
  render() {
    return <div>{this.checkLoggedIn()}</div>;
  }
}
function mapStateToProps({ security }) {
  return { security };
}
export default connect(mapStateToProps, { logout })(Header);
