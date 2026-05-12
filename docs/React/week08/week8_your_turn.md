# Web Application Frameworks (COMP3011/COMP 6006)

## Week 8 Lab Exercises: Socket.io and React

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Revision — What We Have Covered So Far

Before diving into Week 8, here is a quick summary of the ground covered across the unit:

| Week | Topic | What it gave us |
|------|-------|-----------------|
| 1–3 | Django (MTV) | Full server-side rendering with models, views, templates, URL routing |
| 4–5 | Bootstrap | Responsive layout and reusable interface components |
| 6 | Node.js + Express fundamentals | Routing, middleware, HTTP methods, form handling |
| 7 | Advanced Express | MongoDB Atlas, Mongoose models, Pug templates, CRUD delete flow |
| **8** | **Socket.io + React** | **Real-time publish/subscribe and component-based SPA frontend** |

### Week 7 recap — answer these before starting

- **Why do we use Mongoose with MongoDB?**
  > Mongoose gives structure and validation to otherwise schema-flexible MongoDB documents, plus convenient query/model APIs.
  >
  > ```js
  > const todoSchema = new mongoose.Schema({ taskName: String });
  > const Todo = mongoose.model("Todo", todoSchema);
  > ```

- **Why did we switch from static HTML to Pug in Week 7?**
  > Pug lets us merge live data (from MongoDB) into server-rendered HTML templates cleanly.
  >
  > ```js
  > res.render("index", { toDoList: todos });
  > ```

- **Why is `express.static('public')` important?**
  > It serves CSS/JS/image files directly, so assets load without writing one route per file.

---

## Where You Should Be Starting — Week 7 Final State

This section shows the expected baseline from Week 7 before beginning Week 8.

### Project structure (Week 7 end state)

```text
EasyToDo/
├── node_modules/
├── package.json
├── package-lock.json
├── app.js
├── views/
│   └── index.pug
└── public/
    ├── css/
    │   └── todo.css
    └── js/
        └── main.js
```

### Dependencies installed in Week 7

Your `package.json` should include these (versions may differ):

```json
{
  "dependencies": {
    "express": "^4.x",
    "body-parser": "^1.x",
    "mongoose": "^8.x",
    "pug": "^3.x"
  }
}
```

### Verify before continuing

1. Start your Week 7 app.
2. Confirm `GET /` renders to-dos from MongoDB.
3. Confirm creating a to-do persists to Atlas.
4. Confirm deleting a to-do removes it from Atlas.

If that works, you are ready for Week 8.

---

## Before You Begin

### Where we are

At the end of Week 7, your app looked like this:

```text
Browser
  │
  │ GET /            -> Express route -> Mongoose -> MongoDB
  │ POST /todos      -> Express route -> save document
  │ DELETE /todos/:id -> Express route -> delete document
  ▼
Express + Pug (server-rendered pages)
```

### What changes this week

> **Note:** Week 8 does **not** extend the Week 7 EasyToDo app. You will create a new React project (`JustTweet`) and a separate `socket-demo/` folder. The Week 7 baseline is required reading so you can compare server-rendered vs SPA architecture, not because we add code to it.

> **Lecture vs lab order:** The Week 8 lecture introduces Socket.io first, then React. This lab reverses that — Exercises 1–8 build the React UI, Exercises 9–11 add the Socket.io demo. Either order is fine; the lab order lets you see the React SPA working end-to-end before adding real-time events.

Week 8 adds two new ideas:

```text
Client Side (React SPA)
  │
  ├── Component UI (Navbar, ProfileInfo, TweetCard, ...)
  ├── Local state + events
  └── Dynamic list rendering without full page reload
  │
  └── Optional real-time stream via Socket.io
          │
          ▼
Express + Socket.io server (publish/subscribe)
```

### What you already know

| What you know | What replaces/extends it this week | Why |
|---------------|------------------------------------|-----|
| Server-rendered Pug UI | React component UI | More interactive frontend behavior in-browser |
| HTTP request/response only | Socket.io event stream | Real-time push from server to clients |
| Page reload after changes | State-driven updates | Faster, SPA-style user experience |

