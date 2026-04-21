# Web Application Frameworks (COMP3011/COMP 6006)

## Week 7 Lab Exercises: Advanced Node.js & Express.js

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Revision — What We Have Covered So Far

Before diving into Week 7, here is a quick summary of the ground covered across the unit:

| Week | Topic | What it gave us |
|------|-------|-----------------|
| 1–3 | Django (MTV) | A full server-side web app — models, views, templates, URL routing, ORM, admin panel |
| 4–5 | Bootstrap | Responsive layouts and ready-made UI components to style Django templates |
| 6 | Node.js & Express | A lightweight JavaScript backend — REST API, routes, static file serving, form handling |
| **7** | **Advanced Express** | **Persistent data (MongoDB), server-side templating (Pug), delete via AJAX** |

### Week 6 recap — answer these before starting

The lecture asks the following revision questions. Check your answers before moving on:

- **What is the purpose of using nodemon?**
  > Every time you save a change to `app.js`, Node.js needs to restart to pick it up. Nodemon watches your files and restarts the server automatically, so you don't have to stop and re-run `node app.js` manually after every edit.
  >
  > ```bash
  > # Without nodemon — you must restart manually after every change
  > [user@pc]$ node app.js
  >
  > # With nodemon — restarts automatically on save
  > [user@pc]$ nodemon app.js
  > ```

- **What is the purpose of using Joi?**
  > Joi validates the shape and content of incoming request data (`req.body`) before it touches your application logic. If the data fails validation, Joi rejects the request with a `400 Bad Request` — protecting your app from bad or malicious input.
  >
  > ```js
  > const schema = Joi.object().keys({
  >   taskName: Joi.string().min(3).required()
  > });
  >
  > const result = schema.validate(req.body);
  > if (result.error) {
  >   res.status(400).send(result.error.details); // rejected — taskName too short or missing
  >   return;
  > }
  > // safe to use req.body here
  > ```
  >
  > **How does this actually work?**
  >
  > In Python and Java, functions almost always belong to a class. In JavaScript, **a plain object can hold functions directly — no class needed**:
  >
  > ```js
  > // This is just a plain object with functions as values — no class
  > const Joi = {
  >   string: function() { return { min: function() {...}, required: function() {...} } },
  >   object: function() { return { keys: function() {...}, validate: function() {...} } },
  >   number: function() { return { min: function() {...} } }
  > };
  >
  > // So Joi.string() just calls the function stored at the 'string' key
  > ```
  >
  > This is essentially how Joi is built — it exports a plain object with methods on it. The Python equivalent is a **module**, not a class:
  >
  > ```python
  > # Python — math is a module, not a class
  > import math
  > math.sqrt(4)    # calling a function on a module
  > ```
  >
  > ```js
  > // JavaScript equivalent
  > const Joi = require('joi')
  > Joi.string()    // calling a function on an object/module
  > ```
  >
  > In JavaScript there are three ways functions can exist:
  >
  > | Where | Example | Needs `new`? |
  > |-------|---------|-------------|
  > | Standalone | `function greet() {}` | No |
  > | On a plain object | `Joi.string()` | No |
  > | On a class | `new Post()` | Yes |
  >
  > Joi uses the middle one — a plain object acting as a namespace. The chaining `Joi.string().min(3).required()` works because each method returns the same rule object back, letting you keep adding rules to it. `schema` is just the plain object that `Joi.object().keys({...})` hands back — it is not a class instance, just an object with a `.validate()` method on it.

- **What do we need body-parser?**
  > When a user submits an HTML form, the data is sent inside the body of the HTTP POST request. Express cannot read that data by default — `req.body` is `undefined`. body-parser is middleware that reads the body and attaches the parsed data to `req.body` so your route handlers can use it.
  >
  > ```js
  > // Without body-parser
  > app.post('/todos', function(req, res) {
  >   console.log(req.body); // undefined
  > });
  >
  > // With body-parser registered
  > const bodyParser = require('body-parser');
  > app.use(bodyParser.urlencoded({ extended: true }));
  >
  > app.post('/todos', function(req, res) {
  >   console.log(req.body); // { taskName: 'finish prac' }
  > });
  > ```

