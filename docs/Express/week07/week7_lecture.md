# Web Application Frameworks (COMP3011/COMP 6006)
# Lecture 7: Advance Topics with Node.js & Express.js

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Disclaimer

The external links, references, and materials shared in this lecture are provided for educational and informational purposes only. They are not part of the official Curtin University course content. Curtin University and the lecturer do not endorse or take responsibility for the accuracy, relevance, or completeness of the content provided by third-party sources.

---

## Outline

- Revision
- Middleware
- Authentication & Authorization
- MongoDB
- Templates
- Exercise
- Summary

---

## Revision

- What are the concepts that we covered in the last week?
- What is the purpose of using nodemon?
- What is the purpose of using Joi?
- What do we need body-parser?

---

## Middleware in Express

- Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function (next) in the application's request-response cycle.
- Middleware functions can perform a variety of tasks such as executing code, making changes to the request and the response objects, ending the request-response cycle, and calling the next middleware in the stack.
- Ref: https://expressjs.com/en/resources/middleware.html

---

## Key Roles

- **Request Processing:** Middleware functions can read and modify the data in the request objects.
- **Response Management:** Middleware can also decide to end the request-response cycle by sending a response back to the client. If it does not end the cycle, it must call `next()` to pass control to the next middleware function, otherwise, the request will be left hanging.
- **Error Handling:** Middleware functions can catch errors, or receive errors passed through the `next()` function. Special error-handling middleware can be defined that takes an error as an additional argument and can process or log these errors accordingly.

---

## Types of Middleware

- **Application-level:** Attached to an instance of express: `app.use()`, `app.get()`
- **Router-level:** bound to an instance of `express.Router()`
- **Error-handling:** Specifically handles errors that occur during the processing of requests. Takes four arguments instead of three: `(err, req, res, next)`.
- **Built-in Middleware:** `express.static`, `express.json()`, `express.urlencoded()`
- **Third Party Middleware:** body-parser, cookie-parser, morgan

---

## Example: Application-Level Middleware

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`)
  next();
})

app.get('/', (req, res) => {
  res.send('Home Page')
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
})
```

---

## Example: Router-Level Middleware

```js
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

router.get('/user', (req, res) => {
  res.send('User Page');
});

const app = express();
app.use('/', router);
app.listen(3000);
```

---

## Example: Error-Handling Middleware

```js
const express = require('express');
const app = express();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Simulate an error
app.get('/', (req, res) => {
  throw new Error('Broke!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## Example: Third-Party Middleware

```js
const express = require('express');
const morgan = require('morgan');
const app = express();

// Third-party middleware for logging
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## Example: Built-in Middleware