### What you will build — exercise by exercise

| Exercise | What you do | New piece in the architecture |
|----------|-------------|-------------------------------|
| 1 | Create `JustTweet` app | React project scaffold |
| 2 | Start and verify the starter page | Toolchain sanity check |
| 3 | Build component folder structure | UI decomposition |
| 4 | Compose page in `App.js` | Component composition |
| 5 | Render tweets from an array/state | Dynamic list rendering |
| 6 | Add empty-state handling | Conditional rendering |
| 7 | Add event handler + state update | Interactivity |
| 8 | Integrate React-Bootstrap | UI component library |
| 9 | Build Socket.io mini pub/sub demo | Real-time events |
| 10 | Connect publisher and subscriber | Event wiring |
| 11 | Run and verify complete flow | End-to-end behavior |

Work through each exercise in order.

---

## Exercise 1 — Create the React Project (10 min)

> **Concept:** React projects come preconfigured with tooling (bundling, development server, hot reload). This avoids manual setup and lets you focus on components and data flow.

Use `create-react-app` (the lecture default) so the file names in later exercises (`App.js`, `index.js`, `index.css`) match what you have on disk:

```bash
[user@pc]$ npx create-react-app justtweet
[user@pc]$ cd justtweet
```

> **Vite users:** Vite is faster but generates `App.jsx`/`main.jsx` instead of `App.js`/`index.js`. If you choose Vite, mentally translate `.js` → `.jsx` and `npm start` → `npm run dev` throughout the rest of this lab.

---

## Exercise 2 — Start and Verify the Project (5 min)

> **Concept:** Always confirm your baseline runs before editing files. It isolates setup issues from coding issues.

```bash
[user@pc]$ npm start
```

Open the local URL shown in terminal (typically `http://localhost:3000`) and confirm the starter page loads.

---

## Exercise 3 — Create Component Structure (10 min)

> **Concept:** Breaking UI into components keeps responsibilities small and reusable. This is the core React design pattern.

`create-react-app` already generated `src/App.js`, `src/index.js`, and `src/index.css` — keep them. Inside `src/`, create a `components/` folder and add one file per component:

```text
src/
  components/         ← create this folder + the 7 files inside it
    navbar.js
    newtweet.js
    profilecover.js
    profileinfo.js
    profilestats.js
    rightpanel.js
    tweetcard.js
  App.js              ← already exists, will be edited in Ex 4
  index.js            ← already exists, leave as-is
  index.css           ← already exists, will be edited in Ex 8
```

Use this class-component skeleton for each component. We use class components throughout Week 8 because Exercises 5–7 rely on `state = { ... }` and `this.setState(...)`.

```jsx
import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return <div>Define your NavBar here.</div>;
  }
}

export default Navbar;
```

> **Syntax note:** The lecture initialises state inside a `constructor`:
>
> ```jsx
> constructor(props) {
>   super(props);
>   this.state = { count: 0 };
> }
> ```
>
> This lab uses the equivalent **class-field** shorthand `state = { count: 0 };` (no constructor needed). Both produce the same component; pick the style your tutor prefers and stay with it.

---

## Exercise 4 — Compose Components in `App.js` (10 min)

> **Concept:** `App` is the composition root for this stage. It assembles small components into one page-level view.

Update `App.js` as a class component (keeping the same style as the other components):

```jsx
import React, { Component } from "react";
import Navbar from "./components/navbar";
import NewTweet from "./components/newtweet";
import ProfileCover from "./components/profilecover";
import ProfileInfo from "./components/profileinfo";
import ProfileStats from "./components/profilestats";
import RightPanel from "./components/rightpanel";
import TweetCard from "./components/tweetcard";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <ProfileCover />
        <ProfileInfo />
        <ProfileStats />
        <NewTweet />
        <TweetCard />
        <RightPanel />
      </>
    );
  }
}

export default App;
```