### JavaScript vs Python vs Java — why JavaScript works differently

The plain object pattern you just saw in Joi is not a quirk of that library — it reflects a core design decision in JavaScript itself. Understanding this will help you read any JavaScript code, not just this unit.

**Why JavaScript uses plain objects instead of forcing classes:**

JavaScript was created in 1995 for the browser, designed in 10 days. The goal was a lightweight scripting language, not enterprise OOP. It chose a **prototype-based** object model instead of a class-based one — meaning objects are just dictionaries that can hold anything: functions, classes, numbers, or other objects. There is no rule that functions must live inside a class.

Python sits in between — it has classes but also allows standalone functions and module-level code. Java enforces that everything belongs to a class.

**The main differences across the three languages:**

| Feature | Java | Python | JavaScript |
|---------|------|--------|------------|
| **Object model** | Class-based — everything must be in a class | Class-based but flexible — standalone functions allowed | Prototype-based — objects are dictionaries, classes are optional |
| **Typing** | Static — types declared, checked at compile time | Dynamic — types checked at runtime | Dynamic + weak — types checked at runtime AND coerced silently |
| **Functions** | Methods only — must belong to a class | First-class — functions are objects, can be passed around | First-class — functions are objects, central to the language |
| **Where it runs** | JVM (compiled to bytecode) | Interpreter | Browser originally, server via Node.js |
| **Concurrency** | Multi-threaded | Single thread + GIL limits true parallelism | Single-threaded event loop — async via callbacks/Promises/await |
| **Module system** | `import` brings class names into scope | `import` gives you the module object | `require()` gives you whatever `module.exports` was set to |

**The one that trips students up most — weak typing:**

Python and Java throw an error if you mix incompatible types. JavaScript tries to "help" by silently converting types, which produces surprising results:

```js
// JavaScript silently coerces types — no error thrown
"5" + 1       // "51"  — number became a string
"5" - 1       // 4     — string became a number
0 == false    // true  — loose equality coerces types
0 === false   // false — strict equality does not (always use === in JavaScript)
```

**Is prototype-based design still relevant today?**

Yes — but JavaScript has been adding class syntax since ES6 (2015) to look more familiar:

```js
// ES6 class syntax — looks like Java/Python
class Post {
  constructor(title) { this.title = title; }
  save() { ... }
}
```

Under the hood this is still prototypes — `class` is syntactic sugar over the same mechanism. TypeScript goes further and adds static typing on top, making JavaScript feel closer to Java. So the language is absorbing features from both worlds, but its prototype roots still show up everywhere — which is why Joi, Express, and Mongoose all use plain objects as their public API.

---

### What does `require()` actually return?

You have used `require()` since Week 6 without thinking about it. It is worth understanding — because a library can export anything it wants: a plain object, a function, or a class. What it exports determines how you use it.

The Python equivalent is `import` — but `import` always gives you a module. In JavaScript, `require()` gives you **whatever the library chose to export**, which varies per library. You can see this by looking at what each library actually puts in `module.exports`:

```js
// Inside mongoose — exports a plain object
module.exports = {
  connect: function() {...},
  Schema: class Schema {...},
  model: function() {...}
}
// So: const mongoose = require('mongoose') → you get that plain object

// Inside express — exports a function
module.exports = function express() {
  return { get: function(){...}, post: function(){...}, listen: function(){...} }
}
// So: const express = require('express') → you get that function
//     const app = express()              → calling it gives you the app object
```

That is why `mongoose` and `express` feel different even though both come from `require()`:

| `require(...)` | What it exports | How you use it |
|----------------|-----------------|----------------|
| `require('express')` | A **function** | Call it: `const app = express()` |
| `require('mongoose')` | A **plain object** | Use directly: `mongoose.connect(...)` |
| `require('body-parser')` | A **plain object** | Use directly: `bodyParser.urlencoded(...)` |
| `require('joi')` | A **plain object** | Use directly: `Joi.string()` |

The pattern to recognise: if `require()` gives you a function, call it to get the thing you actually use. If it gives you a plain object, use it directly.

