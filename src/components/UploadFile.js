import React, { Component } from "react";
import Pool from "../UserPool";
import { uploadFile } from "../actions/fileActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UploadFile extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleChange = (ev) => {
    this.setState({ success: false, url: "" });
  };
  handleUpload = (ev) => {
    const userId = Pool.getCurrentUser().getUsername();
    let firstName = "";
    let lastName = "";
    const user = Pool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (session) {
          firstName = session.getIdToken().payload["custom:firstName"];
          lastName = session.getIdToken().payload["custom:lastName"];
        }
      });
    }
    let file = this.uploadInput.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("description", this.state.description);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    this.props.uploadFile(userId, formData, this.props.history);
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Upload</h1>
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="File Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
              <input
                onChange={this.handleChange}
                ref={(ref) => {
                  this.uploadInput = ref;
                }}
                type="file"
              />
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.handleUpload}
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { uploadFile })(withRouter(UploadFile));
