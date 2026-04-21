# Web Application Frameworks (COMP3011/COMP 6006)
## Lecture 5: Bootstrap Components

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Outline

- Revision
- Components
  - Alerts
  - Breadcrumbs
  - Buttons
  - Collapse
  - Forms
  - Modals
  - Navbars
  - Pagination
- Your Turn
- Summary

---

## Revision...

What did we look at last week?
- What is Bootstrap?
- Why do we use it?
- How do we use it?
- How do we use it with Django?

Let us answer the above together as a class, to cement our understanding.

---

## ...and Context

Bootstrap provides various elements, which together allow us to form user interfaces for our web applications;
- Reusable components that take care of the hard work for us;
- Grid system for responsive design and page organisation;
- General styling utilities to make our pages easy to read.

After adding in the links to the JavaScript and CSS files, it is just a matter of using predefined styles and HTML snippets.
Hence, we can use them easily within Django templates.

---

## Components

There are dozens of reusable components built-in as part of Bootstrap for you to use.
- They allow you to use pre-designed and reusable pieces of code for common tasks, with a design that matches the rest of Bootstrap.
- Some examples are: Navigation, Pagination, Alerts, Dropdowns, Popovers...
- We don’t have time to cover them all but there are a lot more still. Check out the Bootstrap documentation further to see more.

The rest of this lesson is really just a ‘jumble’ of various components and how to use them – including examples of why. Make sure you listen and not just read!

---

## Alerts

Alert messages can be used to provide contextual feedback messages for typical user actions.

---

## Alerts: Code

```html
<div class="alert alert-primary" role="alert"> 
  Primary alert
</div>
<div class="alert alert-secondary" role="alert"> 
  Secondary alert
</div>
<div class="alert alert-success" role="alert"> 
  Success alert
</div>
<div class="alert alert-danger" role="alert"> 
  Danger alert
</div>
<div class="alert alert-warning" role="alert"> 
  Warning alert
</div>
```

**Dismissable alerts with links**
```html
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

---

## Breadcrumbs

A navigation scheme that indicates the user’s current location in a website.
Breadcrumbs make it easier for users to move around a website, assuming the content is organised in a hierarchical manner.

---

## Breadcrumbs: Code

```html
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Blog</a></li>
    <li class="breadcrumb-item active">Frameworks</li>
  </ol>
</nav>
```

---

## Buttons

Bootstrap provide custom button styles that can be used in forms, dialogs and more.

---

## Buttons: Code

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
```

`.btn` classes are designed to be used with the `<button>` element, but they can also be used on `<a>` or `<input>` elements (note: rendering may be slightly different on some browsers).

---

## Button sizing

Add `.btn-lg` or `.btn-sm` for large and small button sizes:
```html
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-primary btn-sm">Small button</button>
```

Buttons can also be resized to span the full width of a parent element using `.btn-block`:
```html
<button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
```

---

## Button states

Buttons can be programmed to appeared pressed:
```html
<a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true">Pressed Button</a>
```

By adding the disabled Boolean attribute to any `<button>` element, buttons can appear inactive:
```html
<button type="button" class="btn btn-lg btn-primary" disabled>Primary button</button>
<a href="#" class="btn btn-primary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Primary link</a>
```

Adding `tabindex="-1"` prevents an `<a>` element from receiving keyboard focus.

---

## Button groups

Buttons can be grouped together on a single line using a button group.
Wrap a series of buttons with the `.btn` class in `.btn-group`:
```html
<div class="btn-group" role="group">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
```

---

## Combining grouping of buttons and other attributes

Apply `.btn-group-*` to each `.btn-group` to resize buttons:
```html
<div class="btn-group btn-group-lg" role="group">...</div>
<div class="btn-group" role="group">...</div>
<div class="btn-group btn-group-sm" role="group">...</div>
```

`.btn-group-vertical` can be used to make button groups appear vertically:
```html
<div class="btn-group-vertical">
  ...
</div>
```

---

## Collapsable areas

The collapse JavaScript plugin is used to toggle the visibility of content;
Buttons (`<button>`) or anchors (`<a>`) are used as triggers mapped to specific elements that are toggled.

---

## Collapsable areas: Code

```html
<p>
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false">
    Link with href
  </a>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </div>
</div>
```

---

## Collapsable areas (continued)

The `.collapse` class indicates a collapsible element. This content will be toggled to be shown or hidden with a click:
```html
<div class="collapse" id="collapseExample">
```