---

### What the Week 6 EasyToDo app could do

By the end of Week 6 your app:

- Served `index.html` as a static file (`GET /`)
- Received form submissions via `POST /todos` and logged them to the terminal
- Used body-parser to read `req.body`
- Reloaded automatically with nodemon

What it **could not** do: store anything permanently. Every server restart wiped all data. Week 7 fixes that.

---

## Before You Begin

### Where we are

In Week 6 you built a basic Express server that receives form data and serves a static HTML file. The full picture looked like this:

```
Browser
  │
  │  GET /          → serves index.html (static file)
  │  POST /todos    → logs req.body to terminal
  ▼
Express (Node.js)
```

Data arrived at the server but was never stored anywhere. Every server restart wiped everything.

### What changes this week

Week 7 adds three new layers to that picture:

```
Browser
  │
  │  GET /          → fetch all to-dos → render Pug template → HTML
  │  POST /todos    → save new to-do to database → redirect
  │  DELETE /todos/:id → remove to-do from database → redirect
  ▼
Express (Node.js)
  │
  ├── Pug (template engine)
  │     Merges data + HTML structure → sends finished page to browser
  │
  └── Mongoose (ODM)
        │
        └── MongoDB Atlas (cloud database)
              Stores to-dos permanently — survives server restarts
```

### What you already know

Nothing here is completely new — each piece maps directly to something from earlier in the unit:

| What you know | What replaces it this week | Why |
|---------------|---------------------------|-----|
| SQLite (local file) | MongoDB Atlas (cloud) | Data stored on the internet, survives restarts, accessible from anywhere |
| Django ORM (`models.py`) | Mongoose (`app.js`) | Defines the shape of data and gives you clean methods to query it |
| Django templates (`{{ }}`, `{% for %}`) | Pug templates (`= val`, `each val in list`) | Merges live data into HTML before sending to the browser |
| `python manage.py migrate` | *(nothing)* | MongoDB is schema-less — Mongoose enforces structure in code, not the database |

### What you will build — exercise by exercise

| Exercise | What you do | New piece in the architecture |
|----------|-------------|-------------------------------|
| 1 | Create a cloud MongoDB database | MongoDB Atlas |
| 2 | Connect Express to it via Mongoose | Mongoose ↔ Atlas link |
| 3 | Define what a to-do document looks like | Schema + Model |
| 4 | Save form submissions to the database | `POST /todos` → Atlas |
| 5 | Display stored to-dos using Pug templates | Pug template engine |
| 6 | Serve CSS and JS files | `express.static` middleware |
| 7 | Delete to-dos using jQuery AJAX | `DELETE /todos/:id` |
| 8 | Add login with Passport.js (extension) | Authentication layer |

Work through each exercise in order — each one builds directly on the last.

---

## Exercise 1 — Create a Cloud MongoDB Database (15 min)

> **Concept:** Your Express app currently has nowhere to store data. In Django, SQLite handled this — a local file on your computer. This week you use **MongoDB Atlas**, a cloud database. The key difference: Atlas lives on the internet, not your machine. That means your data persists when the server restarts, and can be accessed from any computer. Your Express app connects to it using a **connection string** — a URL that carries your credentials and the cluster address.
>
> In the architecture diagram above, this exercise sets up the rightmost box: MongoDB Atlas.

### Step 1 — Sign up

Navigate to https://www.mongodb.com/ and click **"Try Free"**.

- Leave "Company Name" blank.
- Submit the form and verify your email.
- Once logged in, open the **MongoDB Atlas** product (top-left).

### Step 2 — Create a free cluster

Select the free tier and configure:

- **Provider:** AWS
- **Region:** Sydney (ap-southeast-2)

Click **Create**.

### Step 3 — Set up security

When prompted:

- Note down your **Username** and **Password** — you will need these in Exercise 2.
- Click **Create**.

### Step 4 — Configure network access

Navigate to **Security QuickStart → Network Access** on the left sidebar.

- Add your current IP address, or use `0.0.0.0/0` to allow all connections during development.

### Step 5 — Get your connection string

