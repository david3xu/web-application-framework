import React, { Component } from "react";

class ProfileInfo extends Component {
  render() {
    return (
      <div className="my-3">
        <h2 className="mb-0">Welcome, {this.props.username}</h2>
        <small className="text-muted">@{this.props.username.toLowerCase()}</small>
      </div>
    );
  }
}

export default ProfileInfo;
