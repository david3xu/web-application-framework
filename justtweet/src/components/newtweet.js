import React, { Component } from "react";
import { Button } from "react-bootstrap";

class NewTweet extends Component {
  constructor(props) {
    super(props);
    this.state = { tweetDesc: "" };
    this.handleTweetDescChange = this.handleTweetDescChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTweetDescChange(e) {
    this.setState({ tweetDesc: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.state.tweetDesc.trim();
    if (!text) return;
    this.props.onNewTweet(text);
    this.setState({ tweetDesc: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="What's happening?"
            value={this.state.tweetDesc}
            onChange={this.handleTweetDescChange}
          />
          <Button type="submit" variant="primary">
            Tweet
          </Button>
        </div>
      </form>
    );
  }
}

export default NewTweet;