1. Click **Connect** on the Database screen.
2. Select **Drivers**.
3. Copy everything **before the question mark** in the Connection String:

```
mongodb+srv://<username>:<password>@<clusterURL>/<database>
```

Keep this — you will paste it into your code in Exercise 2.

> **If you get lost:** Log into https://cloud.mongodb.com/, click **Database** on the left sidebar, and click **Create**. You may need to **Terminate** your existing cluster first via the three-dots menu. Check **Network Access** and **Database Access** to ensure your user has read/write permissions.

---

> **Your database is ready. Next: connect your Express app to it.**

---

## Exercise 2 — Connect to MongoDB with Mongoose (10 min)

> **Concept:** Your database exists in the cloud but your Express app doesn't know about it yet. **Mongoose** is the bridge — it opens a persistent connection from your app to Atlas when the server starts, and stays connected for the lifetime of the process.
>
> Mongoose also gives you a cleaner API than raw MongoDB queries. Instead of writing low-level database commands, you work with JavaScript objects and methods. In the architecture diagram, Mongoose sits between Express and Atlas.
>
> The `.then() / .catch()` pattern here is **asynchronous** — the database connection happens in the background. Your app doesn't freeze waiting for it; it just logs a message when it succeeds or fails.

Install Mongoose:

```bash
[user@pc]$ npm i mongoose
```

In `app.js`, outside any route handlers, add:

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<username>:<password>@<clusterURL>/<database>')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
```

Replace `<username>`, `<password>`, `<clusterURL>`, and `<database>` with your values from Exercise 1.

Run your app:

```bash
[user@pc]$ nodemon app.js
```

You should see **"Connected to MongoDB"** in the terminal. If you see an error, the connection string is wrong — check every character, especially the username, password, and cluster URL.

**How does `.then().catch()` work?**

`mongoose.connect()` does not return a result immediately — connecting to a remote cloud database takes time. Instead of freezing your app while it waits, JavaScript uses a **Promise**: an object you get back straight away that says *"the result isn't ready yet, but I'll call you when it is."*

Think of it like ordering food at a restaurant:

```
You place an order → waiter gives you a receipt (the Promise) immediately
                  → you don't stand frozen at the counter waiting
                  → when food is ready, waiter calls you (your .then() runs)
                  → if something went wrong, waiter tells you (your .catch() runs)
```

In code:

```js
mongoose.connect('mongodb+srv://...')   // returns a Promise (the receipt)
  .then(() => console.log('Connected')) // called when connection succeeds
  .catch(err => console.error(err));    // called when connection fails