Do not worry about final styling yet.

---

## Exercise 5 — Render Dynamic Tweet Lists (15 min)

> **Concept:** In React, array data is rendered to UI with `map()`. Each item needs a stable `key` so React can update efficiently.

In `tweetcard.js`, add `state` as a class field and render it inside `render()`. Your full class so far should look like:

```jsx
import React, { Component } from "react";

class TweetCard extends Component {
  state = {
    tweets: [
      { id: 1, text: "First post in JustTweet!" },
      { id: 2, text: "Learning React components this week." }
    ]
  };

  render() {
    return (
      <ul>
        {this.state.tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.text}</li>
        ))}
      </ul>
    );
  }
}

export default TweetCard;
```

---

## Exercise 6 — Add Conditional Rendering (10 min)

> **Concept:** UI should represent data state. If no tweets exist, show a meaningful empty-state message rather than an empty list.

Update the `render()` method of `TweetCard` so it returns the empty-state message when there are no tweets, otherwise the list:

```jsx
render() {
  if (this.state.tweets.length === 0) {
    return <p>There are no tweets yet.</p>;
  }

  return (
    <ul>
      {this.state.tweets.map((tweet) => (
        <li key={tweet.id}>{tweet.text}</li>
      ))}
    </ul>
  );
}
```

---

## Exercise 7 — Handle Events and Update State (15 min)

> **Concept:** React UI changes should happen through state updates. In class components, use `this.setState(...)`; do not mutate state directly.

Add an `addTweet` method as a class field on `TweetCard`, and attach it to a button inside `render()`. The complete class should now look like:

```jsx
import React, { Component } from "react";

class TweetCard extends Component {
  state = {
    tweets: [
      { id: 1, text: "First post in JustTweet!" },
      { id: 2, text: "Learning React components this week." }
    ]
  };

  addTweet = () => {
    const nextId = this.state.tweets.length + 1;
    const nextTweet = { id: nextId, text: `Demo tweet ${nextId}` };
    this.setState({ tweets: [...this.state.tweets, nextTweet] });
  };

  render() {
    if (this.state.tweets.length === 0) {
      return <p>There are no tweets yet.</p>;
    }

    return (
      <div>
        <button onClick={this.addTweet}>Add Tweet</button>
        <ul>
          {this.state.tweets.map((tweet) => (
            <li key={tweet.id}>{tweet.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TweetCard;
```

> **Why `addTweet = () => { ... }` (arrow class field)?** It auto-binds `this` to the component instance, so `<button onClick={this.addTweet}>` works without `.bind(this)` in a constructor.

---

## Exercise 8 — Integrate React-Bootstrap (10 min)

> **Concept:** React-Bootstrap gives Bootstrap UI components as React components, so styling and composition stay in JSX.

Install:

```bash
[user@pc]$ npm install react-bootstrap bootstrap
```

In `src/index.css`, add:

```css
@import "bootstrap/dist/css/bootstrap.css";
```

Import React-Bootstrap at the top of `tweetcard.js` and replace the plain `<button>` from Ex 7 with a styled one:

```jsx
import * as ReactBootstrap from "react-bootstrap";

// inside render(), replace:
//   <button onClick={this.addTweet}>Add Tweet</button>
// with:
<ReactBootstrap.Button variant="primary" onClick={this.addTweet}>
  Add Tweet
</ReactBootstrap.Button>
```

Note: JSX `className` equals HTML `class`.

---

## Exercise 9 — Build a Socket.io Pub/Sub Mini Demo (15 min)

> **Concept:** Socket.io supports event-based, bidirectional communication. Instead of polling, clients can receive updates immediately when publishers send events.

The socket demo is a separate Node project — **do not** run it inside `justtweet/`. Open a new terminal and create it alongside `justtweet/`:

```bash
[user@pc]$ mkdir socket-demo
[user@pc]$ cd socket-demo
[user@pc]$ npm init -y
[user@pc]$ npm install express socket.io
```

