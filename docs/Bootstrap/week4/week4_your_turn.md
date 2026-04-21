# Web Application Frameworks (COMP3011/COMP 6006)
## Week 4 Lab Exercises: Bootstrap Grids and Elements

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Before You Begin

This week's lab is a standalone Bootstrap exercise — you will be working in a plain HTML file, **not** inside your Django project. You will need a code editor (e.g. VS Code) and a web browser.

The goal is to build a clone of the Bootstrap Documentation page layout (https://getbootstrap.com/docs/5.3/getting-started/introduction/), using the Bootstrap grid system and content elements covered in today's lecture.

---

## Exercise 1 — Project Setup (5 min)

Create a new directory named `bootstrap` and inside it create a blank file called `index.html`.

```bash
mkdir bootstrap
cd bootstrap
touch index.html
```

Windows users can use the graphical interface (File Explorer or VS Code's file panel) to do this instead.

---

## Exercise 2 — HTML Boilerplate (5 min)

Open `index.html` in your editor and add the following HTML5 boilerplate:

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
    <!-- Bootstrap JavaScript goes here -->
  </body>
</html>
```

In your document, answer: **what does the `viewport` meta tag do, and why is it needed for responsive design?**

---

## Exercise 3 — Including Bootstrap (5 min)

Add the Bootstrap CSS link inside your `<head>` section (just before `</head>`):

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
    crossorigin="anonymous">
```

Add the Bootstrap JavaScript bundle just before your `</body>` tag:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
    crossorigin="anonymous"></script>
```

In your document, answer: **what is a CDN and why do we use one here instead of downloading the files ourselves?**

---

## Exercise 4 — Basic Grid Layout (5 min)

Inside the `<body>` of your page (after the navbar you will add shortly, but before the JavaScript `<script>` tag), create a three-column layout using the Bootstrap grid:

```html
<div class="container">
  <div class="row">
    <div class="col-3">
      Left sidebar
    </div>
    <div class="col-6">
      Main content
    </div>
    <div class="col-3">
      Right sidebar
    </div>
  </div>
</div>
```

Open the file in your browser and confirm three columns are visible. Temporarily add some text to each column so you can distinguish them.

In your document, answer: **each Bootstrap row has 12 units of width. How are the 12 units distributed in the 3-6-3 layout above?**

---

## Exercise 5 — Creating the Navbar (10 min)

The Navbar is one of the most powerful features of Bootstrap.

- Open the Bootstrap documentation and find the Navbar component: https://getbootstrap.com/docs/5.3/components/navbar/
- Choose a navbar example that includes a brand name and a few navigation links.
- Add this navbar to your `index.html` file — it should appear above your grid container.

Your navbar should include at a minimum:
- A brand name (e.g. "Example")
- Three or four nav links (e.g. Home, Documentation, Example, Blog)

---

## Exercise 6 — Creating the Left Sidebar (10 min)

Replace the "Left sidebar" placeholder in your `col-3` column with actual navigation content.

Build a list of navigation links that resembles the left sidebar of the Bootstrap documentation page. It should include section headings and sub-items. For example:

```html
<nav>
  <p><strong>Layout</strong></p>
  <p><strong>Content</strong></p>
  <p><strong>Components</strong></p>
  <ul>
    <li><a href="#">Alerts</a></li>
    <li><a href="#">Badge</a></li>
    <li><a href="#">Navbar</a></li>
  </ul>
  <p><strong>Utilities</strong></p>
</nav>
```

You don't need to match it exactly — just aim to be as close as you can.

---

## Exercise 7 — Creating the Main Content (10 min)

Replace the "Main content" placeholder in your `col-6` column with actual page content. Use the following Bootstrap components:

- At least two heading levels (`<h2>`, `<h3>` or similar)
- At least one paragraph (`<p>`)
- At least one inline code snippet using `<code>`

For example, your content might describe what a Navbar is, how it works, and show a short code snippet. You don't need to reproduce the Bootstrap docs exactly — use your own words and adapt freely.

---

## Exercise 8 — Creating the Right Sidebar (5 min)

Replace the "Right sidebar" placeholder in your `col-3` column with a short list of anchor links pointing to the headings in your main content. For example:

```html
<ul>
  <li><a href="#">How it Works</a></li>
  <li><a href="#">Supported Content</a></li>
</ul>
```

The links don't need to actually jump anywhere yet — just populating the sidebar is sufficient.

---

## Exercise 9 — Adjust the Layout (5 min)

Update your grid layout from **3-6-3** to **2-8-2**:

```html
<div class="col-2"> ... </div>
<div class="col-8"> ... </div>
<div class="col-2"> ... </div>
```

Check that your page still looks correct in the browser. In your document, answer: **why might 2-8-2 be a better choice for a documentation-style page than 3-6-3?**

---

## Exercise 10 — Testing and Responsiveness (5 min)

Open your `index.html` in your browser and check the following:

1. Does the navbar display correctly?
2. Do the three columns appear side by side?
3. Resize the browser window — what happens to the layout at different widths?

In your document, describe what happens to the columns when you make the browser window very narrow. What would you need to change to control this behaviour using breakpoints?

---

## Quick Reference

| Bootstrap class | What it does |
|----------------|-------------|
| `container` | Centers and pads page content horizontally |
| `row` | Wrapper for a set of columns |
| `col-N` | Column taking up N of the 12 available units |
| `col-sm` | Equal-width column, collapses below the `sm` breakpoint |
| `table` | Applies Bootstrap styling to a `<table>` element |
| `table-striped` | Adds zebra-striping to table rows |
| `table-bordered` | Adds borders on all sides of the table and cells |
| `table-hover` | Highlights rows on mouse hover |
| `table-responsive` | Allows horizontal scrolling on small viewports |
| `img-fluid` | Makes an image scale responsively with its container |
| `img-thumbnail` | Adds a rounded 1px border around an image |

| Breakpoint | Class prefix | Minimum width |
|------------|-------------|---------------|
| Extra small | (none / `xs`) | < 576px |
| Small | `sm` | ≥ 576px |
| Medium | `md` | ≥ 768px |
| Large | `lg` | ≥ 992px |
| Extra large | `xl` | ≥ 1200px |
