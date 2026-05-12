# Web Application Frameworks (COMP3011/COMP 6006)
# Lecture 9: Composition and Events with React

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Disclaimer

The external links, references, and materials shared in this lecture are provided for educational and informational purposes only. They are not part of the official Curtin University course content. Curtin University and the lecturer do not endorse or take responsibility for the accuracy, relevance, or completeness of the content provided by third-party sources.

---

## Outline

- Recap
- File extensions in React projects
- Composing components
- Props in React
- `props.children`
- Child-parent event handling
- Stateless functional components
- Static files in React
- Summary

---

## Recap: Counter

This lecture continues the React work from Week 8 using a counter-style example to demonstrate how components can be combined and how they communicate.

---

## File Extensions

When using React (especially with Vite), the common file extensions are:

- `.jsx` — contains JSX, no TypeScript
- `.tsx` — contains JSX with TypeScript
- `.js` — plain JavaScript without JSX
- `.ts` — TypeScript without JSX

Choose the extension that matches the syntax and tooling you are using.

---

## Composing Components

React allows complex interfaces to be built from small, isolated pieces of code called **components**.

A component can include other components in its output. This is called **composition**.

Benefits of composition:

- reusability
- readability
- modularity
- clearer separation of responsibilities

---

## Counter Example in `App.jsx`

```jsx
import CounterList from "./components/counterlist/counterlist";

function App() {
  return (
    <CounterList />
  );
}

export default App;
```

Assume each component is stored in its own folder inside `components/`, while `App.jsx` remains directly inside `src/`.

---

## Multiple Instances of a Component

A parent component can render multiple instances of the same child component.

For example, a `CounterList` component may contain several `Counter` components.

Important idea:

- each component instance has its own state
- one `Counter` changing does not automatically change another `Counter`

---

## Mapping Components from Data

Instead of writing repeated component tags manually, a parent can use `map()` to generate them from an array.

This is usually more efficient and less repetitive.

When rendering lists of components, React expects a **key** prop.

Why `key` matters:

- identifies each item uniquely
- helps React track updates efficiently
- supports custom handling of individual items

---

## `props` in React

Components accept inputs called **props** (properties).

Props are similar to:

- constructor parameters in classes
- function arguments
- HTML attributes

A parent component passes props down to a child component.

The child can then use those props when rendering.

---

## Props and Child State

In class components, a child can initialise its own state from incoming props.

Typical pattern:

```jsx
constructor(props) {
  super(props);
  this.state = {
    value: props.value
  };
}
```

This shows the relationship between:

- **props** — external configuration from the parent
- **state** — internal data owned by the component

---

## `props.children`

`children` is a special React prop containing the elements placed between a component's opening and closing tags.

Example idea:

```jsx
<Counter>Counter label</Counter>
```

Inside the child component, the text or nested element can be rendered with:

```jsx
{this.props.children}
```

This allows one component to wrap or display nested content defined by its parent.

---

## Handling Events: Child-Parent Relationships

Sometimes a child component needs to tell its parent that something happened.

Example:

- a `Counter` child needs to request deletion
- the `CounterList` parent owns the array of counters
- therefore the parent must handle the deletion logic

Pattern:

1. the child raises an event
2. the parent handles the event
3. the parent updates its state
4. React re-renders the affected UI

---

## Storing State Higher in the Hierarchy

A common React principle is to store state **high** in the component tree so that one source of truth controls related UI.

However, there is a trade-off:

- higher state can cause more re-rendering
- sometimes some state is kept lower to reduce unnecessary updates

This is a design decision that depends on the application structure.

---

## Delete Example: Child Calls Parent Handler

A child can receive a function prop from the parent, then call it when needed.

Example functional idea:

```jsx
<button onClick={() => props.onDelete(props.id)}>Delete item</button>
```

The parent may define a function such as `handleDelete(counterID)` and pass it down as `onDelete`.

Important note:

- the prop name and the function name do not have to be the same
- but the child must use the exact prop name it receives

---

## Stateless Functional Components

A stateless functional component is a function that:

- receives props
- returns UI
- does not manage its own state

Example:

```jsx
const Counter = (props) => {
  return (
    <div>
      <span>{props.children}</span>
      <span>{props.formatCount()}</span>
      <button onClick={() => props.onIncrement()} className="btn btn-secondary">+</button>
      <button onClick={() => props.onDelete(props.id)} className="btn btn-danger btn-sm m-2">
        Delete item
      </button>
    </div>
  );
};
```

Benefits:

- simple
- tidy
- reusable
- no `this` scope required

---

## Static Files: The `public/` Folder

React apps often include static assets such as:

- images
- icons
- fixed files that do not change during execution

Two common approaches:

1. place files in the `public/` folder
2. place files near the component and import them directly

Using `public/` can be convenient for global static assets. Importing files directly can make component dependencies clearer.

Both approaches are valid.

---

## YOUR TURN (50 min): Continuing Work on JustTweet

Refer to last week's practical to see the layout of the `JustTweet` interface.

This week, continue creating the remaining components:

- `ProfileInfo`
- `NewTweet`
- `TweetCard`
- `RightPanel`

You should now begin creating child elements inside these components as well, since `children` has now been covered.

Keep your files organised and test as you go using:

```bash
npm start
```

Refer back to last week's practical if you need the component boilerplate code.

---

## Summary (Part I)

- We can create multiple instances of components and compose them together.
- Each component instance has its own state.
- Composition creates parent-child relationships.
- Props can flow from parent to child.
- `props.children` provides a special way to pass nested content.

---

## Summary (Part II)

- `props` act like parameters to a component.
- `state` acts like the component's internal fields.
- Events can be raised in the child and handled by the parent.
- Static files can be organised in more than one valid way.
- Stateless functional components are useful for simple, reusable UI widgets.
