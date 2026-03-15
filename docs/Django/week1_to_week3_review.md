# Weeks 1–3 Review: What We Built and Where It Fits

*COMP3011/COMP6006 — Web Application Frameworks*

---

## The Django Framework

Django is a **web framework** — a collection of tools and conventions that handle the repetitive parts of building a website, so you can focus on what makes your site unique. Every web framework, regardless of language, follows the same core idea: receive a request, route it to the right place, run some logic, fetch data, and return a response. Django makes each of these steps explicit through its **MTV (Model, Template, View)** architecture.

Django code lives at two levels — the **Project** (global configuration) and the **App** (feature-specific logic):

```
  User's Browser
       │
       │  HTTP Request (e.g. GET /blog/)
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  PROJECT LEVEL  (blogproject/)                                  │
│                                                                 │
│  settings.py  ← global config: installed apps, database, etc.  │
│                                                                 │
│  urls.py      ← entry point: "blog/" → forward to blogapp      │
│       │                                                         │
└───────┼─────────────────────────────────────────────────────────┘
        │  include('blogapp.urls')
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  APP LEVEL  (blogapp/)                                          │
│                                                                 │
│  urls.py      ← app routing: "" → views.index()                │
│               ←              "<int:post_id>" → views.post_detail│
│       │                                                         │
│       ▼                                                         │
│  views.py     ← logic: fetch data, choose template             │
│       │                    │                                    │
│       ▼                    ▼                                    │
│  models.py            templates/base.html                       │
│  (ORM queries)        templates/index.html                      │
│       │               templates/details.html                    │
│       ▼                    │                                    │
│   Database                 │                                    │
│  (db.sqlite3)              │                                    │
│       │                    │                                    │
│       └──── data ─────────►│                                    │
│                            │ rendered HTML                      │
└────────────────────────────┼────────────────────────────────────┘
        │                    │
        ▼                    ▼
  User's Browser ◄── HTTP Response (finished HTML page)
```

Each component has one clear responsibility:

| Level | File | Responsibility |
|-------|------|----------------|
| Project | `settings.py` | Global config — registered apps, database, etc. |
| Project | `urls.py` | Receives requests, routes to the correct app; defines global error handlers |
| App | `urls.py` | Routes within the app to the correct View |
| App | `views.py` | Logic — fetches data, chooses template, returns response |
| App | `models.py` | Defines data structure, communicates with database |
| App | `templates/` | Presents data as HTML for the browser |
| App | `admin.py` | Registers models with the built-in admin interface |

Think of it like a restaurant: the project `urls.py` is the **front door**, the app `urls.py` is the **section host**, `views.py` is the **waiter**, `models.py` is the **kitchen**, and `templates/` is the **plating**.

---

## Overview

By the end of Week 3, you had a fully featured blog — individual post pages accessible by URL, a shared base template across all pages, and proper error handling for missing content. This document maps every step across all three weeks back to the architecture above.

Here is what the framework looked like **at the end of Week 3**:

```
  User's Browser
       │
       ├── GET /blog/          → views.index()       → index.html (all posts)
       └── GET /blog/<id>      → views.post_detail() → details.html (one post)
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  PROJECT LEVEL  (blogproject/)                                  │
│                                                                 │
│  settings.py  ✅  registered blogapp                           │
│  urls.py      ✅  routes /blog/ → blogapp                      │
│               ✅  global error handlers (400, 403, 404, 500)   │
│                                                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  APP LEVEL  (blogapp/)                                          │
│                                                                 │
│  urls.py      ✅  "" → views.index                             │
│               ✅  "<int:post_id>" → views.post_detail          │
│  views.py     ✅  index() — fetches all posts                  │
│               ✅  post_detail() — fetches one post by ID       │
│               ✅  error handlers (400, 403, 404, 500)          │
│  models.py    ✅  Post model defined and migrated              │
│  admin.py     ✅  Post registered with admin interface         │
│                                                                 │
│  templates/base.html     ✅  shared layout                     │
│  templates/index.html    ✅  all posts (extends base.html)     │
│  templates/details.html  ✅  single post (extends base.html)   │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
                      db.sqlite3
                  (Post table exists,
                   rows added via admin)
```

