# Web Application Frameworks (COMP3011/COMP 6006)

## Week 10 Lab Exercises: Routing and Connecting with React

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Revision — What We Have Covered So Far

Before diving into Week 10, here is a quick summary of the ground covered across the unit:

| Week | Topic | What it gave us |
|------|-------|-----------------|
| 1–3 | Django (MTV) | Full server-side rendering with models, views, templates, URL routing |
| 4–5 | Bootstrap | Responsive layout and reusable interface components |
| 6 | Node.js + Express fundamentals | Routing, middleware, HTTP methods, form handling |
| 7 | Advanced Express | MongoDB Atlas, Mongoose models, Pug templates, CRUD delete flow |
| 8 | Socket.io + React | SPA thinking, basic components, state, rendering |
| 9 | Composition and Events with React | Props, `children`, parent-child communication |
| **10** | **Routing and Connecting with React** | **Hooks, routing, backend requests, dynamic tweet flow** |

### Week 9 recap — answer these before starting

- **What are props in React?**
  > Props are read-only inputs passed from parent components to child components.

- **What is `props.children`?**
  > `props.children` contains the nested content placed between a component's opening and closing tags.

- **How does a child component communicate with a parent?**
  > The parent passes a handler function as a prop, and the child calls that function in response to an event.

- **Why is state often stored higher in the component tree?**
  > So related child components can stay consistent by sharing one source of truth.

---

## Where You Should Be Starting — Week 9 Final State

This week continues the same `JustTweet` React project from Weeks 8 and 9.

Before continuing, confirm that your project still includes:

- working React components
- parent-child component composition
- props being passed to children
- at least one child component calling a parent handler
- a running development server with `npm start`

If that baseline works, you are ready for Week 10.

---

## Before You Begin

Week 10 extends your React app in two important directions:

1. **routing** — letting the browser URL control which UI is displayed
2. **connecting to data** — letting your React app send and receive information

This means the course progression now looks like this:

- Week 8: build React components
- Week 9: connect components together with props and events
- Week 10: connect the app to routes and remote/backend-style data

---

## Exercise 1 — Confirm the Existing `JustTweet` Project Still Runs (5 min)

> **Concept:** Before adding new functionality, make sure your current baseline is still stable.

Run your project:

```bash
[user@pc]$ npm start
```

Check that the app loads correctly in the browser.

---

## Exercise 2 — Review the Dynamic Tweet Goal (5 min)

> **Concept:** React components should render from data rather than from hardcoded repeated HTML.

This week you will work toward these goals:

- dynamically render tweets
- delete tweets
- post a new tweet
- dynamically update the tweet count in `ProfileStats`

Write a short note explaining why rendering from data is better than hardcoding each tweet directly in JSX.

---

## Exercise 3 — Define Tweet Data in the Parent State (10 min)

> **Concept:** Shared application data is usually stored in a higher-level parent component.

In your `App` component, define a `tweets` array inside the component state.

Example structure:

```jsx
tweets: [
  { id: 1, name: "John Smith", username: "@john", date: "Nov 20", tweetDesc: "Hello World!!" },
  { id: 2, name: "John Smith", username: "@john", date: "Dec 20", tweetDesc: "Twitter is fun!" },
  { id: 3, name: "John Smith", username: "@john", date: "Dec 20", tweetDesc: "I like tweeting!" },
  { id: 4, name: "John Smith", username: "@john", date: "Jan 21", tweetDesc: "React is cool" }
]
```

In your notes, explain what the keys and values represent.

---

## Exercise 4 — Render Tweets Dynamically with `map()` (10 min)

> **Concept:** `map()` transforms each data item into a rendered component.

In the `render()` function of `App`, render `TweetCard` from the `tweets` array:

```jsx
{this.state.tweets.map(tweet => (
  <TweetCard
    key={tweet.id}
    name={tweet.name}
    username={tweet.username}
    date={tweet.date}
    tweetDesc={tweet.tweetDesc}
  />
))}
```

Answer in your notes:

1. What does `map()` do?
2. What does the code above do?

---

## Exercise 5 — Receive Tweet Data in `TweetCard` (10 min)

> **Concept:** A child component can initialise its display state from props received from the parent.

In your `TweetCard` component, add a constructor that sets state from props:

```jsx
constructor(props) {
  super(props);
  this.state = {
    name: this.props.name,
    username: this.props.username,
    date: this.props.date,
    tweetDesc: this.props.tweetDesc
  };
}
```

Then update the `render()` function so the tweet details are shown dynamically.

