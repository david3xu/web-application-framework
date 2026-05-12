# Web Application Frameworks (COMP3011/COMP 6006)

## Week 9 Lab Exercises: Composition and Events with React

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Revision — What We Have Covered So Far

Before diving into Week 9, here is a quick summary of the ground covered across the unit:

| Week | Topic | What it gave us |
|------|-------|-----------------|
| 1–3 | Django (MTV) | Full server-side rendering with models, views, templates, URL routing |
| 4–5 | Bootstrap | Responsive layout and reusable interface components |
| 6 | Node.js + Express fundamentals | Routing, middleware, HTTP methods, form handling |
| 7 | Advanced Express | MongoDB Atlas, Mongoose models, Pug templates, CRUD delete flow |
| 8 | Socket.io + React | SPA thinking, basic components, state, list rendering, events |
| **9** | **Composition and Events with React** | **Props, `children`, parent-child event flow, reusable component structure** |

### Week 8 recap — answer these before starting

- **What is a React component?**
  > A reusable unit of UI that returns React elements describing what should appear on screen.

- **What is state in React?**
  > State is mutable local data owned by a component. When state changes, React re-renders the component.

- **Why do we use `map()` when rendering lists?**
  > `map()` converts array data into repeated JSX elements, allowing the UI to be generated dynamically from data.

- **Why does each rendered item need a `key` prop?**
  > `key` helps React identify items uniquely when updating lists efficiently.

---

## Where You Should Be Starting — Week 8 Final State

This week continues the `JustTweet` React project from Week 8.

Before starting, confirm you have:

- a working React project named `justtweet`
- a `components/` folder inside `src/`
- baseline components created
- `App.js` rendering those components
- at least one component using state and list rendering

A simplified Week 8 structure should resemble:

```text
justtweet/
├── package.json
├── public/
└── src/
    ├── components/
    │   ├── navbar.js
    │   ├── newtweet.js
    │   ├── profilecover.js
    │   ├── profileinfo.js
    │   ├── profilestats.js
    │   ├── rightpanel.js
    │   └── tweetcard.js
    ├── App.js
    ├── index.js
    └── index.css
```

If that works, you are ready for Week 9.

---

## Before You Begin

This week does **not** start a brand-new project.

Instead, it builds on Week 8 by improving how your React components work together.

At the end of Week 8, you could render components and update simple local state.

In Week 9, you will focus on how React components:

- pass data using `props`
- nest content using `props.children`
- raise events from child to parent
- share responsibilities across a component hierarchy

---

## Exercise 1 — Continue Building `JustTweet` (5 min)

> **Concept:** Week 9 continues the same React interface from Week 8. You are extending an existing UI, not restarting from scratch.

Open your Week 8 `JustTweet` project.

Confirm that your app still runs:

```bash
[user@pc]$ npm start
```

If the app does not run, fix that first before continuing.

---

## Exercise 2 — Review Remaining Components (5 min)

> **Concept:** Building a React app means decomposing a page into smaller responsibilities.

This week, continue work on the remaining components:

- `ProfileInfo`
- `NewTweet`
- `TweetCard`
- `RightPanel`

In your document or notes, answer:

1. What responsibility should each of these components have?
2. Which components should display data?
3. Which components should raise events?

---

## Exercise 3 — Use Composition to Build Larger UI Sections (10 min)

> **Concept:** Composition means building larger UI sections from smaller components.

Choose one of your existing components and make it contain smaller child elements.

Examples:

- `RightPanel` may contain smaller reusable items
- `ProfileInfo` may contain several text/display blocks
- `TweetCard` may contain content areas and action areas

Your goal is to make your app structure more modular and readable.

---

## Exercise 4 — Render Repeated Components with `map()` (10 min)

> **Concept:** Repeated UI is usually generated from arrays rather than handwritten one item at a time.

Create or reuse an array of sample data and use `map()` to render multiple component instances.

For example, a parent component might render several `TweetCard` or counter-style child components from one array.

Answer in your notes:

- Why is `map()` usually better than writing the same component manually several times?
- Why does React need a `key` for each rendered item?

---

## Exercise 5 — Pass Data with `props` (10 min)

> **Concept:** Parents pass configuration and data into child components using props.

Update one parent component so it passes data into a child component.

Example pattern:

```jsx
<TweetCard name="John Smith" username="@john" />
```

Then, inside the child component, render the values from `this.props` or `props`.

Answer in your notes:

- How are props similar to function arguments?
- Why are props useful in reusable components?

---

## Exercise 6 — Use `props.children` (10 min)

> **Concept:** `props.children` allows a component to display nested content supplied by its parent.

Create a component that wraps content placed between its opening and closing tags.

Pattern:

```jsx
<SomeComponent>
  Inner content goes here
</SomeComponent>
```

Inside the component, render:

```jsx
{this.props.children}
```

Test that the nested content appears where expected.

---

## Exercise 7 — Raise an Event from Child to Parent (15 min)

> **Concept:** When the parent owns the state, the child should notify the parent by calling a handler passed down as a prop.

Create a simple interaction where:

1. the parent defines a handler function
2. the parent passes that function to the child as a prop
3. the child calls it from an event such as `onClick`

Example pattern:

```jsx
<button onClick={() => this.props.onDelete(this.props.id)}>Delete item</button>
```

In your notes, explain:

- why the child does not directly modify the parent's state
- why the parent usually handles the actual state update

---

## Exercise 8 — Think About Where State Should Live (10 min)

> **Concept:** State is often stored higher in the component tree so multiple child components can stay in sync.

Look at one piece of data in your app and decide where it should live:

- in the child component
- in the parent component
- higher up in `App`

Write a short explanation in your notes for your choice.

---

## Exercise 9 — Convert a Small Component into a Stateless Functional Component (10 min)

> **Concept:** If a component only receives props and renders UI, it may not need to be a class component.

Pick one simple display-only component and rewrite it as a function component.

Pattern:

```jsx
const RightPanel = (props) => {
  return <div>{props.children}</div>;
};
```

Check that it still renders correctly.

---

## Exercise 10 — Organise Static Assets (5 min)

> **Concept:** Static files such as images can be stored either in `public/` or imported from within the component structure.

If your app uses an image, icon, or other fixed asset, decide where it should live:

- `public/`
- or imported next to the component

Briefly justify your choice.

---

## Exercise 11 — Integration Check (5 min)

Run your app and verify that:

- your `JustTweet` project still loads
- child components render inside parent components correctly
- props are being displayed correctly
- `props.children` works where used
- child events can trigger parent handlers
- any functional component you created still behaves correctly

```bash
[user@pc]$ npm start
```

---

## Quick Reference

| Concept | Meaning |
|---------|---------|
| Component composition | Building larger UI from smaller components |
| `props` | Read-only input passed from parent to child |
| `state` | Local mutable data owned by a component |
| `props.children` | Nested content passed between opening/closing component tags |
| Event handler prop | A function passed from parent to child |
| Functional component | A simple component written as a function |

| Command | Purpose |
|---------|---------|
| `npm start` | Run the React development server |