> ✅ = completed by end of Week 3

---

## Week 1

### Step 1 — Installing Django

**What you did:**

```bash
python3 -m pip install Django
```

**Where it fits:** A prerequisite — before anything else, Django needs to be installed on your machine. Without it, none of the `django-admin` or `manage.py` commands exist.

---

### Step 2 — Creating the Project

**What you did:**

```bash
django-admin startproject blogproject
```

**Where it fits:** This created the **project-level** container — the outer shell of your entire web application. Django generated this folder structure:

```
blogproject/               ← outer container
├── manage.py              ← your command-line control centre
└── blogproject/           ← inner project package
    ├── __init__.py
    ├── settings.py        ← global configuration
    ├── urls.py            ← top-level URL routing
    ├── wsgi.py
    └── asgi.py
```

---

### Step 3 — Creating the App

**What you did:**

```bash
python3 manage.py startapp blogapp
```

**Where it fits:** This created the **app-level** folder — the self-contained module that handles your blog feature:

```
blogapp/
├── __init__.py
├── apps.py        ← app configuration class (BlogappConfig)
├── models.py      ← data structure definitions (empty for now)
├── views.py       ← request handling logic (empty for now)
├── admin.py       ← admin registration (empty for now)
├── tests.py
└── migrations/
    └── __init__.py
```

The app existed on disk, but Django didn't know about it yet.

---

### Step 4 — Registering the App with the Project

**What you did:** Opened `blogproject/settings.py` and added your app to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    ...
    'blogapp.apps.BlogappConfig',   # ← you added this line
]
```

**Where it fits:** This is **connection point #1** — until this line exists, Django ignores your app entirely.

---

### Step 5 — Running the First Migration

**What you did:**

```bash
python3 manage.py migrate
```

**Where it fits:** Django's built-in apps need their own database tables before the server starts cleanly. This created `db.sqlite3` and set those tables up.

---

### Step 6 — Starting the Development Server

**What you did:**

```bash
python3 manage.py runserver
```

**Where it fits:** Started the local web server at `http://127.0.0.1:8000/`. Django's default welcome page appeared because no routes or views existed yet.

---

### Step 7 — Writing the First View

**What you did:** Opened `blogapp/views.py` and wrote:

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello World")
```

**Where it fits:** This is the **View** — the first real logic in your app. It existed, but Django had no way to call it yet.

---

### Step 8 — Creating the App's `urls.py`

**What you did:** Created `blogapp/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index')
]
```

**Where it fits:** The app-level URL file. It maps the base URL of this app to `views.index`.

---

### Step 9 — Connecting the App URLs to the Project

**What you did:** Opened `blogproject/urls.py` and added:

```python
path('blog/', include('blogapp.urls'))
```

**Where it fits:** This is **connection point #2**. The two `urls.py` files now work as a chain:

```
/blog/  →  project urls.py  →  blogapp/urls.py  →  views.index()
```

---

### Step 10 — Visiting the Page

Navigated to `http://127.0.0.1:8000/blog/` and saw **Hello World**. ✅

---

## Week 2

### Step 11 — Defining the Post Model

**What you did:** Opened `blogapp/models.py` and defined the `Post` class:

```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    pub_date = models.DateTimeField()
    tag = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255)
```

**Where it fits:** This is the **Model** — the data layer. Each attribute maps to a column in the database. Django's ORM handles all the SQL for you.

---

### Step 12 — Adding a Custom Model Method

**What you did:** Added a method to `Post` that checks whether it was published before or after COVID (10 Mar 2020):

```python
import datetime

def is_pre_covid(self):
    covid_date = datetime.date(2020, 3, 10)
    return self.pub_date.date() <= covid_date
```

**Where it fits:** Custom methods add behaviour to model instances, keeping data logic inside the model rather than scattered across views or templates.