You should end up with this structure (you will fill in the three files in Ex 10):

```text
socket-demo/
├── package.json
├── server.js
└── public/
    ├── index.html       (subscriber)
    └── publish.html     (publisher)
```

Create the empty files now:

```bash
[user@pc]$ mkdir public
[user@pc]$ touch server.js public/index.html public/publish.html
```

Minimum behavior the demo must achieve:

1. Subscriber page connects and listens for an event.
2. Publisher page emits a message event.
3. Server broadcasts the event to all connected subscribers.
4. Subscriber UI updates immediately, with no page reload.

---

## Exercise 10 — Connect Publisher and Subscriber (10 min)

> **Concept:** Publish/subscribe decouples message producers from consumers. Producers emit events; subscribers only handle the events they care about.

### `server.js` (full file)

```js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("publish_message", (payload) => {
    io.emit("news_update", payload);
  });
});

server.listen(3001, () => {
  console.log("Socket demo listening on http://localhost:3001");
});
```

> Port `3001` keeps it clear of CRA's default `3000`.

### `public/index.html` (subscriber)

```html
<!doctype html>
<html>
  <head><title>Subscriber</title></head>
  <body>
    <h1>News feed</h1>
    <ul id="feed"></ul>

    <script src="/socket.io/socket.io.js"></script>
    <script>
      const socket = io();
      const feed = document.getElementById("feed");

      socket.on("news_update", (payload) => {
        const item = document.createElement("li");
        item.textContent = payload;
        feed.appendChild(item);
      });
    </script>
  </body>
</html>
```

### `public/publish.html` (publisher)

```html
<!doctype html>
<html>
  <head><title>Publisher</title></head>
  <body>
    <h1>Publish a message</h1>
    <input id="msg" type="text" placeholder="Type a message" />
    <button id="send">Publish</button>

    <script src="/socket.io/socket.io.js"></script>
    <script>
      const socket = io();
      document.getElementById("send").addEventListener("click", () => {
        const text = document.getElementById("msg").value;
        socket.emit("publish_message", text);
      });
    </script>
  </body>
</html>
```

> **About `/socket.io/socket.io.js`:** you do not write this file. The `socket.io` server library serves it automatically once `new Server(server)` is created — that's why it "just works" from the client side.

---

## Exercise 11 — Integration Check and Run (5 min)

You need **two terminals**, one for each project.

Terminal 1 — React app:

```bash
[user@pc]$ cd justtweet
[user@pc]$ npm start            # http://localhost:3000
```

Terminal 2 — Socket demo:

```bash
[user@pc]$ cd socket-demo
[user@pc]$ node server.js       # http://localhost:3001
```

Verify the React app (browser tab on `:3000`):

- Components render correctly.
- List rendering works.
- Empty-state behavior works.
- Clicking the Add Tweet button updates state and UI.
- Bootstrap styles apply (Ex 8).

Verify the socket demo (two browser tabs on `:3001`):

- Open `http://localhost:3001/index.html` in one tab (subscriber).
- Open `http://localhost:3001/publish.html` in another tab (publisher).
- Type a message in the publisher and click **Publish**.
- The message appears on the subscriber page immediately, with no reload.

---

## Final `App.js` and `tweetcard.js` — Week 8 Complete State (Core)

After finishing Exercises 1–8, a core working state should resemble the snippets below. `tweetcard.js` shows the React-Bootstrap button from Ex 8; if you skipped Ex 8, swap `<ReactBootstrap.Button …>` back to a plain `<button>`.

### `src/App.js`

```jsx
import React, { Component } from "react";
import Navbar from "./components/navbar";
import NewTweet from "./components/newtweet";
import ProfileCover from "./components/profilecover";
import ProfileInfo from "./components/profileinfo";
import ProfileStats from "./components/profilestats";
import RightPanel from "./components/rightpanel";
import TweetCard from "./components/tweetcard";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <ProfileCover />
        <ProfileInfo />
        <ProfileStats />
        <NewTweet />
        <TweetCard />
        <RightPanel />
      </>
    );
  }
}

export default App;
```

