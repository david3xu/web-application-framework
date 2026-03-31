# Web Application Frameworks (COMP3011/COMP 6006)

## Week 6 Lab Exercises: Node.js and Express.js

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Before You Begin

These are the lab exercises for the Week 6 Express and Node.js lecture, complete with solutions. Work through each exercise in order.

When you see something in carets (e.g. `<projectname>`), replace it with a value of your choosing.

---

## Exercise 1 — Where are we at? (5 min)

> **Concept:** So far, Django handled everything — the database, the logic, AND the HTML page sent to the browser. Every click caused a full page reload from the server. The new approach splits this into two separate parts: a **backend** (Express) that only deals with data, and a **frontend** (React, coming later) that only deals with what you see. Both sides use JavaScript — that’s why we’re switching to Node.js.

Let’s have a quick discussion of where we are at in the semester right now.

- **What topics have we covered so far?**
  > HTML, CSS, Bootstrap, and Django basics.
  >
- **What did each of these things do?**
  > Django handled the back-end Server-Side Rendering (SSR) and routing. HTML defined the structure, while Bootstrap and CSS dealt with the front-end styling and responsive layouts.
  >
- **What are some of the pitfalls of what we have done so far?**
  > Every time a user interacts with the app or submits data, an entirely new page needs to be requested and reloaded from the server, which can be inefficient.
  >
- **What are some of the benefits of what we have done so far?**
  > Straightforward to build conceptually, highly secure by default, and much easier for SEO since pages are fully rendered before hitting the browser.
  >

---

## Exercise 2 — CRUD Operations (10 min)

> **Concept:** Every app that stores data needs to do 4 things: **Create**, **Read**, **Update**, and **Delete** — this is called CRUD. REST is a set of rules for how two computers talk to each other over the web. REST maps those 4 CRUD actions onto the 4 HTTP verbs you already know: POST (Create), GET (Read), PUT (Update), DELETE (Delete). Same idea, different names.

Answer the following questions in a text document:

- **What are CRUD operations?**
  > **C**reate, **R**ead, **U**pdate, and **D**elete. They represent the four fundamental actions necessary for persistent data storage.
  >
- **Why are CRUD operations important?**
  > They form the foundation of almost all data-driven applications, providing a standardized way to interact with records and manage information.
  >
- **What are RESTful services?**
  > RESTful services are a way for two computers to talk to each other over the web using simple rules.
  >
  > Think of it like ordering food at a restaurant. You (the client) send a request to the kitchen (the server) — "give me the burger" or "add a new order". The kitchen handles it and sends back a response. That's all REST is — a set of agreed rules for how to ask and how to respond.
  >
  > Two key rules:
  >
  > 1. **Stateless** — the server has amnesia. After every request it completely forgets you. So every time you make a request, you must include all the information needed (like your login token), because the server won't remember your previous request.
  > 2. **Uses HTTP verbs** — instead of making up random ways to communicate, REST uses the 4 standard HTTP actions: GET (read), POST (create), PUT (update), DELETE (remove).
  >
  > REST is also the language that connects the frontend and backend together:
  >
  > ```
  > Frontend (React)          REST rules          Backend (Express)
  >       │                                              │
  >       │  "I want data"  ──── GET /api/posts ──────► │
  >       │                                              │
  >       │  ◄──────────────── JSON data ─────────────  │
  >       │                                              │
  >       │  "Add this"  ────── POST /api/posts ──────► │
  >       │                                              │
  >       │  ◄──────────────── 200 OK ─────────────────  │
  > ```
  >
  > Without REST, the frontend and backend would have no agreed way to communicate. REST gives them a common language — if both sides follow the same rules, they can always understand each other.
  >
  > REST is not a tool or a library. It is just a set of rules. Any frontend can talk to any REST backend as long as both follow those rules.
  >
