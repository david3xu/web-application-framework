import React, { Component } from "react";
import Navbar from "./components/navbar";
import ProfileCover from "./components/profilecover";
import ProfileInfo from "./components/profileinfo";
import ProfileStats from "./components/profilestats";
import NewTweet from "./components/newtweet";
import TweetCard from "./components/tweetcard";
import RightPanel from "./components/rightpanel";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewTweet = this.handleNewTweet.bind(this);
  }

  state = {
    tweets: [
      { id: 1, name: "John Smith", username: "@john", date: "Nov 20", tweetDesc: "Hello World!!" },
      { id: 2, name: "John Smith", username: "@john", date: "Dec 20", tweetDesc: "Twitter is fun!" },
      { id: 3, name: "John Smith", username: "@john", date: "Dec 20", tweetDesc: "I like tweeting!" },
      { id: 4, name: "John Smith", username: "@john", date: "Jan 21", tweetDesc: "React is cool" }
    ]
  };

  handleDelete(tweetID) {
    const tweets = this.state.tweets.filter(function (item) {
      return item.id !== tweetID;
    });
    this.setState({ tweets: tweets });
  }

  handleNewTweet(newTweet) {
    this.setState({
      tweets: [
        ...this.state.tweets,
        {
          id: this.state.tweets.length + 1,
          name: "John Smith",
          username: "@john",
          date: new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
          }),
          tweetDesc: newTweet
        }
      ]
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <ProfileCover />
              <ProfileInfo username="JustTweetUser" />
              <ProfileStats tweetCount={this.state.tweets.length} />
              <NewTweet onNewTweet={this.handleNewTweet} />
              {this.state.tweets.map((tweet) => (
                <TweetCard
                  key={tweet.id}
                  id={tweet.id}
                  name={tweet.name}
                  username={tweet.username}
                  date={tweet.date}
                  tweetDesc={tweet.tweetDesc}
                  onDelete={this.handleDelete}
                />
              ))}
            </div>
            <div className="col-md-4">
              <RightPanel />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
