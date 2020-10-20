import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { deleteFile } from "../actions/fileActions";
import { connect } from "react-redux";
import Pool from "../UserPool";
import { withRouter } from "react-router-dom";

class FileItem extends Component {
  downloadImage(fileUrl, filename) {
    axios({
      url: fileUrl,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    });
  }

  handleDelete(id, url, fileId) {
    const params = {
      url: url,
      fileId: fileId,
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    this.props.deleteFile(id, params, options);
    this.props.history.push("/dashboard");
  }
  trimFileName(file) {
    const urlArray = file.fileUrl.split("/");
    const name = urlArray[urlArray.length - 1];
    return name.split(/-(.+)/)[1];
  }
  render() {
    const { file } = this.props;
    const filename = this.trimFileName(file);
    const username = Pool.getCurrentUser().getUsername();
    return (
      <div className="card mb-3 bg-light">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{filename}</h5>
              <p className="card-text">{file.fileDescription}</p>
              <p className="card-text">
                <small className="text-muted">
                  Created At:{file.fileCreatedDateTime}
                </small>
                <br></br>
                <small className="text-muted">
                  Updated At:{file.fileUpdatedDateTime}
                </small>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="card"
              style={{ width: "20rem", margin: "20px auto" }}
            >
              <ul className="list-group list-group-flush">
                <Link to="#">
                  <li
                    className="list-group-item alert-primary"
                    onClick={this.downloadImage.bind(
                      this,
                      file.fileUrl,
                      filename
                    )}
                  >
                    <i className="fas fa-flag-checkered"></i> Download File
                  </li>
                </Link>
                <Link to={`/update/${file.fileId}`}>
                  <li className="list-group-item alert-success">
                    <i className="fas fa-edit"></i> Edit File
                  </li>
                </Link>
                <Link to="#">
                  <li
                    className="list-group-item alert-danger"
                    onClick={this.handleDelete.bind(
                      this,
                      username,
                      file.fileUrl,
                      file.fileId
                    )}
                  >
                    <i className="fas fa-minus-circle"></i> Delete File
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteFile })(withRouter(FileItem));
