# Web Application Frameworks (COMP3011/COMP 6006)
# Lecture 8: Socket.io and React

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Disclaimer

The external links, references, and materials shared in this lecture are provided for educational and informational purposes only. They are not part of the official Curtin University course content. Curtin University and the lecturer do not endorse or take responsibility for the accuracy, relevance, or completeness of the content provided by third-party sources.

---

## Outline

- Publish Subscribe Architecture
- Socket.io
- React

---

## What is Pub/Sub

- Publisher sends a message (e.g., a blog post).
- Subscriber listens for updates.
- Clients only receive content for topics they have subscribed to.

---

## Requirements

- Express.js for routing and HTTP server.
- Socket.io for real-time WebSocket communication.
- HTML + JavaScript on client side.
- Installation:

```bash
npm install express socket.io
```

---

## Socket.io Setup with Express

> *[Slide contains code screenshot - see PDF]*

---

## Setting up Server Side for Subscription

> *[Slide contains code screenshot - see PDF]*

---

## Setting up Server Side for Publishing

> *[Slide contains code screenshot - see PDF]*

---

## Subscriber Client: `index.html`

> *[Slide contains code screenshot - see PDF]*

---

## Publisher Form: `publish.html`

> *[Slide contains code screenshot - see PDF]*

---

## What Else Can We Do?

- Add authentication for publishing and subscribing.
- Allow multiple subscription per user.
- Extend the same architecture into a real-time chat application.
- Learn more: https://socket.io/

---

## Single-Page Application (SPA)

- Loads a single HTML page and dynamically updates content as the user interacts with the app, without reloading the page.
- Examples: Gmail, Google Maps, React/Angular/Vue apps.
- Characteristics:
  - Faster user experience after initial load.
  - Uses AJAX/fetch/WebSockets for dynamic content.
  - Typically powered by frontend frameworks (React, Vue, Angular).
  - URL changes are often handled client-side (e.g., `react-router`).

---

## SPA Pros & Cons

- Pros:
  - Seamless user experience.
  - Reduces server load.
  - Fast page transitions.
- Cons:
  - Larger initial load time.
  - More complex client-side logic.

---

## What is React?

- A popular JavaScript library developed by Meta (Facebook) for building user interfaces, especially for SPAs.
- Key features:
  - Component-based
  - Declarative
  - Virtual DOM
  - Unidirectional data flow
  - JSX (JavaScript XML)

---

## YOUR TURN (15min): Setting up for `create-react-app`

In the next three workshops, you will build a React Twitter clone app called `JustTweet`.

At this stage, `JustTweet` allows users to:

- Post tweets
- View past tweets
- Delete a tweet

Create a new project in Visual Studio Code (or your preferred IDE) for `JustTweet`.

You should already have Node.js installed from previous work. If not, refer back to earlier lectures.

---

## YOUR TURN: Creating the App and the Plan

To create a new React app, issue the following command from within your folder:

```bash
[user@pc]$ npx create-react-app justtweet
```

`npx` fetches the latest version of `create-react-app` so you do not have to install and maintain it globally.

After this completes, you should have a sub-folder named `justtweet` where your app files reside.

The plan today is to build the basis of the Twitter clone UI using the workshop image as a guide, and to begin composing reusable React components (alongside Bootstrap components).

---

## YOUR TURN: Creating the App and the Plan (Alternative and Faster)

Alternative approach using Vite (faster and recommended for modern React apps):

```bash
npm create vite@latest justtweet -- --template react
```

---

## Components

Components are reusable units in React.

- They accept arbitrary inputs called `props` (properties).
- They return React elements describing what should appear on screen.
- You can define components as:
  - Function-based (functional components), or
  - ES6 class-based components.

---

## Functional and Class Components

Functional component:

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Class component (same output):

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

---

## Class Component: In Full

```jsx
import React, { Component } from "react";

class Welcome extends Component {
  render() {
    return (
      <h1>Hello World!!</h1>
    );
  }
}

export default Welcome;
```

---

## React State

- State is managed within a component (similar to instance values in a class).
- State is an object where a component's local values are stored.
- When state changes, the component re-renders.
- State is optional.

---

## React Components: Advanced Code

> *[Slide contains code screenshot - see PDF]*

---

## React Components: What's Happening?

- After importing `Component`, we can use shorthand in the class definition.
- A state property `count` is initialized as `0`.
- `render()` defines what appears on screen.
  - Only what is returned by `render()` is displayed.
- `formatCount()` is a normal helper function used for display logic.
- Inline style dictionaries can be defined outside `render()` and reused.

---

## React Components: The Output

> *[Slide contains screenshot - see PDF]*

---

## Rendering Dynamic Components: The Code

> *[Slide contains code screenshot - see PDF]*

---

## Rendering Dynamic Components: What's Happening?

- Conditional class construction is used in `render()`.
- If `this.state.count === 0`, the badge/button style changes (e.g., warning vs primary).
- Similar conditional logic is used in `formatCount()` (`Zero` vs numeric value).
- The same component can look different based on state.

