import React, { Component } from "react";
import Pool from "../UserPool";
import { getFile, updateFile } from "../actions/fileActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UpdateFile extends Component {
  constructor() {
    super();
    this.state = {
      fileDescription: "",
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
    const { id } = this.props.match.params;
    const { fileUrl, fileCreatedDateTime } = this.props.file.file.Item;
    let file = this.uploadInput.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("description", this.state.fileDescription);
    formData.append("fileId", id);
    formData.append("url", fileUrl);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("fileCreatedDateTime", fileCreatedDateTime);
    this.props.updateFile(userId, formData, this.props.history);
    this.props.history.push("/dashboard");
  };
  componentWillReceiveProps(nextProps) {
    const { fileDescription } = nextProps.file.file.Item;
    this.setState({
      fileDescription,
    });
  }
  componentDidMount() {
    const userId = Pool.getCurrentUser().getUsername();
    const { id } = this.props.match.params;
    this.props.getFile(userId, id, this.props.history);
  }
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
                  name="fileDescription"
                  value={this.state.fileDescription}
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
function mapStateToProps({ file }) {
  return { file };
}
export default connect(mapStateToProps, { getFile, updateFile })(
  withRouter(UpdateFile)
);
