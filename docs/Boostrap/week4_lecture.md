# Web Application Frameworks (COMP3011/COMP 6006)
## Lecture 4: Intro to Bootstrap, Grids and Elements

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Outline

- Context & Theory
- Grid System
- Elements
- Images
- Tables
- Summary

---

## The Story So Far...

- Three weeks on Django — primarily focused on backend concerns.
  - How to store and manipulate data within a web application.
  - Dynamically generating HTML pages for users.
- While we did *touch* on the frontend, we didn't pay too much attention to it.
  - We considered some basic structure, but nothing too serious.
  - We didn't even really look at making things *look* good.
  - We did *kind of* examine the use of Bootstrap, but not really.

---

## Requirements for a Solution

We need a *framework* that allows us to build the interface (client-side) of web applications...

- Easily and quickly, in a systematic way (for our own benefit);
- In a *responsive* manner, so it works on all different types of systems people use web applications on (desktop, laptop, mobile, tablet);
- With aesthetic affordances, so the users know what each thing on the site means and so it is easily and pleasantly understood;
- Integrate easily with Django, so we can extend the knowledge we have and the complimentary abilities of that framework.

---

## What is Bootstrap?

- A framework for building responsive, mobile-first sites.
  - Works on different types of devices but the 'default' view is mobile.
- Popular and open-source, composed in HTML, CSS and JavaScript.
  - Created by a designer and developer at Twitter in 2010;
  - First released in 2011 and since updated, Bootstrap 5(.3) is the latest version;
  - Documentation can be found at https://www.getbootstrap.com;
  - Can be used on its own, or integrated with front-end development systems.

---

## Responsive Web Design

Responsive web design is a web development approach that allows dynamic changes to the user interface of a website based on screen size and orientation of the device being used to view it.

- A single codebase can support users with different sized viewports (e.g. desktops, laptops, tablets, mobile phones);
- The same HTML is served to all devices and CSS is used to change the layout of the page based on the viewport;
- The term **viewport** is used to describe the visible area of a webpage on a display device.

This greatly aids usability — designs are tailored to the nature of the device.

---

## Using Bootstrap: Stylesheet Link

To get started (the traditional way), include the CSS stylesheet within your `<head>` block as a link (the line before `</head>`):

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
    crossorigin="anonymous">
```

The `jsdelivr.net` content delivery network (CDN) makes it quicker for us to load the stylesheet (and not have to use our own resources)!

---

## Using Bootstrap: JavaScript Link

The other thing we must do is include (this time in our `<body>`, at the very end but before our `</body>` tag) is the JavaScript library as well:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
    crossorigin="anonymous"></script>
```

- This provides additional functionality beyond raw styling.
- Alerts, Buttons, Carousels, Dropdowns, Navbars and Toasts (amongst a few other elements) require it to function.
- The process is different when using `npm` or similar, as we will also see later (during our studies with React.js).

---

## Components of Bootstrap

The components provided by Bootstrap fall into a few general categories:

- *Layout*: how to organise components and data/information on your page;
- *Content*: how to present information such as text, images and tables;
- *Forms*: styling and structure for forms retrieving user input;
- *Components*: 'blocks' that provide integral parts of the page and functionality;
- *Helpers* and *Utilities*: self-explanatory.

We insert these components into the HTML of our page (within the `body` section) to use them within our projects.

Hence, we could include them in our Django templates in the same manner as any other HTML code, just making sure to include the CSS and JavaScript in our base template.

---

## YOUR TURN: Building a Page with Bootstrap — Getting Started

