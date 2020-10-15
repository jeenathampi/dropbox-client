import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Signup} />
      <Route exact path="/login" component={Login} />
    </Router>
  );
}
export default App;