The attribute `data-toggle="collapse"` assigns control of a collapsible element;
The `href` attribute (within `<a>`) or `data-target` attribute (within `<button>`) connect an anchor or button to a collapsible element:
```html
<a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role=" button" aria-expanded="false">
```

---

## Forms

Bootstrap forms are input-based components used to collect user data;
Example use cases are for login, contact, subscription, enquiry...

---

## Form: Code

```html
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Remember me</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

---

## Input Fields

The `type` attribute specified the type of `<input>` element to display:
```html
<input type="value">
```

Common attribute types include:
- `email`: to define a field for email address;
- `password`: to define a password field;
- `number`: input field for numerical information;
- `date`: defines a date field (year, month, day).

Using the appropriate `<input>` type takes advantage of input controls such as email verification, password input protection, number selection, etc.

---

## Form Controls

Textual form controls, such as `<input>`, `<select>` and `<textarea>`, are styled with the `.form-control` class.
- `.form-control` is a bootstrap class that styles the general appearance, focus state, sizing and other elements of the particular form control.
- Each type of control is styled differently. For file inputs, use the `.form-control-file` class instead of `.form-control`.
- There are other types of form controls as well, treated differently. Such as checkboxes, switches and “radio” buttons.

---

## Form Controls: Textarea/Dropdown Code

```html
<form>
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Select example</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
</form>
```

---

## Form Controls: Read-only

The readonly boolean attribute can be used on inputs to prevent modification of the input’s value:
```html
<input class="form-control" type="text" placeholder="Read-only input" readonly>
```

---

## Form Controls: Range

The `.form-control-range` can be used to set horizontally scrollable range input:
```html
<form>
  <div class="form-group">
    <label for="formControlRange">Example Range input</label>
    <input type="range" class="form-control-range" id="formControlRange">
  </div>
</form>
```

---

## Form Grid: Code

Forms can be grouped on a horizontal row using the Bootstrap grid classes.
```html
<form>
  <div class="row">
    <div class="col">
      <input type="text" class="form-control" placeholder="First name">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Last name">
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <button type="submit" class="btn btn-primary">Register</button>
</form>
```

---

## Modals

The Bootstrap JavaScript modal plugin can be used to display a dialog box or ‘popup’ window on top of the current page.

---

## Modals: Controller Code

```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
  Trigger Modal
</button>
```

- The attribute `data-bs-toggle="modal"` is set on a controller element to toggle the modal popup;
- Whereas, the `data-bs-target=` attribute assigns a specific modal popup element to the target.

---

## Modals: Target Code

```html
<div class="modal" id="exampleModalCenter" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <h4>Hello World</h4>
        <p><!-- This is where the content goes! --></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
```

---

## Navbar

A navigation bar is navigation element that is placed at the top of a webpage. We have used these briefly in previous practicals.
```html
<nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
</nav>
```

---

## Navbar: Code

```html
<nav class="navbar navbar-expand-sm bg-light">
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#">Link 1</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link 2</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link 3</a>
    </li>
  </ul>
</nav>
```

---

## Responsive Navbar: Code

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <!-- Individual link goes here... -->
      </li>
      <!-- Remaining items go here... -->
    </ul>
  </div>
</nav>
```

---

## Responsive Navbars

- `.navbar-expand-lg` displays the full-width navbar for screens equal to and above 1200px wide (lg).
- `.navbar-toggler` class in `<button>` toggles a ‘hamburger’ menu when the screen size becomes less than 1200px wide.
- The ‘hamburger’ menu collapses the navbar (`#navbarNav`) content.
- The navbar content is wrapped inside a div element with `class="collapse navbar-collapse"`.

---

## Pagination

Pagination indicates a series of related content across multiple pages and allows navigation between the pages.
Consider a really long list – like a list of blog posts – which can be ‘too much’ on one page for both technical and usability reasons.
```html
<nav>
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    ...
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
```

---

## Summary

- Bootstrap is a user interface framework that allows you to design web pages that work on a wide range of devices using a consistent and user-friendly design.
- A variety of components exist for us to use within our own for common, repetitive tasks:
  - Such as Alerts, Breadcrumbs, Buttons and Collapsable Areas.
- Similarly, form elements are provided for different types of input.
  - Such as plain text, radio buttons, files, ranges...
- Bootstrap also provides larger components for managing the display of information such as modal popups, navbars and pagination.
- We can use a lot of different Bootstrap components together to make what we need to make.
- Some components (such as navbars) are ‘responsive’ and display differently on different sized devices.