- **What are the CRUD operations in RESTful services?**
  > POST (Create), GET (Read), PUT/PATCH (Update), and DELETE (Delete).
  >
  > Note: CRUD is not everything in REST. CRUD describes **what you want to do with data**. REST describes **how to communicate it** over the web. REST is bigger:
  >
  > | REST includes   | What it covers                                |
  > | --------------- | --------------------------------------------- |
  > | CRUD operations | What action to perform (GET/POST/PUT/DELETE)  |
  > | Stateless rule  | Every request must carry all needed info      |
  > | URL structure   | How to name your endpoints (`/api/posts/1`) |
  > | Status codes    | How to communicate results (200, 404, 400...) |
  > | Response format | Usually JSON, sometimes XML                   |
  >
  > Also — REST is just rules, not tied to any language. Any language that can handle HTTP can build a REST API:
  >
  > | Language   | Common Framework                          |
  > | ---------- | ----------------------------------------- |
  > | JavaScript | Express (Node.js) ← what you're learning |
  > | Python     | Django REST Framework, FastAPI, Flask     |
  > | Java       | Spring Boot                               |
  > | PHP        | Laravel                                   |
  > | Ruby       | Ruby on Rails                             |
  > | Go         | Gin                                       |
  > | C#         | ASP.NET                                   |
  >
  > As long as your server follows the REST rules, any frontend can talk to it — regardless of language.
  >

---

---

## Before Exercise 3 — What Are We Actually Building?

From Exercise 1 and 2 you now know the theory. Here is how it all connects before you start coding:

**The big picture:**

```
Browser                        Your Computer (Server)
┌─────────────────┐            ┌─────────────────────┐
│  React          │  REST      │  Node.js            │
│  (frontend)     │ ─────────► │  + Express          │
│  draws the UI   │ ◄───────── │  handles data       │
│                 │  JSON      │  talks to database  │
└─────────────────┘            └─────────────────────┘
```

**What each piece is:**

| Tool              | What it is                                                                                                                                                                               | Your job                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Node.js** | JavaScript that runs on your computer as a server, not in a browser                                                                                                                      | The engine everything runs on             |
| **Express** | A library that sits on top of Node.js.<br />Gives you ready-made tools (toolkit) for handling routes, requests, and responses. <br />so you don't have to write everything from scratch. | Your actual web server                    |
| **npm**     | Node's package manager — downloads libraries for you                                                                                                                                    | How you install Express and other tools   |
| **REST**    | The rules frontend and backend use to talk to each other                                                                                                                                 | The agreed language between the two sides |

> **Still confused about "computer as a server" vs "web server"?** They sound similar but mean different things:
>
> - **Your computer as a server** = the physical machine running the code
> - **Web server (Express)** = the software on that machine that listens for and handles web requests
>
> **Analogy:**
> Your computer is the **building**. Express is the **receptionist inside** that answers the door when someone knocks.
>
> ```
> Your Computer (the building)
> ┌─────────────────────────────┐
> │   Node.js                   │  ← lets JS run here
> │      └── Express            │  ← the receptionist,
> │           (web server)      │    answers HTTP requests
> └─────────────────────────────┘
>          ▲
>          │ HTTP requests from browser
> ```
>
> |                                | What it is                                                                        |
> | ------------------------------ | --------------------------------------------------------------------------------- |
> | **Computer/server**      | The physical machine that keeps the code running 24/7                             |
> | **Web server (Express)** | Software that listens on a port, receives HTTP requests, and sends back responses |
>
> **One-liner:** Node.js turns your computer INTO a server. Express is the web server software that runs ON that computer.

**From Exercise 3 onwards you will:**

1. Install Node.js and Express
2. Build a simple Express server
3. Create HTML views and serve them
4. Send and receive data between the browser and server using REST (POST/GET)

---

## Exercise 3 — Installing Dependencies (10 min)

> **Concept:** `npm` is Node's package manager — it lets you download and manage libraries (like Express) for your project. `npm init -y` creates a `package.json` file, which is your project's ID card: it tracks the project name, version, and all the libraries it depends on. `npm i express` downloads Express into a `node_modules` folder inside your project.

- Install Node.js on your system.
- Create a new Project by creating a new folder through issuing the following command to the terminal:
  ```bash
  # Create the project directory
  [user@pc]$ mkdir EasyToDo
  ```
- Navigate to this newly created directory:
  ```bash
  # Change location into the new folder
  [user@pc]$ cd EasyToDo
  ```
