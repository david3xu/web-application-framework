# Week 6 — Student Notes: Node.js & Express.js
## COMP3011/COMP6006 — Web Application Frameworks

---

## 1. The Big Picture — Why Are We Changing?

In Weeks 1–5, Django did **everything**: it built the page AND sent it to the browser. Every click loaded a brand new HTML page from the server.

Think of it like a restaurant:
- **Old way (Django):** The chef cooks the food AND plates it AND brings it to the table.
- **New way (Express + React):** The kitchen (Express) just prepares the ingredients and hands them over. A separate waiter (React) assembles and presents the dish at your table.

The new approach **splits the job in two**:
- **Backend (Express + Node.js)** — runs on the server. Talks to the database, sends back raw data (JSON).
- **Frontend (React)** — runs in the user's browser. Draws the UI, handles what you see and click.

### Are Node.js and React both JavaScript?

Yes! JavaScript is **one language with two jobs:**

```
JavaScript
    │
    ├── In the browser  → React (frontend)
    │
    └── On the server   → Node.js + Express (backend)
```

Before Node.js existed, developers needed two languages:
```
Frontend → JavaScript
Backend  → Python, Java, PHP, Ruby...
```

After Node.js, one language does everything:
```
Frontend → JavaScript (React)
Backend  → JavaScript (Node.js + Express)
```

That's one of the biggest reasons Node.js became popular — learn JavaScript once, use it everywhere.

### Why do we need React? Can't Node.js do the frontend too?

Even though both use JavaScript, they run in completely different places:

| | Node.js | React |
|---|---|---|
| **Where it runs** | Your server | User's browser |
| **Job** | Handle requests, talk to database | Draw the UI, handle clicks |
| **What it produces** | JSON data | HTML on screen |

Node.js has no concept of a screen, buttons, or a page — it only knows how to handle data. React lives inside the browser where those things exist. They each do one job, and do it well.

```
Browser                        Server
┌─────────────────┐            ┌─────────────────┐
│  React          │  HTTP req  │  Node.js        │
│  (draws the UI) │ ─────────► │  + Express      │
│                 │ ◄───────── │  (handles data) │
│                 │  JSON      │                 │
└─────────────────┘            └─────────────────┘
   Frontend                       Backend
```

### How does Frontend talk to Backend?

They talk using the same HTTP requests you already know — GET, POST, PUT, DELETE.

```
Your Browser (React)          Express Server
      │                             │
      │  GET /api/posts  ────────►  │
      │                             │  checks database
      │  ◄─────────  JSON data      │
      │                             │
      │  POST /api/posts ────────►  │
      │                             │  saves to database
      │  ◄─────────  200 OK         │
```

**Step by step:**
1. You open the React app in your browser
2. React sends a `GET` request to the Express server
3. Express fetches data from the database, sends back JSON
4. React receives the JSON and draws it on screen

| | Old way (Django) | New way (React + Express) |
|---|---|---|
| Who sends the request | You clicking a link | React code, automatically |
| Who handles the response | Browser loads a whole new page | React updates only what changed |

> **Key point:** The page never fully reloads. React quietly asks Express for data in the background and updates only what changed. That's why it feels faster.

---

## 2. Node.js — JavaScript Outside the Browser

**Node.js is a bridge:**

```
JavaScript code
        ↓
┌─────────────────────────────────────────┐
│  Node.js                                │
│  ├── V8 Engine  (runs the JS code)      │
│  └── System Powers (files, network..)  │
└─────────────────────────────────────────┘
        ↓
Your Computer / Server
```

- **JavaScript** only speaks "JS language" — it can't talk to your computer directly.
- **Your computer** only speaks "machine code" — it has no idea what JS is.
- **Node.js sits in the middle** and translates between them, PLUS hands JavaScript extra powers it never had in the browser.

**Before Node.js:** JavaScript could only live inside a browser — no way out.
**After Node.js:** JavaScript can run on a server, read files, handle databases — just like Python or Java can.

### Why can't JavaScript talk to your computer directly?

JavaScript was **designed on purpose to be locked inside the browser** — for security reasons.

When you visit a random website, that site's JavaScript runs on YOUR machine inside Chrome. If JS could freely talk to your computer, any website you visit could delete your files, read your passwords, or install viruses. So browsers deliberately **jail** JavaScript.

