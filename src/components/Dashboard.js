import React, { Component } from "react";
import FileItem from "./FileItem";
import UploadFileButton from "./UploadFileButton";
import { connect } from "react-redux";
import { getFiles, getAdminFiles } from "../actions/fileActions";
import Pool from "../UserPool";
import AdminView from "./AdminView";

class Dashboard extends Component {
  componentDidMount() {
    const username = Pool.getCurrentUser().getUsername();
    const user = Pool.getCurrentUser();
    let group = "";
    if (user) {
      user.getSession((err, session) => {
        if (!err) {
          group = session.getAccessToken().payload["cognito:groups"][0];
        }
      });
    }
    if (group === "AdminGroup") {
      this.props.getAdminFiles();
    } else {
      this.props.getFiles(username);
    }
  }
  checkIfError() {
    if (Object.keys(this.props.errors).length !== 0) {
      return (
        <div className="alert alert-danger my-3" role="alert">
          File exceeds its maximum permitted size of 10MB!
        </div>
      );
    }
  }
  checkIfAdmin() {
    const { files } = this.props.file;
    const user = Pool.getCurrentUser();
    let group = "";
    if (user) {
      user.getSession((err, session) => {
        if (!err) {
          group = session.getAccessToken().payload["cognito:groups"][0];
        }
      });
    }
    if (group === "AdminGroup") {
      return (
        <div className="container">
          <h1 style={{ textAlign: "center", margin: "30px auto" }}>Files</h1>
          {files.map((file) => (
            <AdminView key={file.fileId} file={file} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="container">
          {this.checkIfError()}
          <h1 style={{ textAlign: "center", margin: "30px auto" }}>Files</h1>
          <UploadFileButton />
          {files.map((file) => (
            <FileItem key={file.fileId} file={file} />
          ))}
        </div>
      );
    }
  }

  render() {
    return <div>{this.checkIfAdmin()}</div>;
  }
}

function mapStateToProps({ security, file, errors }) {
  return { security, file, errors };
}
export default connect(mapStateToProps, { getFiles, getAdminFiles })(Dashboard);
