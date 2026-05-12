import React, { Component } from "react";

class ProfileStats extends Component {
  render() {
    return (
      <div className="d-flex gap-4 mb-3 text-muted">
        <span>
          <strong className="text-dark">{this.props.tweetCount}</strong> Tweets
        </span>
        <span>
          <strong className="text-dark">0</strong> Following
        </span>
        <span>
          <strong className="text-dark">0</strong> Followers
        </span>
      </div>
    );
  }
}

export default ProfileStats;
