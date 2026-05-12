import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-white border-bottom mb-3">
        <div className="container">
          <span className="navbar-brand fw-bold text-primary">JustTweet</span>
        </div>
      </nav>
    );
  }
}

export default Navbar;