| What browsers block | Why |
|---|---|
| Reading/writing your files | Any site could steal your documents |
| Opening network ports | Sites could run servers on your machine |
| Accessing hardware freely | Camera/mic only with your explicit permission |

**Node.js removes the jail** — but safely, because now YOU are the one running the code on your own machine. You trust your own code. You don't trust random websites.

> **One-liner:** Browsers block JS from touching your computer to protect you. Node.js removes those blocks because you're running your own trusted code, not a random website.

### How does Node.js actually work?

Node.js is built from two parts:

**1. V8 Engine** — Google open-sourced Chrome's JS engine. Node.js took it and embedded it into a standalone program you install on your computer. Same engine, no browser needed.

**2. Extra System Powers** — V8 alone can only run JS logic. Node.js adds C++ modules that give JavaScript powers browsers intentionally block:

| Module | What it lets JS do |
|---|---|
| `fs` | Read/write files on your computer |
| `http` | Open a port and listen for web requests |
| `os` | Check CPU, memory, etc. |

### Why is it fast? (Non-blocking explained)

Imagine a café:
- **Blocking (slow):** Barista takes your order, stares at the machine until done, THEN serves the next person.
- **Non-blocking (Node.js):** Barista takes your order, starts the machine, immediately serves the next person while yours brews.

Node.js works the same way — it doesn't wait for one request to finish before handling the next.

**Real-world uses:** Slack, Google Docs, chat apps — anything that needs to handle many users at once.

---

## 3. REST & RESTful APIs

### What REST actually is
REST is just a **set of rules** for how two computers talk to each other over the web. If a system follows those rules, it's called "RESTful".

### The 2 main rules:

**Rule 1 — Stateless (server has amnesia)**
The server forgets you the moment a request ends. No memory of your previous clicks. This is why every request must carry a token/badge proving who you are.

**Rule 2 — Use HTTP verbs to describe what you want**

| Verb | Meaning | Real example |
|---|---|---|
| `GET` | Read / fetch data | "Give me all blog posts" |
| `POST` | Create something new | "Add this new blog post" |
| `PUT` | Update something existing | "Edit post #5" |
| `DELETE` | Remove something | "Delete post #5" |

### CRUD = The 4 basic operations everything needs

| CRUD | HTTP verb | What it does |
|---|---|---|
| **C**reate | POST | Add new data |
| **R**ead | GET | Fetch existing data |
| **U**pdate | PUT | Change existing data |
| **D**elete | DELETE | Remove data |

> CRUD and REST verbs are the same idea — just different names for the same thing.

### Practice
Answer these in your own words (great exam prep):
1. What are CRUD operations?
2. Why are CRUD operations important?
3. What are RESTful services?
4. What are the CRUD operations in RESTful services?

---

## 4. Express.js — The Framework

### Why do we need Express if we already have Node.js?

Node.js alone **can** build a web server — but it's painful and messy:

```js
// Pure Node.js — no Express
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/posts' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(posts));
    } else if (req.url === '/posts' && req.method === 'POST') {
        // manually piece together request body chunk by chunk...
    }
    // gets messy very fast
});
server.listen(3000);
```

Express wraps Node.js and makes the exact same thing clean:

```js
// With Express — same result, much cleaner
app.get('/posts', (req, res) => res.json(posts));
app.post('/posts', (req, res) => { ... });
```

**Analogy:**
> Node.js is like building a house with raw bricks and cement.
> Express is like using pre-made wall panels — same result, much faster, much cleaner.

| | Node.js | Express |
|---|---|---|
| What it is | The engine that runs JS on a server | A toolkit built on top of Node.js |
| Can build a server? | Yes, but lots of manual work | Yes, cleanly and quickly |
| Do you need both? | Express needs Node.js to run | Node.js doesn't need Express, but life is harder without it |

> **One-liner:** Node.js is the engine. Express is the toolkit that makes building with that engine easy.

Used by: PayPal, Uber, IBM, Fox Sports.

### Setting up from scratch

```bash
npm init -yes        # Creates package.json (your project's ID card)
npm i express        # Installs Express into your project
```

### The simplest possible Express app

```js
const express = require('express');   // Step 1: import Express
const app = express();                // Step 2: create your app

app.get('/', (req, res) => {          // Step 3: define a route
    res.send('Hello World');
});

app.listen(3000, () => console.log('Running on port 3000'));  // Step 4: start listening
```

