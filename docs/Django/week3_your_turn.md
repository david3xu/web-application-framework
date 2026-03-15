# Web Application Frameworks (COMP3011/COMP 6006)
## Week 3 Lab Exercises: URL Parameters, Error Handling & Template Inheritance

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Before You Begin

Ensure you have completed Week 2's work before continuing. You should have:

- A Django project created (e.g. `blogproject`)
- A blog app created (`blogapp`)
- A `Post` model defined and migrated
- The admin interface working with a superuser created
- An `index.html` template rendering posts at `/blog/`

---

## Exercise 1 — Practical Introduction (5 min)

In this week's lab you are going to create a separate page for each individual blog post, accessible through its own unique URL (e.g. `/blog/1`, `/blog/2`).

Review your work from Week 2 before continuing:

- Start the development server and confirm `/blog/` still renders your posts correctly.
- Log in to the admin interface at http://127.0.0.1:8000/admin/ and confirm you have at least five posts. If not, create them now.

```bash
python3 manage.py runserver
```

---

## Exercise 2 — Define a New URL Path: Part 1 (5 min)

Open your app's `blogapp/urls.py` file. Add a new path to the `urlpatterns` list that captures an integer post ID from the URL:

```python
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:post_id>', views.post_detail)
]
```

Note the comma on the line before the new `path(...)` entry.

---

## Exercise 3 — Define a New URL Path: Part 2 (5 min)

In your document, answer the following questions about the path you just added:

1. What does `<int:post_id>` do? Why do we use angle brackets?
2. What is the `int:` part called, and what does it check?
3. What happens if someone visits `/blog/hello` (a non-integer value)?
4. What function will Django call when a user visits `/blog/10`? What value will `post_id` have?

---

## Exercise 4 — Implement the `post_detail` View: Part 1 (5 min)

Open `blogapp/views.py` and define a new function called `post_detail`:

```python
def post_detail(request, post_id):
```

---

## Exercise 5 — Implement the `post_detail` View: Part 2 (5 min)

Complete the `post_detail` function by fetching the correct post and rendering a template.

Use `Post.objects.get()` to retrieve the post matching the given ID:

```python
post = Post.objects.get(id=post_id)
```

Then call `render` to render a template called `details.html`, passing the post as context. Write the complete function — we will create the template file itself in the next exercise.

---

## Exercise 6 — Create the `details.html` Template (10 min)

Create a new file called `details.html` in your `blogapp/templates/` directory.

Write the HTML to display a single post's details. Use the `Book` example from the lecture as a guide — adapt it for your `Post` model's fields (title, description, pub_date, tag, slug, etc.).

For example:

```html
<dl>
  <dt>Title</dt>
  <dd>{{ post.title }}</dd>
  <dt>Published</dt>
  <dd>{{ post.pub_date }}</dd>
  <dt>Description</dt>
  <dd>{{ post.description }}</dd>
  <dt>Tag</dt>
  <dd>{{ post.tag }}</dd>
</dl>
```

---

## Exercise 7 — Test Your Blog (5 min)

Start the development server and navigate to `/blog/1` through `/blog/5` to confirm each post renders correctly on its own page:

```bash
python3 manage.py runserver
```

If something isn't working, check the terminal for error messages and correct them before continuing.

---

## Exercise 8 — Template Extending: Part 1 (5 min)

Right now, `index.html` and `details.html` are standalone files with no shared structure. Template inheritance lets you define common HTML (like a heading or navigation bar) once in a `base.html` file and reuse it across every page.

In your document, answer: **what is the benefit of template inheritance over copying the same HTML into every template file?**

---

## Exercise 9 — Template Extending: Part 2 (5 min)

Create a new file called `base.html` in your `blogapp/templates/` directory and add the following:

```html
<html>
  <head>
    <title>Your title</title>
  </head>
  <body>
    <h1>My Blog</h1>
    {% block content %}
    {% endblock %}
  </body>
</html>
```

The `{% block content %}` tag marks the area where child templates will insert their own content.

---

## Exercise 10 — Template Extending: Part 3 (5 min)

Update both `index.html` and `details.html` to extend `base.html`.

At the top of each file, add:

```html
{% extends 'base.html' %}
```

Then wrap all existing content in each file inside a content block:

```html
{% block content %}
  ... your existing HTML here ...
{% endblock %}
```

The block name (`content`) must match the block name defined in `base.html`.

Save both files and confirm your site still works correctly at `/blog/` and `/blog/1`.

---

## Exercise 11 — Raising a 404 Error (5 min)

Currently, if a user visits `/blog/999` and no post with that ID exists, Django will crash with a server error. Instead, we should return a proper 404 "page not found" response.

Update your import at the top of `blogapp/views.py`:

```python
from django.shortcuts import render, get_object_or_404
```

Then modify the `post_detail` function — replace the `Post.objects.get()` line with a single call to `get_object_or_404`. This is a one-line change.

Test it by visiting a URL with a non-existent post ID (e.g. `/blog/999`).

---

## Exercise 12 — Catering for Other Errors (5 min)

Add global error handlers to your project for HTTP errors 400, 403, 404 and 500.

Open your **project-level** `blogproject/urls.py` and add the following below `urlpatterns`:

```python
handler400 = 'blogapp.views.error_400'
handler403 = 'blogapp.views.error_403'
handler404 = 'blogapp.views.error_404'
handler500 = 'blogapp.views.error_500'
```

Then open `blogapp/views.py` and add the corresponding functions:

```python
from django.http import HttpResponse

def error_400(request, exception):
    return HttpResponse('Bad request.', status=400)

def error_403(request, exception):
    return HttpResponse('Forbidden.', status=403)

def error_404(request, exception):
    return HttpResponse('Page not found.', status=404)

def error_500(request):
    return HttpResponse('Server error.', status=500)
```

Finally, open `blogproject/settings.py` and set:

```python
DEBUG = False
ALLOWED_HOSTS = ['*']
```

Restart the server and test by visiting a non-existent URL to confirm your custom 404 handler is working.

> **Note:** When you are done testing, set `DEBUG = True` again so you continue to see helpful error messages during development.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `python3 manage.py runserver` | Start the local development server |
| http://127.0.0.1:8000/blog/ | Blog post listing page |
| http://127.0.0.1:8000/blog/1 | Individual post page (post ID 1) |
| http://127.0.0.1:8000/admin/ | Admin interface |

| Django feature | What it does |
|----------------|-------------|
| `<int:post_id>` in `urls.py` | Captures an integer value from the URL |
| `Post.objects.get(id=post_id)` | Fetches a single post by ID |
| `get_object_or_404(Post, id=post_id)` | Fetches a post or returns a 404 if not found |
| `{% extends 'base.html' %}` | Inherits layout from the base template |
| `{% block content %}` / `{% endblock %}` | Defines the area to be filled by a child template |
| `handler404` in `urls.py` | Points Django to a custom 404 view function |
