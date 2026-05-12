import React, { Component } from "react";
import { Button } from "react-bootstrap";

class TweetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      username: this.props.username,
      date: this.props.date,
      tweetDesc: this.props.tweetDesc
    };
  }

  render() {
    return (
      <div className="card mb-2">
        <div className="card-body">
          <span>
            <Button
              onClick={() => this.props.onDelete(this.props.id)}
              variant="link"
              className="float-end p-0"
            >
              x
            </Button>
          </span>
          <h6 className="mb-1">
            {this.state.name}{" "}
            <small className="text-muted">
              {this.state.username} · {this.state.date}
            </small>
          </h6>
          <p className="mb-0">{this.state.tweetDesc}</p>
        </div>
      </div>
    );
  }
}

export default TweetCard;