- Initialize npm and install Express to the Project:
  ```bash
  # Initializes a package.json file to track dependencies and metadata
  [user@pc]$ npm init -y

  # Installs the Express framework into the local node_modules folder
  [user@pc]$ npm i express
  ```

---

## Exercise 4 — Creating a single file Express app (10 min)

> **Concept:** An Express app is built in 4 steps: (1) import Express with `require()`, (2) create your app object with `express()`, (3) define routes — what to do when someone visits a URL, and (4) start listening on a port. A **route** is just a URL + HTTP verb + what to do. `req` is the incoming request (data from the browser), `res` is the response (what you send back).

Inside your `EasyToDo` directory, create a new JavaScript file called `app.js`:

```bash
# touch creates an empty file
[user@pc]$ touch app.js
```

To use express in `app.js`, add the following code to your `app.js` file:

```javascript
// Import the express module. Unlike Django, Node doesn't come with a built-in web server framework, so we pull Express in.
const express = require('express');                                                                   

// Initialize the Express application object. By convention, this is named 'app'.
const app = express();

// Define a GET route handling logic for the root URL path ('/')
app.get('/' , function(req,res){ 
    // req = Request object (incoming data from client)
    // res = Response object (the tools we use to send data back)
  
    // res.send automatically sets the Content-Type to text/html and sends the payload back.
    res.send('HelloWorld!!');
});

// Start the server and bind it to listen for incoming HTTP connections on port 3000
app.listen(3000, function(){
    console.log('Listening on port 3000')
});
```

---

## Exercise 5 — Running a single file Express app (5 min)

> **Concept:** `node app.js` tells Node.js to run your file. A **port** is like a door number on your computer — port 3000 is the door your Express server opens and listens at. `http://localhost:3000` means "my own computer (`localhost`), door number 3000". Any URL you haven't defined a route for will automatically return a `404 Not Found`.

Issue the following command to run the app:

```bash
# Execute the app.js script using the Node environment
[user@pc]$ node app.js
```

This will start a server and listen on port 3000 for connections. Requests for the root URL (`/`) will be responded with `Hello World!!`. For any request to any other routes, the app will respond with a 404 Not Found. You can verify this by navigating to http://localhost:3000/.

---

## Exercise 6 — Reloading your Express app (5 min)

> **Concept:** Unlike a browser where saving a file instantly updates the page, a Node.js server keeps running the old code until you manually stop and restart it. `nodemon` solves this — it watches your files for changes and restarts the server automatically every time you save. The `-g` flag installs it globally so you can use it in any project, not just this one.

Every time you make a change to your app, the server has to be restarted using the above command. This can be inefficient, especially for larger projects.
`nodemon` is a tool that helps development of node.js-based applications by automatically restarting the node application when changes to files are detected.

To install nodemon, run the following command:

```bash
# The -g flag installs this globally on your system, so you can use 'nodemon' in any folder.
[user@pc]$ npm install -g nodemon
```

To start the server using nodemon, simply run the following command:

```bash
# Nodemon acts exactly like 'node', but watches for file changes!
[user@pc]$ nodemon app.js
```

---

## Exercise 7 — Creating a View (10 min)

> **Concept:** Right now your app only sends plain text (`res.send('Hello World!!')`). A **view** is the HTML page the user actually sees. In this exercise you create a static HTML file with a form. The `name` attribute on the `<input>` is important — it becomes the **key** you use to read that field's value on the server side later.

At the moment, your app does not have a view. Let’s create an HTML file in the root directory and call it `index.html`, by issuing the command:

```bash
[user@pc]$ touch index.html
```

Using the boilerplate HTML template from previous practicals, create an empty HTML page.
Within the `<body>` of this page, add the following code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EasyTodo</title>
</head>
<body>
    <h1>EasyTodo</h1>
    <!-- The form structure that will soon send data back to Express -->
    <!-- Note the 'name' attribute: this acts as the "key" to fetch the data on the server side -->
    <input type="text" id="" name="taskName" placeholder="e.g.,finish prac 4">
    <button type="submit">Add task</button>
