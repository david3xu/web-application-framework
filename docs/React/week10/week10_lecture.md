# Web Application Frameworks (COMP3011/COMP 6006)
# Lecture 10: Routing and Connecting with React

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Disclaimer

The external links, references, and materials shared in this lecture are provided for educational and informational purposes only. They are not part of the official Curtin University course content. Curtin University and the lecturer do not endorse or take responsibility for the accuracy, relevance, or completeness of the content provided by third-party sources.

---

## Outline

- React Hooks
- Why hooks matter
- Rules of hooks
- Common hooks
- `useState`
- Connecting React with a backend
- CORS
- React Router
- Axios
- Fetching data
- Summary

---

## React Hooks

Hooks are functions introduced in React 16.8.

They allow function components to use features that previously required class components, such as:

- state
- lifecycle-style behaviour
- context access
- reusable logic

Hooks remove the need for class components in many common cases.

---

## Why Hooks?

Benefits of hooks include:

- simpler and more readable code
- easier reuse of logic through custom hooks
- no need to deal with the `this` keyword
- easier testing and debugging

---

## Rules of Hooks

Two important rules:

1. Only call hooks at the top level.
   - Do not call them in loops, conditions, or nested functions.
2. Only call hooks from:
   - React function components, or
   - custom hooks

---

## Commonly Used Hooks

Some frequently used hooks are:

- `useState` — manage local state
- `useEffect` — perform side effects such as API calls
- `useContext` — access shared context
- `useRef` — access DOM nodes or store values across renders
- `useReducer` — manage more complex state logic

---

## `useState` Syntax

```jsx
const [state, setState] = useState(initialValue);
```

Where:

- `state` is the current value
- `setState` updates the value
- `initialValue` is the starting value

The initial value can be a number, string, object, array, or other valid JavaScript value.

---

## Example: `useState`

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
}

export default Counter;
```

---

## Learning Hooks

Hooks modernise React state management.

Recommended starting points:

- `useState`
- `useEffect`
- `useContext`

For new React code, hooks are generally preferred over class components.

Reference:
- https://react.dev/reference/react/hooks

---

## Linking React with Backend

React builds user interfaces in the browser, but it does not automatically manage backend communication.

To connect a React frontend to an Express backend, you often need:

- HTTP requests from the frontend
- backend routes that return data
- CORS support when frontend and backend run on different origins

---

## CORS in Express

To enable Cross-Origin Resource Sharing in an Express app:

```bash
npm install cors
```

Example:

```js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'CORS-enabled for all origins!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## Routing in React

Routing is the process of matching URL paths to UI views.

In React, routing allows the app to show different interfaces depending on the browser URL, without performing a full page reload.

React itself does not include a built-in router.

A common solution is **React Router**.

---

## Installing React Router

```bash
[user@pc]$ npm install react-router-dom
```

Basic imports:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
```

---

## Example Navbar with Links

```jsx
import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

class NavbarComponent extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>COMP6006/COMP3011</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarComponent;
```

---

## Example Routes in `App.jsx`

```jsx
import NavbarComponent from "./components/navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import CounterList from "./components/counterlist";
import Shop from "./components/shop";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <NavbarComponent />
      <Container>
        <div className="content">
          <Routes>
            <Route path="/cart" element={<CounterList />} />
            <Route path="/" element={<Shop />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Container>
    </>
  );
}
```

---

## `BrowserRouter`

`<BrowserRouter>` uses the browser History API to keep the React UI in sync with the URL.

Typical placement in `index.jsx` or `main.jsx`:

```jsx
import { BrowserRouter } from 'react-router-dom';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

---

## HTTP Requests in React

React does not automatically perform HTTP requests.

A common library for this is **Axios**, a promise-based HTTP client for the browser and Node.js.

Install it with:

```bash
[user@pc]$ npm i axios
```

Import it with:

```jsx
import axios from 'axios';
```

---

## JavaScript Promises

A promise represents the eventual completion or failure of an asynchronous operation.

A promise can be:

- pending
- fulfilled
- rejected

In practical terms, promises allow background work such as network requests to complete later without blocking the rest of the app.

---

## Example: GET Request with Axios

```jsx
class Shop extends Component {
  state = {
    products: []
  };

  async componentDidMount() {
    const { data: products } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    this.setState({ products });
  }
}
```

---

## `componentDidMount`

In class components, `componentDidMount()` runs immediately after the component is inserted into the UI tree.

It is a good place to:

- load remote data
- start network requests
- update state from asynchronous results

---

## Rendering Fetched Data

Once data has been fetched into state, it can be rendered with `map()`.

Example use cases include:

- product tables
- posts
- tweets
- lists of records from an API

---

## `useEffect` for Functional Components

If you are using functional components, `componentDidMount()` is not available.

Instead, use `useEffect()`.

Pattern:

```jsx
useEffect(() => {
  // Runs after render

  return () => {
    // Optional cleanup before unmount
  };
}, [dependencies]);
```

---

## Example: POST Request with Axios

```jsx
handleNewProduct = async function handleNewProduct() {
  const newProduct = { title: 'New Product', body: 'product description' };
  const { data: product } = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    newProduct
  );
}
```

Other request methods include:

```jsx
axios.delete(url[, config]);
axios.put(url[, data[, config]]);
axios.patch(url[, data[, config]]);
```

---

## Debugging React Applications

The **React Developer Tools** browser extension helps inspect:

- component hierarchy
- props
- state
- render behaviour

It is useful for understanding how the React component tree changes as the app runs.

More information:
- https://react.dev/learn/react-developer-tools

---

## YOUR TURN: Overview for Finishing the JustTweet Interface

In the previous workshop, you created the user interface of the `JustTweet` app using React components.

In this workshop, you will implement the following:

- dynamically render tweets
- delete tweets
- post a new tweet
- dynamically update the tweet count in `ProfileStats`

You are continuing with your existing project.

---

## Summary (Part I)

- `react-router-dom` allows React apps to define routes and navigation links.
- `<BrowserRouter>` synchronises the UI with the browser URL.
- URL-based routing makes one React app behave like it has multiple pages.
- Axios allows a React frontend to communicate with backend services.

---

## Summary (Part II)

- Axios can perform REST operations such as GET, POST, PUT, and DELETE.
- Data returned from a server can be placed into React state and rendered in the UI.
- React Developer Tools helps inspect the full component tree along with props and state.
- This practical will continue over the next weeks, so the focus is on steady progress rather than finishing everything immediately.