```js
const express = require('express');
const app = express();

// Middleware to serve static files from 'public' directory
app.use(express.static('public'));

// You no longer need a specific route for '/', as `express.static` will automatically serve 'index.html'
// from the 'public' directory when the home route is accessed.
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## Project Structure for Static

> *[Slide contains diagram — see PDF]*

---

## Authentication & Authorization

- **Authentication:** Verifying the identity of a user. It answers the question, "Who are you?"
- **Authorization:** Determining if a user has permission to perform a certain action or access specific resources. It answers the question, "What are you allowed to do?"
- **Importance:** Crucial for protecting sensitive data and ensuring that users can only perform actions they're permitted to do.

---

## Stateless Authentication with JWT

- What is stateless authentication?
- JWT: JSON Web Token (ref: https://jwt.io/introduction)
- `npm install jsonwebtoken`

---

## Implementing JWT

> *[Slide contains diagram — see PDF]*

---

## Implementing JWT

> *[Slide contains diagram — see PDF]*

---

## Authentication with Passport

- Passport.js is a popular authentication middleware for Node.js
- Key features:
  - Modular: use a system of "strategies"
  - Flexible: seamless integration with Express
  - Extensive Strategy Support: Over 500 Strategies
  - Session Management: Can be configured to manage user sessions

---

## Implementing Passport Local (setup)

- Install:
  - `npm install passport passport-local express-session`

---

## Implementing Passport Local (middleware)

> *[Slide contains code screenshot — see PDF]*

---

## Implementing Passport Local (route)

> *[Slide contains code screenshot — see PDF]*

---

## Template Engines

- Do we still remember templates in Django?
- A template engine allows you to use static template files in your application.
- At runtime, the template engine replaces variables in a template file with actual values and transforms the template into a HTML files sent to the client.
- Popular template engines for Node.js include:
  - Pug (formerly Jade)
  - EJS (Embedded JavaScript)
  - Handlebars (hbs)
  - Mustache

---

## How to use EJS?

- Step 1: `npm install ejs`
- Step 2: Set it up in your Express app

> *[Slide contains code screenshot — see PDF]*

---

## How to use EJS?

- Step 3: Create a template file `views/index.ejs`

> *[Slide contains code screenshot — see PDF]*

---

## How to use EJS?

- Conditional Statements:

> *[Slide contains code screenshot — see PDF]*

- More details: https://www.npmjs.com/package/ejs?activeTab=readme
- Tutorial: https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

---

## How to use PUG

- `npm install pug`

> *[Slide contains code screenshot — see PDF]*

---

## How to use PUG

- Create a Pug template file `views/index.pug`

> *[Slide contains code screenshot — see PDF]*

- PUG Official References: https://pugjs.org/api/getting-started.html
- A good starting point: https://wiki.imindlabs.com.au/dev/web/be/3_expressjs/3-mvc/32-view/2_pug/

---

## Database Integration

- Adding the capability to connect databases to Express apps is just a matter of loading an appropriate Node.js driver (which is just another framework) for the database within the app.
- There exists popular Node.js drivers (a.k.a. modules) for database systems that can be used in Express such as:
  - MySQL, MongoDB, PostgreSQL, SQLite, and ElasticSearch

---

## MongoDB

- MongoDB is NoSQL (not only SQL) document database that stores data in JSON-like documents. Therefore, MongoDB is schema-less.
- You do not need to predefine a structure for data before storing it.
- The main concepts of MongoDB are Documents and Collections.
  - Documents are the equivalent of (Columns and) Rows in relational databases;
  - Collections are the equivalent of Tables;
  - A collection can store many Documents due to being schema-less.

---

## Installing MongoDB

- If you wish to install MongoDB locally, the complete instructions to install MongoDB can be found at https://docs.mongodb.com/manual/installation/.
- Download for Windows: https://www.mongodb.com/try/download/community
- For Unix and Mac users, you should just be able to run the following command:

```
[user@pc]$ npm i -g mongodb
```

- We can also use a Cloud version instead.
  - This will be useful to us as the data is actually stored on the internet
  - It also saves us from having to install MongoDB locally.

---

## YOUR TURN (15min): Create a Database

Next, you will need a database to store data for your app.

A local database can be used in the development stage of your project to store information temporarily. It is not (directly) appropriate for deployment.

However, you will be working with a live database stored in the cloud on MongoDB.com (what is termed MongoDB Atlas).

Navigate to https://www.mongodb.com/ using your web browser.

Create an account (by clicking "Try Free") and then move into the 'MongoDB Atlas' product once you have logged in (the top-left one).

---

## YOUR TURN: Signing up to MongoDB Atlas

Leave "Company Name" blank – no need for this. Submit the form and check your email.

> *[Slide contains screenshot — see PDF]*

---

## YOUR TURN: Getting Started with MongoDB Atlas

Verify your email – then select these options and 'Finish'.

> *[Slide contains screenshot — see PDF]*

---

## YOUR TURN: Deployment Settings for MongoDB Atlas

We wish to launch a free instance on AWS in Sydney – choose these, then 'Create'.

> *[Slide contains screenshot — see PDF]*

---

## YOUR TURN: Security Settings for MongoDB Atlas

Note the Username and Password down and press 'Create'.

> *[Slide contains screenshot — see PDF]*

---

## YOUR TURN: Firewall Settings

You can add different IP address from the Security Panel on left: Click on Security QuickStart

> *[Slide contains screenshot — see PDF]*

---

## YOUR TURN: Second Chance for MongoDB Atlas

Logging in to MongoDB Atlas at https://cloud.mongodb.com/ will allow you to go through these steps again if you get lost by clicking the 'Database' option on the left sidebar and 'Create' on the right.

However, you will need to delete your existing database first. This is achieved through clicking the 'three dots' near the centre of the screen, then 'Terminate' from the options and following the prompts.

Check 'Network Access' and 'Database Access' on the left-hand sidebar to ensure these are configured correctly – users will need read/write access.

---

## YOUR TURN: Connection Settings for MongoDB Atlas

Click 'Connect' back on the 'Database' screen (if you have moved), then 'Drivers'.

> *[Slide contains screenshot — see PDF]*

---

## YOUR TURN: Connection String for MongoDB Atlas

Note everything before the question mark in the 'Connection String'.

> *[Slide contains screenshot — see PDF]*

---

## Mongoose

Mongoose is an Object Data Modelling (ODM) library for MongoDB and Node.js.

Simply, Mongoose provides an easy to use API to model and utilise MongoDB data.

Everything in Mongoose starts with a Schema.

Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.

Models are compiled from Schema definitions.

---

## (More on) Mongoose

A model is a class that defines a document with the properties and behaviours declared in the Schema.

Models are responsible for creating and reading documents from the underlying MongoDB database.

To install the mongoose module to your project, issue the following command:

```
[user@pc]$ npm i mongoose
```

---

## Connecting to MongoDB: Using mongoose

We can use mongoose to connect to our MongoDB as well. Outside any handlers in your `.js` Express server definition file, add:

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<username>:<password>@<clusterURL>/<database>')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
```