Hint: use JSX expressions such as:

```jsx
{this.state.name}
```

---

## Exercise 6 — Delete a Tweet by Updating the Parent State (10 min)

> **Concept:** If the parent owns the tweet array, the parent must handle deleting items from it.

In the `App` component, create a function:

```jsx
handleDelete(tweetID) {
  const tweets = ???;
  this.setState({
    tweets: tweets
  });
}
```

Complete the code using `filter()` so that the new array contains every tweet **except** the one matching `tweetID`.

---

## Exercise 7 — Bind and Pass the Delete Handler (10 min)

> **Concept:** A child can request an action by calling a function passed down as a prop.

In the constructor of `App`, bind the delete handler:

```jsx
this.handleDelete = this.handleDelete.bind(this);
```

Then pass it to `TweetCard`:

```jsx
{this.state.tweets.map(tweet => (
  <TweetCard
    ...
    onDelete={this.handleDelete}
    id={tweet.id}
  />
))}
```

In `TweetCard`, import the Bootstrap `Button` using the named-import style (the same style the Week 10 lecture uses for `Navbar` and `Nav`) and update the delete button so it calls the parent handler:

```jsx
import { Button } from "react-bootstrap";

// inside render():
<span>
  <Button
    onClick={() => this.props.onDelete(this.props.id)}
    variant="link"
    className="float-right"
  >
    x
  </Button>
</span>
```

Test that deleting a tweet updates the UI.

---

## Exercise 8 — Post a New Tweet (15 min)

> **Concept:** Adding new data to the state causes React to re-render the interface automatically.

In the `NewTweet` component, add a handler such as:

```jsx
handleTweetDescChange = (e) => {
  e.preventDefault();
  // Raise event here
}
```

Answer in your notes:

- What is the purpose of `e.preventDefault()`?

Complete the function so that `NewTweet` raises an `onNewTweet` event, passing the new tweet content back to the parent.

Also bind the function in the constructor if needed.

---

## Exercise 9 — Connect the New Tweet Flow in `App` (15 min)

> **Concept:** The parent adds the new item to the array and React re-renders from the updated data.

Add a function in `App`:

```jsx
handleNewTweet(newTweet) {
  this.setState({
    tweets: [
      ...this.state.tweets,
      {
        id: this.state.tweets.length + 1,
        name: "John Smith",
        username: "@john",
        date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
        tweetDesc: newTweet
      }
    ]
  });
}
```

Then pass it to the child:

```jsx
<NewTweet onNewTweet={this.handleNewTweet} />
```

Do not forget to bind `handleNewTweet()` in the constructor.

In your notes, explain:

- what the `...` spread syntax is doing
- what the whole function does

---

## Exercise 10 — Update the Tweet Count in `ProfileStats` (10 min)

> **Concept:** Derived UI values should be based on the current data source.

Update the `ProfileStats` component so that the tweet count reflects:

```jsx
this.state.tweets.length
```

Pass the count from the parent as a prop, then render it inside `ProfileStats`.

Check that:

- deleting a tweet changes the count
- adding a tweet changes the count

---

## Exercise 11 — Explore React Router and Hooks (Optional Extension) (10 min)

> **Concept:** Week 10 also introduces routing and hooks as the next stage of the React journey.

If time permits:

1. Install React Router:

```bash
[user@pc]$ npm install react-router-dom
```

2. Review how `BrowserRouter`, `Routes`, and `Route` are used.
3. Review the `useState` and `useEffect` hooks from the lecture.

You do not need to fully convert your app this week unless instructed.

---

## Exercise 12 — Integration Check (5 min)

Run the app and verify:

- tweets render from state
- deleting a tweet removes it from the interface
- posting a new tweet adds it to the interface
- the tweet count updates correctly
- parent-child communication is working correctly

```bash
[user@pc]$ npm start
```

---

## Quick Reference

| React idea | Purpose |
|------------|---------|
| `map()` | Render repeated UI from array data |
| `filter()` | Create a new array excluding selected items |
| `props` | Pass data and handlers from parent to child |
| `setState()` | Update component state and trigger re-render |
| `e.preventDefault()` | Prevent default browser form submission behaviour |
| spread syntax (`...`) | Copy existing array items into a new array |

| Command | Purpose |
|---------|---------|
| `npm start` | Run React development server |
| `npm install react-router-dom` | Add React Router |
| `npm i axios` | Add Axios for HTTP requests |
| `npm install cors` | Add CORS support to an Express backend |