</body>
</html>
```

---

## Exercise 8 — Serving the View (10 min)

> **Concept:** Instead of sending a text string, you now send an entire HTML file using `res.sendFile()`. `__dirname` is a built-in Node.js variable that always holds the absolute path to the folder your file is in — so `__dirname + '/index.html'` always points to the right file no matter where you run the app from. This is different from `res.render()` (used in Django-style templating) which processes variables inside the template before sending.

Edit the `app.js` file as such:

```javascript
app.get('/' , function(req,res){ 
    // __dirname is a globally available Node variable that contains the absolute path to the current folder.
    // We concatenate it with '/index.html' so Express knows exactly where to pull the file from.
    res.sendFile(__dirname + '/index.html');
});
```

Answer the following questions in a text document:

- **Describe what the `app.get()` function does.**
  > It defines a route handler in Express that actively listens for incoming HTTP GET requests at a specific URL address (like `/`) and executes the attached callback function when a match is found.
  >
- **What is the `res.sendFile()` function?**
  > It is an Express response method that grabs a file from the server via an absolute path and transfers it raw to the client as an HTTP response.
  >
- **What is the difference between `res.render()` function and `res.sendFile()` function?**
  > `res.sendFile()` simply passes a static, pre-existing HTML file exactly as it lives on the disk. `res.render()` acts dynamically—it passes data variables through a templating engine (like EJS, Pug, or Handlebars) to "compile" custom HTML on the fly before sending it out to the client.
  >

---

## Exercise 9 — Making HTTP POST Requests (5 min)

> **Concept:** Your form currently has no `action` or `method` — it doesn't know where to send data or how. Adding `method="POST"` tells the browser to send a POST request (meaning "create something new"). Adding `action="/todos"` tells it which Express route to send it to. Without these two attributes, the form just reloads the page and does nothing useful.

In the previous exercise, you created a form in HTML that allows users to add items to their to-do list. This form, however, does not yet interact with the server.
Interaction between the user interface and the server is necessary if you want to store and retrieve information from a database.
To add items to a list, you need to send a POST request to the server. A POST request can be triggered from a form by wrapping your `<input>` and `<button>` as such:

```html
<!-- 
  action="/todos": Directs the browser to send the data to the /todos endpoint
  method="POST": Specifies that this is a RESTful CREATE operation 
-->
<form action="/todos" method="POST">
    <input type="text" id="" name="taskName" placeholder="e.g.,finish prac 4">
    <button type="submit">Add task</button>
