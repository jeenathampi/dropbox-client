import React, { useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { useHistory } from "react-router-dom";

function Signup() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlasttName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState("");

  var dataFirstName = {
    Name: "custom:firstName",
    Value: firstName,
  };

  var dataLastName = {
    Name: "custom:lastName",
    Value: lastName,
  };

  var attributeList = [];
  var attributeFirstName = new CognitoUserAttribute(dataFirstName);
  var attributeLastName = new CognitoUserAttribute(dataLastName);

  attributeList.push(attributeFirstName);
  attributeList.push(attributeLastName);
  let history = useHistory();
  // let hasError = "";
  const onSubmit = (event) => {
    event.preventDefault();
    UserPool.signUp(email, password, attributeList, null, (err, data) => {
      if (err) {
        console.error(err.message);
        setHasError(err.message);
        console.log(hasError);
      } else {
        history.push("/");
      }
    });
  };
  const checkIfError = () => {
    if (hasError) {
      return (
        <div className="alert alert-danger my-3" role="alert">
          {hasError}
        </div>
      );
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          {checkIfError()}
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your Account</p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={(event) => setfirstName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(event) => setlasttName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