**What each part means:**
- `require('express')` — borrow the Express tool from your node_modules folder
- `app = express()` — create YOUR specific app using that tool
- `app.get('/', ...)` — "when someone visits `/`, run this function"
- `app.listen(3000)` — "watch port 3000 for incoming requests"

### Practice
**Set up your first Express app:**

1. Install Node.js from https://nodejs.org/en/ (LTS version)
2. Create a new project folder and navigate into it:
```bash
mkdir EasyToDo
cd EasyToDo
```
3. Initialise the project and install Express:
```bash
npm init -yes
npm i express
```
4. Create `app.js` and add this code:
```js
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Hello World!!');
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
```
5. Run it:
```bash
node app.js
```
6. Visit `http://localhost:3000/` in your browser — you should see `Hello World!!`

> Any other route you haven't defined will return a `404 Not Found`.

---

## 5. Callback Functions

A **callback** is a function you pass *into* another function to run later.

```js
app.get('/posts', (req, res) => {
    // This inner function IS the callback
    // It runs automatically when someone visits /posts
    res.send('Here are your posts');
});
```

**Plain English analogy:** You order a pizza and say "call me when it's ready". The "call me" instruction is the callback — it runs when the event (pizza ready) happens.

---

## 6. Route Parameters

Sometimes a URL contains data you need to extract — like an ID number.

```
URL visited:     /posts/42
Route defined:   /posts/:postID
Result:          req.params.postID = "42"
```

```js
app.get('/posts/:postID', (req, res) => {
    res.send('You asked for post number: ' + req.params.postID);
});
```

You can have **multiple parameters**:
```js
app.get('/posts/:year/:month', (req, res) => {
    res.send(req.params);  // { year: "2024", month: "03" }
});
```

---

## 7. Query Strings

A different way to pass data — using `?` in the URL.

```
URL: /posts?sort=newest&limit=10
```

Accessed via `req.query`:
```js
app.get('/posts', (req, res) => {
    console.log(req.query.sort);   // "newest"
    console.log(req.query.limit);  // "10"
});
```

**Route params vs Query strings:**
- `:postID` in the path → required, identifies a specific resource (`/posts/42`)
- `?sort=newest` in the URL → optional, filters or modifies the result

---

## 8. Serving HTML Files

Instead of `res.send()` for text, use `res.sendFile()` to serve a whole HTML file:

```js
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
```