</form>
```

---

## Exercise 10 — POST Requests Server-Side (10 min)

> **Concept:** Just like `app.get()` listens for GET requests, `app.post()` listens for POST requests at a specific route. The route path must match exactly what you put in the form's `action` attribute. Always send a response (`res.send()`) at the end — if you don't, the browser will keep spinning and waiting forever, because the HTTP request cycle was never closed.

The `action` attribute tells the browser where to navigate to in the Express app (`/todos`).
The `method` attribute tells the browser what request to send (`POST`).
This request can be handled on the server using the Express `post` method:

```javascript
// app.post listens specifically for POST method HTTP verbs
app.post('/todos' , function(req,res){ 
    console.log('POST request received');

    // Always ensure a response is sent to close the HTTP cycle, otherwise the browser will just spin and load forever!
    res.send('Task added successfully!'); 
});
```

---

## Exercise 11 — body-parser middleware (5 min)

> **Concept:** **Middleware** is code that runs between receiving a request and sending a response — like a checkpoint on an assembly line. By default, Express can't read the data inside a POST request body (`req.body` is `undefined`). `body-parser` is a middleware that sits in the middle, opens the request, reads the form data, and attaches it to `req.body` so your route handler can use it. Think of it as a letter opener — without it, the envelope arrives sealed.

In a text document, answer the following question:

- **What is middleware in Express?**
  > Middleware is a function that runs **in between** the request arriving and your route handler running.
  >
  > Imagine a security guard at a door — every visitor (request) must pass through the guard first before entering the room (your route). The guard can:
  >
  > - Let them in ✓
  > - Turn them away ✗ (e.g. not logged in → send back 401)
  > - Add information to them (e.g. attach `req.body` so your route can read the form data)
  >
  > ```
  > Request → [body-parser] → [your route handler] → Response
  >              (guard)           (the room)
  > ```
  >
  > `body-parser` is one such guard — it reads the raw form data from the request and attaches it to `req.body` before your route ever sees it. Without it, `req.body` is `undefined` — the envelope arrives but it's still sealed.
  >
  > **Code example — without vs with middleware:**
  >
  > ```js
  > // WITHOUT body-parser
  > app.post('/todos', function(req, res) {
  >     console.log(req.body); // undefined — the form data arrived but was never unpacked, so req.body is empty
  > });
  >
  > // WITH body-parser (middleware runs first)
  > const bodyParser = require('body-parser');
  > app.use(bodyParser.urlencoded({ extended: true })); // ← the guard is now at the door
  >
  > app.post('/todos', function(req, res) {
  >     console.log(req.body); // { taskName: 'finish prac 4' } — now readable!
  > });
  > ```
  >
  > The only difference is `app.use(bodyParser...)` — that one line puts the guard in place and suddenly `req.body` has data in it.
  >
  > **Is middleware only for security?**
  > No — security is just one of many things middleware can do. Middleware is any code that runs between the request and the response:
  >
  > | Use case                 | Example middleware | What it does                                           |
  > | ------------------------ | ------------------ | ------------------------------------------------------ |
  > | **Reading data**   | `body-parser`    | Unpacks form data so `req.body` works                |
  > | **Security**       | `verifyToken`    | Checks if the user is logged in before allowing access |
  > | **Logging**        | `morgan`         | Prints every request to the terminal for debugging     |
  > | **Error handling** | custom middleware  | Catches errors and sends a clean response              |
  > | **File uploads**   | `multer`         | Handles uploaded files in a request                    |
  >
  > Think of it like an airport:
  >
  > ```
  > You (request) → [Check-in] → [Security] → [Boarding] → Plane (route handler)
  > ```
  >
  > Each station is middleware. Security is just one of the stations — not the whole airport.
  >
  > **One-liner:** Security is one thing middleware can do. Middleware is really just any code that intercepts a request before it reaches your route.
  >

In order to read HTTP POST request data, you need to install a middleware module named body-parser. The body-parser middleware extracts the entire body portion of an incoming request stream and exposes it in `req.body`.
To install body-parser, issue the command:

```bash
[user@pc]$ npm install body-parser
```

---

## Exercise 12 — Using body-parser (10 min)

> **Concept:** `app.use()` registers middleware globally — meaning it runs on **every** incoming request before hitting any route handler. You must place it **before** your routes, otherwise the routes run first and `req.body` is still empty. `bodyParser.urlencoded({ extended: true })` handles data sent from HTML forms specifically (form data is encoded differently from raw JSON).

In your `app.js` file, add the following lines before your CRUD handlers:

```javascript
// Require our new middleware module
const bodyParser = require('body-parser'); 

// Apply middleware using app.use(). 
// urlencoded({extended: true}) allows it to parse complex nested JSON form objects.
// Because it's app.use(), this middleware will run globally on EVERY incoming request before it hits our route handlers.
app.use(bodyParser.urlencoded({extended: true}));
```

The `bodyParser.urlencoded` method extracts data from the `<form>` element and adds them to the body property of the request object.
To test that the body-parser middleware works, change your POST handler as such:

```javascript
app.post('/todos' , function(req, res){ 
    // Thanks to body-parser, req.body is no longer undefined!
    // We can tap into the specific HTML input field using req.body.taskName
    console.log(req.body);
  
    res.send('Task received check terminal!');
});
```

---

## Exercise 13 — Testing body-parser (5 min)

> **Concept:** You're now verifying the full request cycle works end-to-end: browser sends form data → body-parser reads it → your route handler logs it. The terminal (where nodemon is running) is your server's output — `console.log()` in Node prints there, not in the browser. If you see `{ taskName: 'your text' }` in the terminal, everything is connected correctly.

Open the webpage in your web browser and ensure the Web Console is open.
Enter a to-do item through the browser and check your terminal to ensure the post handler works correctly. It should log the data you entered in the browser.

> **Testing Workflow:**
>
> 1. Ensure `node app.js` or `nodemon app.js` is running.
> 2. Fill the form in the browser at `http://localhost:3000/`.
> 3. Press "Add task".
> 4. Check your Node term inal output (where nodemon is running). You should see `{ taskName: 'Your entered text' }`.