In the `mongoose.connect` function, everything up to and including the `/` is the 'Connection String' seen three slides back; the `<database>` name is also seen on that same screen (in this case, WebAppFrameworkV2.)

---

## Connecting to MongoDB: Explanation of using mongoose

In the case of a MongoDB cloud instance:

Replace `<username>` and `<password>` with the ones you created when you created a new user in the 'Database Access' view.

If you click 'Connect' on the cloud interface, you will see the `<clusterURL>` between the `@` and `/` when you select to 'Connect your application'.

The name of the database will be whatever immediately follows the `/` but precedes the `?`.

---

## YOUR TURN (10min): Connecting to the Database

Once you have created a cloud MongoDB cluster, we can connect to it through the mongoose's connect method.

Using the code on two slides prior, connect to your cloud MongoDB instance within your `app.js`. When you run your app, you should see a message in the terminal if all is working.

Read the instructions on the last slide carefully, as you will need to get your `mongodb+srv://` URL precisely correct for it to work.

---

## Schemas

We can defining what a Post looks like in mongoose per below. Outside any handlers in your `.js` Express server definition file:

```js
const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  tag: [String],
  date: {type: Date, default: Date.now}
});
```

Consider the similarities to both plain JSON and to our Django models.

---

## Models

To creating an instance of a Post in mongoose, add the following to your `app.js` file outside any handlers:

```js
const Post = mongoose.model('Post', postSchema);

async function createPost() {
  const post = new Post({
    title: 'First Post',
    body: 'This is the body of our first post..',
    author: 'COMP6006',
    tag: ['demo', 'mongo']
  });
  const result = await post.save();
  console.log(result);
}
```

Then, within your GET handler, make a call to the function to run it:

```js
createPost();
```

---

## What's Going On?

Firstly, we convert the schema into a Model.

Then, we create an instance of the Model.

Instances of Models are called Documents.

`const result = await post.save()`: this save to the database and store the results in a constant.

Every time the function is executed, a new document will be created in the MongoDB database.

The `async` / `await` keywords are used to run functions in the background without blocking and vice-versa.

Note the `body` key in the `createPost` function – why wasn't it used?

---

## Finding the created Posts

> *[Slide contains screenshot — see PDF]*

---

## Finding the created Posts and Adding New posts

> *[Slide contains screenshot — see PDF]*

---

## Querying a MongoDB Database: Code

```js
async function getPosts() {
  await Post.find({title: 'First Post', author: 'COMP6006'})
    .select({title: 1, body: 1})
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}

getPosts();
```

---

## Querying a MongoDB Database: Result

Compare `.find` with `.findOne` – choose depending on use!

> *[Slide contains screenshot — see PDF]*

---

## Updating and Deleting a Document

To delete a document (`.deleteOne`) or many (`.deleteMany`) documents:

```js
Post.deleteOne({title: 'First Post', author: 'COMP6006'});
```

To update a document (see also `.findOneAndUpdate`):

```js
const post = await Post.findOne({title: 'First Post', author: 'COMP6006'});
post.set({
  body = 'This post has been updated. Updated content',
  tag = ['demo', 'mongo', 'second', 'updated']
});
const result = await post.save();
console.log(result);
```

---

## Dealing with Mongo ID fields

You will need to create a mongoose constant:

```js
const mongoose = require('mongoose');
```

Then, you can create the ObjectId:

```js
mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
```

After that, you can then use it in a find call like a string literal.

---

## YOUR TURN (10min): Adding a New Document

As discussed in the previous workshop, when a user adds a to-do item, a POST request will be sent to the `/todos` URL. Further, you added the following function to your `app.js` file to handle this request:

```js
app.post('/todos', function(req, res) {
  console.log('POST request received');
});
```

Modify this function as such to add the to-do item to the database.

More detail is provided on the next slide;

