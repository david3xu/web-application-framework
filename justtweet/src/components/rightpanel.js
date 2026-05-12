import React, { Component } from "react";

class RightPanel extends Component {
  render() {
    return (
      <div className="card mt-3">
        <div className="card-body">
          <h6 className="text-muted mb-3">Who to follow</h6>
          <p className="mb-1">React News</p>
          <p className="mb-1">Curtin University</p>
          <p className="mb-0">Anthropic</p>
        </div>
      </div>
    );
  }
}

export default RightPanel;