At this stage, without event handlers, the UI stays static.

---

## Rendering Dynamic Components: The Output

> *[Slide contains screenshot - see PDF]*

---

## Rendering Lists: The Code

> *[Slide contains code screenshot - see PDF]*

---

## Rendering Lists: The Output

> *[Slide contains screenshot - see PDF]*

---

## `map()` Function

`map()` can iterate over an array and call a function for every element:

```js
myArray.map(function(currentValue, index, arr))
```

Parameters:

- `currentValue`: current element being processed
- `index` (optional): index of current element
- `arr` (optional): the original array

---

## Conditional Rendering: Code Example

> *[Slide contains code screenshot - see PDF]*

---

## Conditional Rendering: In Practice

> *[Slide contains screenshot - see PDF]*

---

## Handling Events: Code Example

> *[Slide contains code screenshot - see PDF]*

---

## Constructors

```js
constructor() {
  super();
  this.incrementCart = this.incrementCart.bind(this);
}
```

- In React class components, `constructor` is commonly used to:
  - Bind event handlers to the component instance.
  - Initialize local state (when needed).
- `constructor()` is called before the component is mounted.

---

## `setState()`

`setState()` enqueues changes to component state and tells React to re-render the component (and children) with updated values.

This is the primary method for updating the UI in response to:

- Event handlers
- Server responses

---

## Event Arguments: Code Example

> *[Slide contains code screenshot - see PDF]*

---

## Event Arguments: In Practice

> *[Slide contains screenshot - see PDF]*

---

## YOUR TURN: JustTweet Twitter Clone

> *[Slide contains UI mockup image with component boundaries - see PDF]*

---

## YOUR TURN: Notes to the Twitter Clone

On first glance, this may appear like a large problem.

- Break it down into smaller pieces.
- Focus first on identifying and creating components.
- Prioritize consistency of component structure.
- Do not worry yet about complete functionality or perfect visual polish.
- You do not need to implement the photo/video gallery at this stage.
- The profile picture should still be implemented inside `ProfileInfo`.

---

## YOUR TURN: Iterative Development

Use an iterative approach:

1. Break the page into components.
2. Arrange components and fill with boilerplate data.
3. Replace boilerplate with real data over time.
4. In later weeks, introduce stronger React-Bootstrap layout/styling refinements.

---

## YOUR TURN: Folder Structure

Suggested tree:

```text
README.md
package-lock.json
package.json
public/
  index.html
src/
  components/
    navbar.js
    newtweet.js
    profilecover.js
    profileinfo.js
    profilestats.js
    rightpanel.js
    tweetcard.js
  index.js
  App.js
  index.css
```

---

## YOUR TURN: Component Development

Develop components needed for the interface:

- Navbar
- ProfileInfo
- ProfileCover
- ProfileStats
- RightPanel
- NewTweet
- TweetCard

Skeleton for a class component:

```jsx
import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div>Define your NavBar here.</div>
    );
  }
}

export default Navbar;
```

---

## YOUR TURN: Tips and Preparation

- Use the `App` component to compose and assemble smaller components into one UI.
- Think of `App` as the entry composition point (similar to `main()`).
- `TweetCard` should map multiple individual tweet cards (one per tweet).
- Install React-Bootstrap for layout/components:
  - https://react-bootstrap.netlify.app/docs/getting-started/introduction

---

## YOUR TURN: Bringing it Together

Example of combining components in `App.js`:

```jsx
import OneComponent from "./components/onecomponent";
import TwoComponent from "./components/twocomponent";

function App() {
  return (
    <>
      <OneComponent />
      <TwoComponent />
    </>
  );
}

export default App;
```

---

## YOUR TURN: Utilizing Bootstrap

Install React-Bootstrap:

```bash
npm install react-bootstrap bootstrap
```

Import Bootstrap CSS near the top of `index.css`:

```css
@import "bootstrap/dist/css/bootstrap.css";
```

Import React-Bootstrap in any React component:

```jsx
import * as ReactBootstrap from "react-bootstrap";
```

Use components in JSX:

```jsx
<ReactBootstrap.Button className=""></ReactBootstrap.Button>
```

Note: JSX `className` is equivalent to HTML `class`.

---

## YOUR TURN: Implementing Bootstrap and Testing

- Start adjusting your project to use Bootstrap components.
- Populate components with representative content (full aesthetics can come later).
- Run your React app to verify everything renders:

```bash
[user@pc]$ npm start
```

This may take some time initially; the app is usually available on port `3000`.

---

## Summary

- React is a JavaScript library for building complex and interactive UIs with a declarative style.
- The main building units are components.
- Components can store and manipulate `props` and `state`.
- JSX extends JavaScript so you can compose component tags and HTML-like structures in code.
- As shown in lecture examples, significant functionality can run directly in the browser without constant server round-trips.