```

A Promise is a plain object with `.then()` and `.catch()` as its methods. Each returns the same Promise back — which is why you can chain them. This looks like Joi chaining but the purpose is different:

```
Joi chaining     → builds up a ruleset step by step (each call adds a rule)
Promise chaining → handles what happens next (success path or failure path)
```

In Python, the equivalent is `async/await` — JavaScript has that too, and you will see it used in later exercises with `await Todo.find({})` instead of `.then()`. Both do the same thing: wait for an async operation without freezing the rest of the app.

---

> **Express is now connected to Atlas. But it doesn't know the shape of your data yet — it has no idea what a "to-do" looks like. Next: define it.**

---

## Exercise 3 — Define a Schema and Model (15 min)

> **Concept:** MongoDB stores documents in any shape by default — no fixed columns, no enforced structure. That flexibility is powerful but dangerous for an app: without a blueprint, any data could end up in the database.
>
> **Mongoose Schemas** solve this. A Schema is a blueprint that says "a to-do document must have a `taskName` field of type String." A **Model** is the class compiled from that blueprint — it's what you use in your code to create, find, update, and delete documents.
>
> Think of it like this: the Schema is the **mould**, the Model is the **factory**, and each document you save is a **product** that comes out of the factory.

### Step 1 — Define the Schema

Outside any route handlers in `app.js`, add:

```js
const todoSchema = new mongoose.Schema({
  taskName: String
});
```

> **Django parallel:**
>
> | Django (`models.py`) | Mongoose (`app.js`) |
> |----------------------|---------------------|
> | `class Todo(models.Model):` | `const todoSchema = new mongoose.Schema({...})` |
> | `taskName = models.CharField(max_length=200)` | `taskName: String` |
> | `python manage.py makemigrations && migrate` | *(no migration step — MongoDB handles it automatically)* |

### Step 2 — Compile the Model

```js
const Todo = mongoose.model('Todo', todoSchema);
```

`Todo` is now a class. Every time you want to create a new to-do in the database, you create an instance of `Todo`.

**Why does `mongoose` use both patterns — plain object AND `new`?**

This is the same `mongoose` object from `require('mongoose')`, yet some things use `new` and some don't. The reason becomes clear when you look at what mongoose actually stores on itself:

```js
// Inside mongoose (simplified):
const mongoose = {
  connect: function() {...},       // plain function — stored as a value
  Schema: class Schema {...},      // a CLASS — stored as a value
  model: function(name, schema) {  // plain function that returns a class
    return class Model {...}
  }
}
```

A JavaScript object can store **anything** as a value — a plain function, a class, a number, another object. `mongoose.Schema` just happens to be a class stored on the object, not a plain function. That is why it needs `new`:

```js
mongoose.connect(...)           // calling a plain function — no new
new mongoose.Schema({...})      // calling a CLASS constructor — needs new
mongoose.model('Todo', schema)  // calling a plain function — no new
new Todo({...})                 // Todo IS the class model() returned — needs new
```

| Call | What is stored at that key | Needs `new`? |
|------|---------------------------|--------------|
| `mongoose.connect()` | A plain function | No |
| `mongoose.Schema` | A class | Yes |
| `mongoose.model()` | A plain function that returns a class | No — but use `new` on what it returns |
| `new Todo({...})` | The class returned by `model()` | Yes |

The rule: **`new` is only needed when you are calling a class constructor**. If it is a plain function, just call it normally.

### Understanding schema enforcement

In the lecture, the `createPost` example included a `body` field in the data but not in the schema:

```js
const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  tag: [String],
  date: {type: Date, default: Date.now}
  // 'body' is NOT defined here
});