---

## Concept Reference

This section outlines the core glossary and theory behind the code written in these Lab Exercises.

### 1. Node.js

**Node.js** is an open-source, cross-platform runtime environment built on Google Chrome's V8 JavaScript engine. It allows developers to write server-side network applications using JavaScript (a language traditionally restricted strictly to the browser). It is inherently non-blocking and asynchronous, making it highly scalable for real-time web applications.

### 2. Express.js

**Express.js** is a minimal, fast, and flexible web application framework that sits on top of Node.js. While Node.js provides the raw engine to run JavaScript, Express provides the scaffolding (HTTP routing, middleware integration, and view handling) necessary to build a robust back-end application or API efficiently.

### 3. RESTful Services (REpresentational State Transfer)

**REST** is an architectural paradigm that standardizes how systems communicate over the web. RESTful services are stateless—meaning the server does not store information about the client session between individual requests.

### 4. CRUD Operations & HTTP Methods

**CRUD** stands for **C**reate, **R**ead, **U**pdate, and **D**elete, which are the four foundational operations of persistent storage. REST maps these conceptual operations directly onto standard HTTP methods:

- **POST (Create):** Used to submit new data to the server (e.g., submitting an HTML form).
- **GET (Read):** Used to retrieve data without altering the database's state.
- **PUT / PATCH (Update):** Used to completely replace (PUT) or partially modify (PATCH) an existing resource.
- **DELETE (Delete):** Used to remove a resource.

### 5. Routing

**Routing** refers to how an application determines how to respond to a client request directed at a particular endpoint (e.g., catching a `GET` request at `/todos`).

- **In Django:** Routing is disconnected from the logic; URL strings in `urls.py` connect requests to standalone Python functions placed inside `views.py`.
- **In Express:** Routing wraps the HTTP method, the URL path, and the callback function into one explicit block (e.g., `app.get('/path', callback_function)`).

### 6. Rendering

**Rendering** is the process of generating the final structural visual layer (usually HTML).

- **Server-Side Rendering (SSR):** The back-end server does the heavy lifting. It queries the database, passes data into a template (like EJS or Pug), and returns fully-finished HTML.
- **Client-Side Rendering (CSR):** Express acts purely as a headless API, sending raw JSON data back. A frontend framework (React, Vue) running on the user's computer parses the JSON and dynamically builds the HTML.
  *(In this week's lab, `res.sendFile()` simply transferred a pre-existing static file, which bypasses server-side rendering entirely).*

### 7. Middleware

**Middleware** refers to intermediary functions that sit between the incoming request and your final route handler. In Express, middleware intercepts requests to execute code, change the request/response objects, or end the cycle safely. For example, `body-parser` is a middleware that intercepts incoming POST streams, processes the raw form data, and attaches it cleanly to the `req.body` object before your `/todos` route logic even runs.

### 8. Route Parameters vs. Query Strings

When building APIs, we must extract dynamic variables from the URL:

- **Route Parameters (`req.params`):** Used to capture values at designated positions cleanly formatted directly into the URL path. E.g., `/user/:userId` captures into `req.params.userId`.
- **Query Strings (`req.query`):** Key-value pairs attached loosely to the end of a URL after a question mark `?`. E.g., `/user?name=john` captures into `req.query.name`.

### 9. Input Validation (Joi)

Validating user input before allowing it to touch your database is critical for security and stability. **Joi** is an NPM package that allows you to define strict schemas (blueprints) for JavaScript objects. If the incoming `req.body` payload does not match the rules defined in your Joi schema (e.g., a username must be > 3 characters), the server gracefully rejects the request with a `400 Bad Request` code instead of crashing.

### 10. Development Tooling (Nodemon & Postman)

- **Nodemon:** A CLI utility that monitors changes in your `.js` files and automatically reboots the Node server, saving you from doing it manually.
- **Postman:** A GUI tool that allows developers to construct, send, and test raw HTTP requests (like POST, PUT, DELETE) against an API without needing an HTML front-end interface built yet.
