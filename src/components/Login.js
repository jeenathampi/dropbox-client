import React, { Component } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { connect } from "react-redux";
import { login } from "../actions/securityAction";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: this.state.email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: this.state.email,
      Password: this.state.password,
    });
    this.props.login(user, authDetails);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }
  checkIfError() {
    if (Object.keys(this.props.errors).length !== 0) {
      return (
        <div className="alert alert-danger my-3" role="alert">
          {this.props.errors.message}
        </div>
      );
    }
  }
  render() {
    const user = UserPool.getCurrentUser();
    console.log(user);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            {this.checkIfError()}
            <h1 className="display-4 text-center">Login</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </form>
            <small>Don't have an account? </small>
            <a href="/signup">SignUp</a>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ security, errors }) {
  return { security, errors };
}
export default connect(mapStateToProps, { login })(Login);