const post = new Post({
  title: 'First Post',
  body: 'This is the body...',  // ← passed in, but not in schema
  author: 'COMP6006',
  tag: ['demo', 'mongo']
});
```

- **Why wasn't `body` used?**
  > Because `body` is not defined in the Schema, Mongoose silently ignores it. The document is saved to the database without the `body` field — no error is thrown. This is schema enforcement in action: Mongoose strips out any field that wasn't declared, so only clean, expected data reaches the database.

---

> **You've defined the structure. Now use it — write data to the database when the user submits the form.**

---

## Exercise 4 — Save a To-Do to the Database (10 min)

> **Concept:** In Week 6, your `POST /todos` handler only logged `req.body`. Now it creates a real database document.
>
> `.save()` is **asynchronous** — writing to a remote cloud database takes time. Using `async/await` tells your route handler to wait for the save to complete before redirecting the user. Without `await`, the redirect would fire immediately and the data might not be written yet.

Update your `app.post('/todos')` handler:

```js
app.post('/todos', async function(req, res) {
  const todo = new Todo({
    taskName: req.body.taskName
  });
  await todo.save();
  res.redirect('/');
});
```

### What each line does

| Line | What it does |
|------|--------------|
| `new Todo({ taskName: req.body.taskName })` | Creates a document in memory — nothing written to the database yet |
| `await todo.save()` | Sends the document to Atlas — waits until the write is confirmed |
| `res.redirect('/')` | Sends the user back to the homepage once saving is complete |

Make sure `body-parser` is registered before this route (from Week 6):

```js
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
```

**Verify it works:** Add a task in the browser, then open your MongoDB Atlas dashboard → **Database → Browse Collections**. You should see the document appear.

---

> **Data is being saved to the cloud. But the homepage still shows a static HTML file — it has no way to read from the database and display what's there. Next: replace it with a template that can.**

---

## Exercise 5 — Display To-Dos with Pug Templates (15 min)

> **Concept:** `res.sendFile()` sends a file exactly as it is — no data can be injected into it. To display database results, you need a **template engine**: software that takes an HTML-like file with placeholders, merges in your data, and sends the finished page to the browser.
>
> This is the same idea as Django templates — `{% for item in items %}` and `{{ item.name }}` — just with different syntax. In the architecture diagram, the Pug template engine sits between Mongoose (data) and the browser (display).

### Step 1 — Install Pug

```bash
[user@pc]$ npm i pug
```

### Step 2 — Register Pug as the view engine

In `app.js`, before your route handlers:

```js
app.set('view engine', 'pug');
```

- **What does `app.set('view engine', 'pug')` do?**
  > It tells Express which template engine to use when `res.render()` is called. Without this line, Express wouldn't know how to process `.pug` files — it would find the file but not know how to convert it to HTML. After this line, every `res.render('index', data)` call automatically looks for `views/index.pug`, runs it through the Pug engine with your data injected, and sends the resulting HTML to the browser.

### Step 3 — Create the template

Create a `views/` folder in your project root, then create `views/index.pug`:

```pug
html
  head
    title EasyTodo
    link(rel='stylesheet' type='text/css' href='/css/todo.css')
    script(src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js')
    script(src='/js/main.js')
  body
    h1 EasyTodo
    #app
      form(action='/todos' method='POST')
        input(type='text' name='taskName' placeholder='e.g. Finish COMP6006 Prac')
        button(class='addTaskBtn' type='submit') Add task
      br
      ul
        each val in toDoList
          p
            li= val.taskName
```

> **Pug vs Django templates — the same idea, different syntax:**
>
> | Django template | Pug equivalent | What it does |
> |-----------------|----------------|--------------|
> | `<h1>EasyTodo</h1>` | `h1 EasyTodo` | Heading tag — indentation replaces closing tags |
> | `<div id="app">` | `#app` | Shorthand for a `<div>` with an id |
> | `{% for item in items %}` | `each val in toDoList` | Loop over a list passed from the route |
> | `{{ item.taskName }}` | `li= val.taskName` | Output a variable's value |
> | `<a href="/path">` | `a(href='/path')` | Attributes go inside parentheses |

### Step 4 — Update your GET handler

Replace `res.sendFile(...)` with:

```js
app.get('/', async function(req, res) {
  const todos = await Todo.find({});
  console.log(todos);
  res.render('index', { toDoList: todos });
});
```

| Part | What it does |
|------|--------------|
| `Todo.find({})` | Retrieves all documents from the `todos` collection in Atlas |
| `console.log(todos)` | Prints the results to your terminal so you can verify the query worked |
| `{ toDoList: todos }` | Passes the array into the template — `toDoList` becomes the variable name inside Pug |
| `res.render('index', ...)` | Processes `views/index.pug` with the data and sends the finished HTML |

Open http://localhost:3000/ — your stored to-dos should appear below the form.

---

> **To-dos are displaying. But the template references `/css/todo.css` and `/js/main.js` — files Express doesn't know where to find yet. Next: tell Express where static files live.**

---

## Exercise 6 — Serve Static Files (5 min)

> **Concept:** Express does not automatically serve files from your project folder — every file must be explicitly handled. `express.static('public')` is built-in middleware that tells Express: "for any URL that matches a file inside the `public/` directory, send that file directly without going through a route handler." This is the equivalent of Django's `STATICFILES_DIRS` and `{% load static %}`.

Create the `public/` directory with subfolders:

```bash
[user@pc]$ mkdir -p public/css public/js
```

Register the middleware in `app.js`, before your routes:

```js
app.use(express.static('public'));
```

Any file you place inside `public/` is now accessible by URL:

| File on disk | URL in browser |
|--------------|----------------|
| `public/css/todo.css` | `/css/todo.css` |
| `public/js/main.js` | `/js/main.js` |

---

> **The app is fully working — users can add and view to-dos. The last core feature: let them remove completed items.**

---

## Exercise 7 — Delete a To-Do Item (10 min)

> **Concept:** HTML forms only support GET and POST — there is no `method="DELETE"` in HTML. To send a DELETE request from the browser, you need JavaScript to do it for you. jQuery's `$.ajax()` can send any HTTP method to any URL and handle the response.
>
> On the server side, `app.delete()` catches the request exactly like `app.get()` and `app.post()` catch theirs. The to-do's MongoDB `_id` travels from the template → HTML attribute → jQuery → URL → Express route parameter, so the server knows which document to remove.

### Step 1 — Add a delete button to the template

In `views/index.pug`, on the line after `li= val.taskName`, add:

```pug
a(class='button delete-todo' data-todoid=val._id href='/todos/'+val._id) delete task
```

This embeds each to-do's `_id` into a `data-todoid` attribute on the link.

### Step 2 — Add the client-side handler

Create `public/js/main.js`:

```js
$(document).ready(function() {
  $('.button.delete-todo').on('click', function(e) {
    e.preventDefault();
    $target = $(e.target);
    const id = $target.attr('data-todoid');
    $.ajax({
      type: 'DELETE',
      url: '/todos/' + id,
      success: function(response) {
        // If delete was successful.
        console.log(response);
        window.location.href = '/';
      },
      error: function(err) {
        // If delete failed.
        console.error(err);
      }
    });
  });
});
```

- **In a text document, describe what this code does.**
  > When the page finishes loading, jQuery attaches a click listener to every element with the class `button delete-todo`. When one is clicked, `e.preventDefault()` stops the browser from following the link normally. jQuery then reads the `data-todoid` attribute to get the document's MongoDB `_id`, and uses `$.ajax()` to send a DELETE request to `/todos/<id>` — an HTTP method a plain HTML form cannot send. If the server responds successfully, the browser is redirected to the homepage so the updated list is shown. If the request fails, the error is logged to the browser console.

### Step 3 — Add the server-side delete handler

In `app.js`:

```js
app.delete('/todos/:id', async function(req, res) {
  await Todo.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) });
  res.redirect('/');
});
```

### Full delete flow

```
User clicks "delete task"
  │
  ▼
jQuery reads data-todoid from the button
  │
  ▼
$.ajax sends DELETE request to /todos/<id>
  │
  ▼
Express app.delete('/todos/:id') receives it
  id arrives as a string in req.params.id
  │
  ▼
mongoose.Types.ObjectId() converts string → MongoDB ObjectId
  │
  ▼
Todo.deleteOne({ _id: ... }) removes the document from Atlas
  │
  ▼
res.redirect('/') → browser reloads homepage without the deleted item
```

> **Why `mongoose.Types.ObjectId()`?** MongoDB `_id` values are a special type called `ObjectId` — not a plain string. When the id arrives from the URL it is a string. Passing a plain string to `.deleteOne()` will silently find nothing and delete nothing. Converting it first ensures the query matches correctly.

**Test:** Add a task, click "delete task" — it should disappear from the page and from your Atlas dashboard.

---

## Exercise 8 — Add Authentication & Authorization (Extension)

> **Concept:** Right now anyone who reaches your app can add and delete to-dos. **Authentication** locks the door — users must prove who they are (e.g., username + password) before entering. **Authorization** controls what they can do once inside — a regular user might only manage their own to-dos, while an admin can manage everyone's.
>
> **Passport.js** is the standard authentication middleware for Express. It uses interchangeable **strategies** — `passport-local` for username/password, `passport-google` for Google login, and over 500 others — so you can swap providers without rewriting your app logic.

### Step 1 — Install dependencies

```bash
[user@pc]$ npm install passport passport-local express-session
```

### Step 2 — Implement Passport local authentication

Refer to the Passport.js documentation at https://www.passportjs.org/docs/ and integrate `passport-local` into your `app.js`.

Implement in this order:

1. Configure `express-session` — Passport needs a session to remember who is logged in between requests
2. Register `passport.initialize()` and `passport.session()` middleware via `app.use()`
3. Define a `LocalStrategy` that checks a username and password
4. Add a `POST /login` route that calls `passport.authenticate('local')`
5. Add a guard to your `/todos` routes so unauthenticated users are redirected to `/login`

### Step 3 — Investigate Authorization

Once authentication is working, describe in a text document how you would implement the following:

- A regular user can only delete their own to-dos
- An admin user can delete any to-do

Consider: what extra field would you need to add to your `todoSchema`? How would you check it in your `app.delete()` handler?

---

## Concept Reference

### 1. The complete request flow (Week 7)

```
Browser sends GET /
  │
  ▼
Express receives request
  │
  ├── Middleware runs first (body-parser, express.static, passport)
  │
  ▼
app.get('/') handler
  │
  ├── Todo.find({}) via Mongoose
  │       │
  │       └── Query sent to MongoDB Atlas (cloud)
  │               Atlas returns array of documents
  │
  ▼
res.render('index', { toDoList: todos })
  │
  ├── Pug reads views/index.pug
  │   Injects toDoList data into template
  │   Produces finished HTML string
  │
  ▼
Browser receives HTML — page displays to-dos
```

### 2. Middleware types (Week 7)

| Type | How registered | When it runs |
|------|---------------|--------------|
| Application-level | `app.use(fn)` | Every request |
| Router-level | `router.use(fn)` | Requests matched to that router |
| Error-handling | `app.use((err, req, res, next) => ...)` | When `next(err)` is called |
| Built-in | `express.static()`, `express.json()` | When registered with `app.use()` |
| Third-party | `morgan`, `body-parser`, `passport` | When registered with `app.use()` |

The key rule: every middleware must either call `next()` to pass control to the next function, or send a response — otherwise the request hangs forever.

### 3. MongoDB vs SQL

| Concept | SQL (SQLite/PostgreSQL) | MongoDB |
|---------|------------------------|---------|
| Where data lives | Local file / server | Cloud (Atlas) or local |
| Table | Table | Collection |
| Row | Row | Document |
| Column | Column | Field |
| Schema | Enforced by the database | Optional — enforced by Mongoose in app code |
| Primary key | Integer (`id`) | `ObjectId` (`_id`, auto-generated) |
| Relations | Foreign keys | Embedded documents or references |

### 4. Mongoose operations cheat sheet

```js
// Create
const todo = new Todo({ taskName: 'Study' });
await todo.save();

// Read all
const todos = await Todo.find({});

// Read with filter
const todos = await Todo.find({ taskName: 'Study' });

// Read one
const todo = await Todo.findOne({ taskName: 'Study' });

// Read by ID
const todo = await Todo.findById(req.params.id);

// Update
const todo = await Todo.findOne({ taskName: 'Study' });
todo.set({ taskName: 'Study harder' });
await todo.save();

// Delete one
await Todo.deleteOne({ _id: mongoose.Types.ObjectId(id) });

// Delete many
await Todo.deleteMany({ taskName: 'Study' });
```

### 5. Pug vs Django templates

| Django | Pug | What it does |
|--------|-----|--------------|
| `<h1>Hello</h1>` | `h1 Hello` | Heading — indentation replaces closing tags |
| `<div id="app">` | `#app` | Div with an id |
| `<a href="/path">Link</a>` | `a(href='/path') Link` | Attributes in parentheses |
| `{% for item in items %}` | `each val in list` | Loop |
| `{{ item.name }}` | `= val.name` or `li= val.name` | Output a variable |
| `{% if condition %}` | `if condition` | Conditional |

### 6. Authentication vs Authorization

| | Authentication | Authorization |
|-|----------------|---------------|
| Question answered | "Who are you?" | "What are you allowed to do?" |
| Happens | First | After authentication |
| Example | Login with username + password | Admin can delete any post; user can only delete their own |
| Passport.js role | Verifies identity via strategies | Not handled by Passport — you implement it in your route guards |

### 7. JWT vs Session-based authentication

| | Session-based (Passport-local) | JWT (stateless) |
|-|-------------------------------|-----------------|
| State stored | Server (session store) | Client (token) |
| Scalability | Harder — all servers need the same session store | Easier — any server can verify a token independently |
| Complexity | Simpler to set up | More moving parts |
| Common use case | Traditional server-rendered web apps | REST APIs, SPAs |
