# Web Application Frameworks (COMP3011/COMP 6006)
## Lecture 6: Introduction to Node.js and Express.js

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

### Outline
- Context
- Node.js
- REST
- Express.js
- Building
- Route Parameters
- GET/POST
- Testing
- Validation
- PUT/DELETE
- Why?
- Summary

---

### YOUR TURN: Where are we at?
Let’s have a quick discussion of where we are at in semester right now.

- **What topics have we covered so far?**
  > **Answer:** HTML, CSS, Bootstrap, and Django basics (Routing, Models, Views, Templates).
- **What did each of these things do?**
  > **Answer:** Django handled the back-end Server-Side Rendering (SSR) and routing. HTML defined the structure, while Bootstrap and CSS dealt with the front-end styling and responsive layouts.
- **What are some of the pitfalls of what we have done so far?**
  > **Answer:** Every time a user interacts with the app or submits data, an entirely new page needs to be requested and reloaded from the server, which can be inefficient and negatively impact the user experience.
- **What are some of the benefits of what we have done so far?**
  > **Answer:** It is straightforward to build conceptually, highly secure by default (Django's "batteries-included" approach), and much easier for SEO since pages are fully rendered before hitting the browser.

---

### There is another way!
So far, we have looked at one way to build web applications.
Django takes care of the front-end and back-end for us.
We augment our front-end with Bootstrap for reasons previously stated.
Each time the user wishes to interact with the web app, an entire new page is loaded.
The alternative to this is the single page web application (also called a progressive web application); a different architecture.
We create the frontend and backend separately – the backend is an API and the front end runs on the clients’ machine.
We will look at using Node.js over the next few weeks to do this (using React for the frontend and Express for the backend). This is only but one way to do it!

---

### What is Node.js?
Node.js is a runtime environment to execute JavaScript code.
It is built upon Chrome’s V8 JavaScript engine.
It allows for JavaScript code to be executed outside of a browser.
This therefore allows it to be used to build back-end services.
For example, Application Programming Interfaces (API’s).
But, it can also be used to compile front-end interfaces for use within a browser.
Per the Node.js website it “is a non-blocking asynchronous event-driven JavaScript runtime designed to build scalable real-time network applications.”
A single thread can concurrently handle many connections, improving scalability and performance.

---

### Applications of Node.js
Real-time client side web applications.
Google Apps suite, Slack, chat (IM) systems and the like.

---

### RESTful Services
REST stands for REpresentational State Transfer.
An architectural paradigm that provides standards for communication of data between systems on the web, making it easier for systems to communicate with each other.
Systems that follow the REST paradigm are stateless.
The server does not need to know anything about what state the client is in and vice versa.
Within the REST architecture, clients send requests to retrieve or modify resources, and servers send responses to these requests, over HTTP.

---

### RESTful API’s
Four basic HTTP request types are used to interact with resources in REST services:
- **GET** – retrieve a specific resource (by identifier) or a collection of resources;
- **POST** – create a new resource;
- **PUT** – update a specific resource (by identifier);
- **DELETE** – remove a specific resource (by identifier).

---

### YOUR TURN (10min): CRUD Operations
Answer the following questions in a text document:

- **What are CRUD operations?**
  > **Answer:** Create, Read, Update, and Delete. They represent the four fundamental actions necessary for persistent data storage.
- **Why are CRUD operations important?**
  > **Answer:** They form the foundation of almost all data-driven applications, providing a standardized way to interact with records and manage information.
- **What are RESTful services?**
  > **Answer:** RESTful services are systems designed entirely around the REpresentational State Transfer architectural paradigm. They communicate seamlessly over HTTP, are stateless, and map directly onto standardized requests.
- **What are the CRUD operations in RESTful services?**
  > **Answer:** POST (Create), GET (Read), PUT/PATCH (Update), and DELETE (Delete).

---

### Express
Express is a web application framework based upon the core Node.js HTTP module and Connect components.
Used to generate high-performance API’s and web applications by providing what is effectively a HTTP server.
Express is used by PayPal, Uber, IBM, Fox Sports and many others.

### Installing Express (and Node.js)
Go to https://nodejs.org/en/ and download the latest stable version (LTS).
Follow the instructions and run the installer if you are running on your own Windows or Mac machine – this is (relatively) straightforward.
On the lab machines (VDI / VMWare Horizon): it “should” already be installed.

### Initialising Node.js
Once installed, create a project folder and issue the following command:
```bash
[user@pc]$ npm init -yes
```
This creates a `package.json` file to store various metadata relevant to a project.
This file is used to give information to npm that allows it to identify the project as well as handle the project’s dependencies.
Then, install Express to the current project by issuing the command:
```bash
[user@pc]$ npm i express
```

---

### YOUR TURN (10min): Installing Dependancies

> **Solution Steps:**
- Install Node.js on your system;
- Create a new Project by creating a new folder through issuing the following command to the terminal:
  ```bash
  [user@pc]$ mkdir EasyToDo
  ```
- Navigate to this newly created directory:
  ```bash
  [user@pc]$ cd EasyToDo
  ```
- Initialize and Install Express to the Project:
  ```bash
  [user@pc]$ npm init -y
  [user@pc]$ npm i express
  ```

---

### Building a Web Server: Includes
```javascript
const express = require('express');
```
Loads the express module using the `require` function; the `require` function returns a function named express in this instance.
```javascript
const app = express();
```
`express()` returns an object of type express, by convention it is called `app`, which represents our application.

### Building a Web Server: Code
```javascript
app.get('/' , (req,res)=> {
    res.send('HelloWorld' );
});
app.listen(3000,() => console.log('Listening on port 3000'));
```

### Building a Web Server: Code Explanation
`app.get` takes two arguments: the path and a callback function (also known as the route handler).
A JavaScript callback function is a function that is passed as a parameter to another JavaScript function.
The callback function is run inside of the function it was passed into.
Generally used for event driven programming – i.e. once an event occurs, the callback function runs.

### Building a Web Server: Running
To run the application, issue the command:
```bash
[user@pc]$ node index.js
```
Then, visit http://localhost:3000/

---

### YOUR TURN (10min): Creating a single file Express app
Inside your `EasyToDo` directory, create a new JavaScript file called `app.js`:
```bash
[user@pc]$ touch app.js
```
To use express in `app.js`, add the following code to your `app.js` file:
```javascript
const express = require('express');                                                                         
const app = express();

app.get('/' , function(req,res){ 
    res.send('HelloWorld!!' );
});

app.listen(3000, function(){
    console.log('Listening on port 3000')
});
```

---

### YOUR TURN (5min): Running a single file Express app

> **Solution Steps:**
Issue the following command to run the app:
```bash
[user@pc]$ node app.js
```
This will start a server and listen on port 3000 for connections. Requests for the root URL (`/`) will be responded with `Hello World!!`. For any request to any other routes, the app will respond with a 404 Not Found. You can verify this by navigating to http://localhost:3000/.

---

### YOUR TURN (5min): Reloading your Express app
Every time you make a change to your app, the server has to be restarted using the above command. This can be inefficient, especially for larger projects.
`nodemon` is a tool that helps development of node.js-based applications by automatically restarting the node application when changes to files are detected.

> **Solution Steps:**
To install nodemon (globally), run the following command:
```bash
[user@pc]$ npm install -g nodemon
```
To start the server using nodemon, simply run the following command:
```bash
[user@pc]$ nodemon app.js
```

---

### Route Parameters
Route parameters are named URL segments that are used to capture the values specified at their position in the URL.
- **Request URL:** `http://localhost:3000/posts/1`
- **Route path:** `/posts/:postID`

The captured values are populated in the `req.params` object, with the name of the route parameter specified in the path as their respective keys.
`req.params: {"postID": "1"}`

### Route Parameters: Code
```javascript
const express = require('express'); 
const app = express();

app.get('/', (req,res)=> {
    res.send('Hello,World!')
});

app.get('/post/:postID', (req,res)=>{
    res.send(req.params.postID)
});
```

### Route Parameters: Part 2
```javascript
const express = require('express'); 
const app = express();

app.get('/' , (req,res)=>{
    res.send('Hello,World!' )
});

app.get('/post/:year/:month', (req,res) =>{
    res.send(req.params)
});
```

### Route Parameters: Query String Code
```javascript
const express = require('express'); 
const app = express();

app.get('/' , (req,res)=>{
    res.send('Hello,World!' )
});

app.get('/post/:year/:month' , (req,res)=>{
    res.send(req.query)
});
```

---

### YOUR TURN (10min): Creating a View
At the moment, your app does not have a view. Let’s create a HTML file in the root directory and call it `index.html`, by issuing the command:
```bash
[user@pc]$ touch index.html
```
Using the boilerplate HTML template from previous practicals, create an empty HTML page.
Within the `<body>` of this page, add the following code:

> **Solution Steps:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EasyTodo</title>
</head>
<body>
    <h1>EasyTodo</h1>
    <input type="text" id="" name="taskName" placeholder="e.g.,finish prac 4">
    <button type="submit">Add task</button>
</body>
</html>
```

---

### YOUR TURN (10min): Serving the View
Edit the `app.js` file as such:
```javascript
app.get('/' , function(req,res){ 
    res.sendFile(__dirname + '/index.html');
});
```
Answer the following questions in a text document:

- **Describe what the `app.get()` function does.**
  > **Answer:** It defines a route handler in Express that actively listens for incoming HTTP GET requests at a specific URL address (like `/`) and executes the attached callback function when a match is found.
- **What is the `res.sendFile()` function?**
  > **Answer:** It is an Express response method that grabs a file from the server via an absolute path and transfers it raw to the client as an HTTP response.
- **What is the difference between `res.render()` function and `res.sendFile()` function?**
  > **Answer:** `res.sendFile()` simply passes a static, pre-existing HTML file exactly as it lives on the disk. `res.render()` acts dynamically—it passes data variables through a templating engine (like EJS, Pug, or Handlebars) to "compile" custom HTML on the fly before sending it out.

---

### YOUR TURN (5min): Making HTTP POST Requests
In the previous exercise, you created a form in HTML that allows users to add items to their to-do list. This form, however, does not yet interact with the server.
Interaction between the user interface and the server is necessary if you want to store and retrieve information from a database.
As mentioned earlier, the purpose of the form is to add to-do items to a list.
To add items to a list, you need to send a POST request to the server. A POST request can be triggered from a form by wrapping your `<input>` and `<button>` as such:

> **Solution Steps:**
Update your `index.html` file to properly wrap the inputs:
```html
<form action="/todos" method="POST">
    <input type="text" id="" name="taskName" placeholder="e.g.,finish prac 4">
    <button type="submit">Add task</button>
</form>
```

---

### YOUR TURN (10min): POST Requests Server-Side
The `action` attribute tells the browser where to navigate to in the Express app (`/todos`).
The `method` attribute tells the browser what request to send (`POST`).
This request can be handled on the server using the Express `post` method:

> **Solution Steps:**
Add the following to your `app.js` file:
```javascript
app.post('/todos' , function(req,res){ 
    console.log('POST request received');
    res.send('Task added successfully!'); // Always send a response!
});
```

---

### Testing Endpoints with Postman
Postman is a popular tool (piece of software) used for testing API’s.
Postman can be used to test RESTful API’s.
It provides a user interface to send CRUD requests to a server – such as your local Node.js server!
To download and install Postman, visit https://www.getpostman.com/.

---

### Input Validation: Code
```javascript
app.post('/posts' , (req,res)=>{
    if (!req.body.name || req.body.name.length < 3){
        //In case of a 400 Bad Request. 
        res.status(400).send('Name is required' ) 
        return;
    } else {
        const post = {
            //Usual stuff goes here.
        }
    }
});
```

### Input Validation using Joi
joi allows you to create schemas for JavaScript objects to ensure validation of key information, such as for request parameters.
To install joi to the current project, issue the command:
```bash
[user@pc]$ npm i @hapi/joi
```
To use the joi module in express applications, add the following require statement:
```javascript
const Joi = require('@hapi/joi' );
```

### Input Validation using Joi: Code
```javascript
app.post('/posts', (req,res)=>{ 
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });
    
    const result = schema.validate(req.body); 
    console.log(result);
    
    if(result.error){ 
        res.status(400).send(result.error.details); 
        return;
    }
});
```

### Handling PUT: Code
```javascript
app.put('/posts/:id' , (req,res)=>{
    const post = posts.find(p => p.id === parseInt(req.params.id)); 
    if (!post){
        res.status(404).send('Post was not found' ); 
        return; 
    }
    
    const schema = Joi.object().keys({ 
        name: Joi.string().min(3).required()
    });
    
    const result = schema.validate(req.body); 
    if(result.error){
        res.status(400).send(result.error.details); 
        return;
    }
    
    post.name = req.body.name; 
    res.send(post);
});
```

---

### Why Express?
- Simpler to develop an API than with using Django.
- Less dependancies and less code.
- Performance is generally better in these situations.
- Express is lighter weight than Django with Python.
- An alternative that is easier to write for.
- A personal preference, really – different style.

### What about security?
We can pass an Authentication header to Express.
This can be a key or username and password.
Need to generate this elsewhere on our system.
Write code to check and respond depending on permissions – as before.
Don’t respond if there are no permissions!

---

### YOUR TURN (5min): body-parser middleware
In a text document, answer the following question:

- **What is middleware in Express?**
  > **Answer:** Middleware refers to functions that sit in the middle of the request pipeline. They have access to the request object (`req`), the response object (`res`), and a `next()` function. Middleware can execute code, modify data, reject requests, or pass control safely.

In order to read HTTP POST request data, you need to install a middleware module named body-parser. The body-parser middleware extracts the entire body portion of an incoming request stream and exposes it in `req.body`.
In other words, after installing body-parser, you can access the body of a request through the `req.body` object.
To install body-parser, issue the command:
```bash
[user@pc]$ npm install body-parser
```

---

### YOUR TURN (10min): Using body-parser
In your `app.js` file, add the following lines before your CRUD handlers:

> **Solution Steps:**
```javascript
const bodyParser = require('body-parser'); 

// Apply middleware
app.use(bodyParser.urlencoded({extended: true}));
```
The `bodyParser.urlencoded` method extracts data from the `<form>` element and adds them to body property of the request object.
To test that the body-parser middleware works, change your POST handler as such:

> **Solution Steps:**
```javascript
app.post('/todos' , function(req, res){ 
    console.log(req.body)
    res.send('Task received check terminal!');
});
```

---

### YOUR TURN (5min): Testing body-parser
Open the webpage in your web browser and ensure the Web Console is open.
Enter a to-do item through the browser and check your Web Console to check that the post handler works correctly. It should log the data you entered in the browser.

> **Solution Steps:**
Ensure `node app.js` or `nodemon app.js` is running. Fill the form in the browser, press "Add task", and check your terminal output. You should see `{ taskName: 'Your entered text' }`.

---

### Summary
- Express is a Node.js-powered web server that can be used for API’s.
- These API’s are RESTful: stateless and with specific request types.
- `app.get` to respond to GET requests - taking a path and a callback.
- Similar functions for `put`, `delete` and `post`.
- We can use Postman to test those requests that aren’t GET.
- We can also handle query strings and components like in Django.