---

### Step 13 — Creating and Running Migrations

**What you did:**

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

**Where it fits:** `makemigrations` generated a migration file describing the new `Post` table. `migrate` applied it to the database, creating the table.

```
blogapp/migrations/
└── 0001_initial.py    ← generated by makemigrations
```

---

### Step 14 — Registering Post with Admin

**What you did:** Opened `blogapp/admin.py`:

```python
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```

**Where it fits:** This tells the admin interface to expose `Post` for CRUD operations.

---

### Step 15 — Creating a Superuser

**What you did:**

```bash
python3 manage.py createsuperuser
```

**Where it fits:** Created an admin account to log in at `http://127.0.0.1:8000/admin/` and add posts directly through the browser.

---

### Step 16 — Updating the View to Fetch Posts

**What you did:** Updated `blogapp/views.py`:

```python
from django.shortcuts import render
from .models import Post

def index(request):
    postsQuerySet = Post.objects.all()
    return render(request, 'index.html', {'posts': postsQuerySet})
```

**Where it fits:** The view now queries all posts and passes them to a template. `Post.objects.all()` returns every row in the `Post` table as a QuerySet.

---

### Step 17 — Creating the Template

**What you did:** Created `blogapp/templates/index.html` with a loop to render all posts:

```html
{% for post in posts %}
<div>
  <h2>{{ post.title }}</h2>
  <p>{{ post.pub_date }}</p>
  <p>{{ post.description }}</p>
</div>
{% endfor %}
```

**Where it fits:** The **Template** — the presentation layer. `{{ }}` outputs values; `{% %}` controls logic.

---

### Step 18 — Testing the Full Stack

Logged in to admin, added posts, visited `http://127.0.0.1:8000/blog/` and confirmed real posts rendered from the database. ✅

---

## Week 3

### Step 19 — Adding a URL Parameter for Individual Posts

**What you did:** Opened `blogapp/urls.py` and added a second path:

```python
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:post_id>', views.post_detail)
]
```

**Where it fits:** `<int:post_id>` is a **URL parameter** — it captures whatever integer appears in that position of the URL and passes it to the view as a variable. A request to `/blog/7` will call `views.post_detail(request, post_id=7)`.

---

### Step 20 — Implementing the `post_detail` View

**What you did:** Added a new function to `blogapp/views.py`:

```python
def post_detail(request, post_id):
    post = Post.objects.get(id=post_id)
    return render(request, 'details.html', {'post': post})
```

**Where it fits:** Unlike `index()` which fetches all posts, this view fetches a **single post** by its ID and passes it to a different template.

---

### Step 21 — Creating the `details.html` Template

**What you did:** Created `blogapp/templates/details.html` to display a single post:

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

**Where it fits:** A second template, handling the detail view. Uses dot notation (`post.title`) to access individual model attributes.

---

### Step 22 — Creating a Base Template

**What you did:** Created `blogapp/templates/base.html`:

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

**Where it fits:** The `{% block content %}` tag marks a placeholder that child templates fill in. Any HTML outside the block (the heading, navigation, etc.) appears on every page automatically.

---

### Step 23 — Extending the Base Template

**What you did:** Updated both `index.html` and `details.html` to inherit from `base.html`:

```html
{% extends 'base.html' %}

{% block content %}
  ... page-specific content here ...
{% endblock %}
```

**Where it fits:** Template inheritance eliminates duplication. The heading defined once in `base.html` now appears on every page without being copied into each template.

---

### Step 24 — Adding 404 Error Handling

**What you did:** Updated the import in `blogapp/views.py`:

```python
from django.shortcuts import render, get_object_or_404
```

Then changed `post_detail` to use it:

```python
def post_detail(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    return render(request, 'details.html', {'post': post})
```

**Where it fits:** `get_object_or_404` replaces `objects.get()`. If no matching post exists, it returns an HTTP 404 response instead of crashing with a server error. This is a one-line change that makes the app much more robust.

---

### Step 25 — Global Error Handling