| Function | What it does |
|---|---|
| `res.send()` | Sends a short text/string response |
| `res.sendFile()` | Sends an entire HTML file |
| `res.render()` | Renders a template with variables (like Django's templates) — needs a template engine set up |

### Practice
1. Create `index.html` in your project folder:
```bash
touch index.html
```
2. Add this inside the `<body>`:
```html
<h1>EasyTodo</h1>
<input type="text" name="taskName" placeholder="e.g., finish prac 4">
<button type="submit">Add task</button>
```
3. Update `app.js` to serve the file:
```js
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
```
4. Answer these questions:
   - What does `app.get()` do?
   - What does `res.sendFile()` do?
   - What is the difference between `res.render()` and `res.sendFile()`?

---

## 9. Making POST Requests from a Form

To trigger a POST from an HTML form, wrap your inputs in a `<form>` tag with `method="POST"`:

```html
<form action="/todos" method="POST">
    <input type="text" name="taskName" placeholder="e.g., finish prac 4">
    <button type="submit">Add task</button>
</form>
```

- `action="/todos"` — tells the browser which Express route to send to
- `method="POST"` — tells the browser to send a POST request

Handle it on the server:
```js
app.post('/todos', function(req, res) {
    console.log('POST request received');
});
```

### Practice
1. Wrap your `<input>` and `<button>` in a `<form>` tag as shown above
2. Add the POST handler to `app.js`
3. Submit the form and check your terminal — you should see `POST request received`

---

## 10. Middleware — Express's Assembly Line

**Middleware** is code that runs *between* receiving a request and sending a response. Think of it as a security checkpoint or a processing station on an assembly line.

```
Request → [middleware 1] → [middleware 2] → Your route handler → Response
```

### body-parser middleware
By default, Express can't read the data inside a POST request body. `body-parser` fixes this:

```bash
npm install body-parser
```

```js
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));  // now req.body works

app.post('/todos', (req, res) => {
    console.log(req.body);  // you can now read what was submitted
});
```

**Plain English:** Without body-parser, Express is like receiving a sealed envelope. body-parser is the letter opener.

### Practice
1. Answer in your own words: what is middleware in Express?
2. Install body-parser:
```bash
npm install body-parser
```
3. Add these lines to `app.js` **before** your route handlers:
```js
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
```
4. Update your POST handler to log the body:
```js
app.post('/todos', function(req, res) {
    console.log(req.body);
});
```
5. Submit the form in your browser and check the terminal — you should see the data you typed printed out.

---

## 11. Handling All 4 HTTP Verbs in Express

```js
// READ all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// READ one post
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Not found');
    res.json(post);
});

// CREATE a post
app.post('/posts', (req, res) => {
    const post = { id: posts.length + 1, name: req.body.name };
    posts.push(post);
    res.json(post);
});

// UPDATE a post
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Not found');
    post.name = req.body.name;
    res.json(post);
});

// DELETE a post
app.delete('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Not found');
    posts.splice(posts.indexOf(post), 1);
    res.json(post);
});
```

---

## 12. HTTP Status Codes (the numbers in responses)

| Code | Meaning | When to use |
|---|---|---|
| `200` | OK | Everything worked |
| `400` | Bad Request | The user sent invalid/missing data |
| `404` | Not Found | The resource they asked for doesn't exist |
| `500` | Server Error | Something broke on your end |

```js
res.status(404).send('Post not found');  // set status AND message
```

---

## 13. Input Validation

Never trust data sent by users. Always check it before using it.

### Manual validation:
```js
app.post('/posts', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send('Name must be at least 3 characters');
    }
    // safe to use req.body.name here
});
```

### With Joi (cleaner, recommended):
```bash
npm i @hapi/joi
```

```js
const Joi = require('@hapi/joi');

app.post('/posts', (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return res.status(400).send(result.error.details);
    }
    // data is valid, proceed
});
```

**Plain English:** Joi is like a form checker. You define the rules once (name must be a string, at least 3 chars, required), and Joi automatically checks every submission against those rules.

---

## 14. Postman — Testing Your API

Your browser can only send `GET` requests by typing a URL. To test `POST`, `PUT`, and `DELETE`, you need a tool like **Postman**.

- Download at: https://www.getpostman.com/
- It lets you send any type of HTTP request to your local server
- You can set headers, body data, and see the full response
- Think of it as a "fake browser" that can send all 4 verbs

---

## 15. nodemon — Auto-restart on Save

Every time you edit `app.js`, you'd normally have to stop and restart the server. `nodemon` watches for file changes and restarts automatically.

```bash
npm install -g nodemon   # install globally (once)
nodemon app.js           # use instead of: node app.js
```

### Practice
1. Install nodemon globally:
```bash
npm install -g nodemon
```
2. Start your app with nodemon instead of node:
```bash
nodemon app.js
```
3. Make a change to `app.js` and save — the server should restart automatically without you doing anything.

---

## 16. Security Basics

Since the server has amnesia (stateless), protected routes need to check an **Authorization header** on every request:

```
Authorization: Bearer your-secret-token-here
```

Your middleware checks this token — if it's missing or wrong, send back a `401 Unauthorized` and don't do anything else.

---

## Quick Reference — Everything on One Page

| Concept | One-liner |
|---|---|
| Node.js | JavaScript that runs on a server, not a browser |
| Express | Makes building a Node.js web server easy |
| REST | Rules for how apps talk to each other over HTTP |
| Stateless | Server forgets you after every request |
| GET | Read data |
| POST | Create data |
| PUT | Update data |
| DELETE | Remove data |
| CRUD | Create, Read, Update, Delete — the 4 things any app needs to do with data |
| Route params | Variables inside a URL path: `/posts/:id` |
| Query strings | Optional filters after `?`: `/posts?sort=newest` |
| Middleware | Code that runs between request and response |
| body-parser | Middleware that lets you read POST form data |
| Joi | Library for validating user input |
| Postman | Tool for testing API endpoints |
| nodemon | Auto-restarts server when you save a file |
| Status codes | 200=OK, 400=Bad input, 404=Not found, 500=Server broke |