- Use the above code as inspiration to create a model for a Todo;
- The thing that you will be storing is a String named `TaskName`;
- Then, create instances of it.

---

## YOUR TURN: Adding a New Document

```js
app.post('/todos', function(req, res) {
  // Write your code here...
});
```

Change the comment line above such that the function adds a to-do to the database and then redirects the user back to the homepage of the app after successfully adding the to-do item to the database.

Check your database on the MongoDB website to make sure the item was indeed added to your database.

Don't forget to make sure you require your body-parser!

You can redirect the user using the `.redirect` function on your `res`.

---

## YOUR TURN (15min): Installing Pug

Dynamic content cannot be directly passed to a HTML file.

A template engine allows you to user static template files in your application.

At runtime, the template engine replaces variables in a template file with actual values and transforms the template into an HTML file sent to the client.

In this workshop, you will use Pug.

To install pug, issue the following command:

```
[user@pc]$ npm i pug
```

Then, add the following line to your `app.js` file before your CRUD handlers.

```js
app.set('view engine', 'pug');
```

In a text document, describe what the above line does.

---

## YOUR TURN: Displaying to-do items to the user

The `res.render(view, local)` function is used to render a view and send the rendered HTML string to the client.

The `view` parameter is the name of the view file you want to render and `local` is an object whose properties define local variables for the view.

The view file above must be stored in a directory called `views`. You created this earlier within the root directory of your project.

Re-open the file you created previously named `index.pug`.

---

## YOUR TURN: Modifying your Pug file code

Change your `index.pug` to the following:

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
      form(action='/posts' method='POST')
        input(type='text' name='taskName' placeholder='e.g. Finish COMP6006 Prac')
        button(class='addTaskBtn' type='submit') Add task
      br
      ul
        each val in toDoList
          p
            li= val.taskName
```

---

## YOUR TURN (5min): Modifying your JavaScript code

Update your `app.get()` function as such, but for your Todo model:

```js
app.get('/', function(req, res) {
  // Use a .find handler to retrieve all ToDo items.
  // Then, render the index view and pass the data of
  // the database query through the local parameter of
  // render. The key is toDoList.
});
```

Your `.find` handler can be empty (`.find({})`) to retrieve everything.

---

## YOUR TURN: Modifying your JavaScript code

Complete the code above such that:

- It logs the result of the database query to the console;
- It renders the view `index.pug` file and sets the results of database query above as the `toDoList` array used in the pug file.

---

## YOUR TURN (10min): Deleting a To-Do List

A to-do list is not very useful if you cannot delete completed items. To do this, add the following line to your `index.pug` file to add a delete button associated with each to-do list item:

After `li= val.taskName`, add the new line:

```pug
a(class='button delete-todo' data-todoid=val._id href='/todos/'+val._id) delete task
```

To delete a to-do item, you need to add an event listener to the button above, such that when you click it, a handler will be executed to send a DELETE request to the server.

---

## YOUR TURN: Deleting a To-Do List

Add the following JavaScript code to a file named `main.js` in `/public/js/`:

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
        window.location.href = "/";
      },
      error: function(err) {
        // If delete failed.
        console.error(err);
      }
    });
  });
});
```

---

## YOUR TURN: Loading Static Files

Create a folder called "public" in your project directory.

Add the following code to load static files (css, javascripts) from the "public" directory:

```js
app.use(express.static('public'));
```

---

## YOUR TURN: Deleting a To-Do List

In a text file, describe what the code above does.

Then, go back to your `app.js` file and add the following handler function:

```js
app.delete('/todos/:id', function(req, res) {
  // You complete the function!
});
```

Complete the above function so that:

- It will query the database to find a document with the id within `req.params.id` and removes it from the database (noting id is an ObjectId).
- The handler should `res.redirect` back to the page with the to-do list at the end, so that the user can see the outcome.

---

## YOUR TURN: Add Authentication & Authorization

- Add Authentication in your Todo App using Passport.js
- Investigate how to implement Authorization!!!

---

## Practical Assessment

- It will be published Early Next Week!
- You will get roughly two weeks to complete it
- It will be based on all the task that we have been doing so far using Bootstrap, Express, and MongoDB

---

## Summary

- Middleware functions allow us to interrupt the request-response flow to run code in between.
- Template engines such as Pug allow us to make dynamic templates, but using YAML to define the templates, differently to Django's way.
- It is relatively straightforward to use a variety of databases within Node.js.
- One that we can use is MongoDB, a schema-less document database that stores data in a similar way to a group of JSON documents.
- However, we can still run the usual group of commands to CRUD data, just a bit differently to what we might expect.