Today, you will be building a clone of the Bootstrap Documentation page (https://getbootstrap.com/docs/5.3/getting-started/introduction/).

- First, in your IDE (e.g. VS Code), create a new directory named `bootstrap`.
- Navigate to the newly created directory and create a file called `index.html`.

```bash
mkdir bootstrap
touch index.html
```

You can use the graphical interface (Windows users will have to) to do this.

---

## YOUR TURN: Create Your First Bootstrap Webpage

Open `index.html` in an editor. Edit the file to include the HTML5 doctype, a viewport meta tag for proper responsive behaviours, alongside the rest of the boilerplate:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Hello, world!</title>
  </head>
  <body>
    <!-- Bootstrap JavaScript -->
  </body>
</html>
```

---

## YOUR TURN: Including Libraries

Include Bootstrap into your `<head>` section, using the Bootstrap CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
    crossorigin="anonymous">
```

Many of the Bootstrap components require Popper.js (to 'pop' things on and off the screen) to function. To include it, add the following code near the end of the page, before the closing `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
    crossorigin="anonymous"></script>
```

---

## (Bootstrap's) Grid System

Bootstrap's grid system uses **containers**, **rows**, and **columns** to layout and align content.

- It is fully responsive, meaning it responds and adapts based on the screen size and orientation of the device used by the user to view the website.
- **Containers** provide a means to center and horizontally pad the website's content.
- **Rows** are wrappers for columns: content must be placed within columns and only columns may be immediate children of rows.

### Grid System Example: Code

```html
<div class="container">
  <div class="row">
    <div class="col-sm">
      column one
    </div>
    <div class="col-sm">
      column two
    </div>
    <div class="col-sm">
      column three
    </div>
  </div>
</div>
```

### Grid System Example: Explanation

Creates three equal width columns on small, medium, large, and extra-large devices:

- `.col-sm` is a grid breakpoint that scales up elements as the viewport changes. For example, `.col-sm` collapses the element below the breakpoint (for `sm`) and stays horizontal above breakpoint;
- Grid columns without a specified width will automatically layout as equal width columns;
- Column classes indicate the number of columns to use out of the possible **12 columns per row**.

---

## Grid System Breakpoints

Bootstrap defines five different breakpoints for viewport width:

- **Extra small (xs):** less than 576 pixels;
- **Small (sm):** greater than or equal to 576 pixels;
- **Medium (md):** greater than or equal to 768 pixels;
- **Large (lg):** greater than or equal to 992 pixels;
- **Extra large (xl):** greater than or equal to 1200 pixels.

By default, 15 pixels of padding will be applied to each side of a column.

---

## Unequal Grid System

Each row in Bootstrap is twelve 'units' in width.

- You can specify a fixed width if you wish.
- If you don't, the remaining columns will be split equally to add to 12 'units'.
- You can also combine these with the breakpoints to display differently depending on the viewport size.

### Unequal Grid System Example: Code

```html
<div class="container">
  <div class="row">
    <div class="col">
      column one
    </div>
    <div class="col-6">
      column two
    </div>
    <div class="col">
      column three
    </div>
  </div>
</div>
```

In this example, `column two` takes up 6 of the 12 units, and the remaining 6 units are split equally between `column one` and `column three` (3 units each).

---

## YOUR TURN: Basic Grid System

Create a basic 'Unequal Grid System' with three columns within your newly created `index.html` file.

- No content is (yet) required within the three columns, however you may wish to add some (temporarily) to ensure it is working as intended.
- Columns should be spaced **3-6-3** in relative sizing (of the 12 columns).

---

## Media Object

The media object is a media item positioned alongside content — like blog comments, Facebook stories, or tweets. Popular in earlier versions of Bootstrap, it must now be manually recreated.

```html
<div class="d-flex">
  <div class="flex-shrink-0">
    <img src="..." alt="...">
  </div>
  <div class="flex-grow-1 ms-3">
    This is some content from a media component. You can replace this with any
    content and adjust it as needed.
  </div>
</div>
```

---

## Headings

Bootstrap styles all six heading levels (`<h1>` through `<h6>`) automatically once the stylesheet is included. No additional classes are needed for basic headings.

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

---

## Styling Inline HTML Elements

Bootstrap provides styling for common inline text elements:

```html
<p>You can use the mark tag to <mark>highlight</mark> text.</p>

<p><del>This line of text is meant to be treated as deleted text.</del></p>

<p><u>This line of text will render as underlined</u></p>

<p><small>This line of text is meant to be treated as fine print.</small></p>

<p><strong>This line rendered as bold text.</strong></p>

<p><em>This line rendered as italicized text.</em></p>
```

---

## Block Quotes

Block quotes are used to quote blocks of content from another source:

```html
<figure>
  <blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Someone famous in <cite title="Source Title">Source Title</cite>
  </figcaption>
</figure>
```

---

## List Alignment

Description lists can be used to align terms and definitions horizontally using the grid system:

```html
<dl class="row">
  <dt class="col-sm-3">Description lists</dt>
  <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

  <dt class="col-sm-3">Euismod</dt>
  <dd class="col-sm-9">
    <p>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</p>
    <p>Donec id elit non mi porta gravida at eget metus.</p>
  </dd>

  <dt class="col-sm-3">Malesuada porta</dt>
  <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</dd>
</dl>
```

---

## Code Snippets

`<code>` can be used to wrap inline snippets of code:

```html
For example, <code>def main():</code>.
```

`<pre>` can be used to wrap multiple lines of code:

```html
<pre><code>
<p>Sample text here...</p>
<p>And another line of sample text here...</p>
</code></pre>
```

---

## Responsive Images

Images in Bootstrap are made responsive with `.img-fluid`:

```html
<img src="..." class="img-fluid" alt="Responsive image">
```

Images with `.img-fluid` applied will have `max-width: 100%;` and `height: auto;` so that they scale with the parent element.

### Image Thumbnails

`.img-thumbnail` can be used to give an image a rounded 1px border appearance:

```html
<img src="..." alt="..." class="img-thumbnail">
```

### Aligning Images

Float can be used to toggle an element to float to the left or right:

```html
<img src="..." class="rounded float-left" alt="...">
<img src="..." class="rounded float-right" alt="...">
```

### Figures

Specific styling is available for images with captions:

```html
<figure class="figure">
  <img src="..." class="figure-img img-fluid rounded" alt="...">
  <figcaption class="figure-caption">A caption for the above image.</figcaption>
</figure>
```

Limited use cases, especially in web applications — more useful in web-reports.

---

## Tables

The tables in Bootstrap are *opt-in*. Just add the `.table` class to any `<table>`:

```html
<table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Column 1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Lorem</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Dolor</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Consectetur</td>
    </tr>
  </tbody>
</table>
```

### Tables with Striped Rows

Use `.table-striped` to add zebra-striping to table rows within `<tbody>`:

```html
<table class="table table-striped">
```

### Bordered and Borderless Tables

Add `.table-bordered` for borders on all sides of the table and cells:

```html
<table class="table table-bordered">
```

For a table without any borders, add `.table-borderless`:

```html
<table class="table table-borderless">
```

### Hoverable Rows

To enable hover highlighting over table rows within a `<tbody>`, add `.table-hover`:

```html
<table class="table table-hover">
```

Add `.table-dark` to display light text on dark backgrounds:

```html
<table class="table table-bordered table-dark">
```

### Table Captions

The `<caption>` tag can be used to add a caption to a table:

```html
<table class="table">
  <caption>List of users</caption>
  <thead>
    <tr>
```

### Responsive Tables

Responsive tables allow tables to be scrolled horizontally with ease. `.table-responsive` makes the table responsive across every breakpoint:

```html
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```

Tables can also be made responsive up to a specific breakpoint only. From that breakpoint and up, the table will behave normally:

```html
<div class="table-responsive-sm">
  <table class="table">
    ...
  </table>
</div>
```

---

## YOUR TURN: Creating the Navbar

The Navbar is one of the most powerful features of a Bootstrap webpage.

- Research the Bootstrap documentation to find the Navbar component: https://getbootstrap.com/docs/5.3/components/navbar/
- Create a navbar for your webpage — it should look similar to one of the examples in the documentation.
- Add this into the `index.html` file you created earlier.

---

## YOUR TURN: Creating the Sidebar Navigation

Build a left sidebar navigation into your `index.html` file.

- Don't worry about having the sidebar 'stick' to the page as it scrolls.
- You don't need to have it identical to the reference — just as close as you can.
- It is suggested you change the widths of your layout from **3-6-3** to **2-8-2**.

---

## YOUR TURN: Creating the Main Content

Build into the file the main content of your web page, including the following Bootstrap components:

- Headings
- Paragraphs
- Code

You may use more components if you wish. Do not worry about having 100% of the content included.

---

## YOUR TURN: Creating the Right Sidebar

Build into the file a right sidebar, containing a short list of anchor links pointing to the sections within your main content area.

---

## YOUR TURN: Testing

Open your webpage in the browser and check that it displays correctly.

---

## Summary

- Bootstrap is a user interface framework we can use for webpages.
- It provides styling for a wide range of user interface elements.
- The 'responsiveness' allows us to design for different devices and still deliver a usable webpage.
