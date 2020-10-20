import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import UploadFile from "./components/UploadFile";
import UpdateFile from "./components/UpdateFile";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/upload" component={UploadFile} />
        <Route exact path="/update/:id" component={UpdateFile} />
      </Router>
    </Provider>
  );
}
export default App;