### `src/components/tweetcard.js`

```jsx
import React, { Component } from "react";
import * as ReactBootstrap from "react-bootstrap";

class TweetCard extends Component {
  state = {
    tweets: [
      { id: 1, text: "First post in JustTweet!" },
      { id: 2, text: "Learning React components this week." }
    ]
  };

  addTweet = () => {
    const nextId = this.state.tweets.length + 1;
    const nextTweet = { id: nextId, text: `Demo tweet ${nextId}` };
    this.setState({ tweets: [...this.state.tweets, nextTweet] });
  };

  render() {
    if (this.state.tweets.length === 0) {
      return <p>There are no tweets yet.</p>;
    }

    return (
      <div>
        <ReactBootstrap.Button variant="primary" onClick={this.addTweet}>
          Add Tweet
        </ReactBootstrap.Button>
        <ul>
          {this.state.tweets.map((tweet) => (
            <li key={tweet.id}>{tweet.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TweetCard;
```

The full `socket-demo/` (`server.js`, `public/index.html`, `public/publish.html`) is shown in Ex 10 — refer back to those snippets rather than duplicating them here.

---

## Concept Reference

### 1. Complete request/update flow (Week 8)

```text
User action in React component
  │
  ├── Local UI update via state
  │
  └── (Optional real-time path)
        emit socket event -> server receives -> server broadcasts
        -> subscribers receive -> UI updates immediately
```

### 2. Pub/Sub in one sentence

Publishers send messages to topics/channels; subscribers receive updates for the channels they listen to.

### 3. SPA behavior

A SPA loads once, then updates view state dynamically in-browser instead of reloading full pages repeatedly.

### 4. `props` vs `state`

| Concept | Description |
|---------|-------------|
| `props` | Read-only input passed from parent components |
| `state` | Local mutable data owned by a component |

Quick example (not built in this lab — illustrates the difference). Suppose `ProfileInfo` receives a `username` from `App`:

```jsx
// In App's render():
<ProfileInfo username="JustTweetUser" />
```

```jsx
// In profileinfo.js:
import React, { Component } from "react";

class ProfileInfo extends Component {
  render() {
    return <h2>Welcome, {this.props.username}</h2>;
  }
}

export default ProfileInfo;
```

`username` here is a `prop` — passed in by the parent (`App`), and read-only inside `ProfileInfo`. Contrast `TweetCard.state.tweets`, which `TweetCard` owns and updates via `setState`.

### 5. Why `setState()` matters

`setState()` schedules a state transition and re-render. Direct mutation (`this.state.x = ...`) skips React's update cycle.

### 6. Why `map()` matters

`map()` converts arrays into JSX lists for dynamic rendering. `key` helps React track item identity.

### 7. Socket.io value

Socket.io enables bidirectional real-time communication for features like live feeds, chat, collaborative updates, and notifications.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npx create-react-app justtweet` | Create React project with CRA |
| `npm create vite@latest justtweet -- --template react` | Create React project with Vite |
| `cd justtweet` | Enter the project folder (run before `npm start`/`dev`) |
| `npm start` | Run CRA development server |
| `npm run dev` | Run Vite development server |
| `npm install react-bootstrap bootstrap` | Add Bootstrap for React components |
| `mkdir socket-demo && cd socket-demo` | Create and enter the socket demo folder |
| `npm install express socket.io` | Add Socket.io real-time backend stack |
| `node server.js` | Run socket demo server |

| React feature | What it solves |
|---------------|----------------|
| Components | Reusable UI units |
| JSX | HTML-like component markup in JS |
| State | Data that changes over time |
| Conditional rendering | Show different UI for different states |
| List rendering (`map`) | Render repeated UI from arrays |
| Event handlers | Respond to user actions |
