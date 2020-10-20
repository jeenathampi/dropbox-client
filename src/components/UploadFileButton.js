import React from "react";
import { Link } from "react-router-dom";

const UploadFileButton = () => {
  return (
    <div style={{ margin: "80px 0px auto" }}>
      <Link to="/upload" className="btn btn-primary">
        Upload a file
      </Link>
      <hr></hr>
    </div>
  );
};

export default UploadFileButton;