**What you did:** Added handler variables to `blogproject/urls.py`:

```python
handler400 = 'blogapp.views.error_400'
handler403 = 'blogapp.views.error_403'
handler404 = 'blogapp.views.error_404'
handler500 = 'blogapp.views.error_500'
```

Added corresponding functions to `blogapp/views.py`:

```python
def error_400(request, exception):
    return HttpResponse('Bad request.', status=400)

def error_403(request, exception):
    return HttpResponse('Forbidden.', status=403)

def error_404(request, exception):
    return HttpResponse('Page not found.', status=404)

def error_500(request):
    return HttpResponse('Server error.', status=500)
```

And in `blogproject/settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['*']
```

**Where it fits:** These handler variables are special — Django looks for them in the project `urls.py` and calls the referenced view whenever that error code occurs anywhere in the application. `DEBUG` must be `False` for custom error handlers to activate; in development, set it back to `True` to restore detailed error messages.

---

## What You Touched Across All Three Weeks

| File | What You Did |
|------|-------------|
| `blogproject/settings.py` | Added `BlogappConfig` to `INSTALLED_APPS`; set `DEBUG = False` and `ALLOWED_HOSTS` for error handling |
| `blogproject/urls.py` | Added `blog/` route; added global error handlers |
| `blogapp/urls.py` | Created from scratch; added `index` route; added `<int:post_id>` route |
| `blogapp/views.py` | Wrote `index()`, `post_detail()`, and four error handler functions |
| `blogapp/models.py` | Defined `Post` model with fields and custom method |
| `blogapp/admin.py` | Registered `Post` with admin |
| `blogapp/templates/base.html` | Created shared base layout |
| `blogapp/templates/index.html` | Created blog listing template; updated to extend `base.html` |
| `blogapp/templates/details.html` | Created single post template extending `base.html` |

## What Django Generated (You Didn't Touch These)

| File | Purpose |
|------|---------|
| `manage.py` | Command-line control centre |
| `blogapp/apps.py` | Contains `BlogappConfig`, referenced in `settings.py` |
| `blogapp/migrations/0001_initial.py` | Generated by `makemigrations` — describes the Post table |
| `db.sqlite3` | The database file — tables added by `migrate` |

---

## The Request Flow — End of Week 3

### Visiting the post listing (`/blog/`)

```
1. Browser sends GET /blog/

2. Project urls.py → path('blog/', ...) → blogapp/urls.py

3. App urls.py → path('', views.index) → views.index(request)

4. views.index():
   postsQuerySet = Post.objects.all()
   return render(request, 'index.html', {'posts': postsQuerySet})

5. index.html (extends base.html) renders all posts as HTML

6. Browser receives finished page
```

### Visiting an individual post (`/blog/3`)

```
1. Browser sends GET /blog/3

2. Project urls.py → path('blog/', ...) → blogapp/urls.py

3. App urls.py → path('<int:post_id>', views.post_detail)
   → views.post_detail(request, post_id=3)

4. views.post_detail():
   post = get_object_or_404(Post, id=3)
   return render(request, 'details.html', {'post': post})

5. details.html (extends base.html) renders the single post as HTML

6. Browser receives finished page
```

### Visiting a non-existent post (`/blog/999`)

```
1. Browser sends GET /blog/999

2. Routed to views.post_detail(request, post_id=999)

3. get_object_or_404(Post, id=999) → no match → raises 404

4. handler404 in project urls.py → views.error_404(request, exception)

5. Returns HttpResponse('Page not found.', status=404)
```

---

## Commands at a Glance

| Command | What It Did |
|---------|------------|
| `python3 -m pip install Django` | Installed Django |
| `django-admin startproject blogproject` | Created the project shell |
| `python3 manage.py startapp blogapp` | Created the blog app |
| `python3 manage.py migrate` | Created the database and built-in tables |
| `python3 manage.py makemigrations` | Generated migration file from your model |
| `python3 manage.py createsuperuser` | Created an admin login |
| `python3 manage.py runserver` | Started the local development server |
