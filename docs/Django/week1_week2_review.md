# Weeks 1 & 2 Review: What We Built and Where It Fits

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
│  urls.py      ← app routing: "" → call views.index()           │
│       │                                                         │
│       ▼                                                         │
│  views.py     ← logic: fetch data, choose template             │
│       │                    │                                    │
│       ▼                    ▼                                    │
│  models.py            templates/index.html                      │
│  (ORM queries)        (HTML + Django tags)                      │
│       │                    │                                    │
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
| Project | `urls.py` | Receives requests, routes to the correct app |
| App | `urls.py` | Routes within the app to the correct View |
| App | `views.py` | Logic — fetches data, chooses template, returns response |
| App | `models.py` | Defines data structure, communicates with database |
| App | `templates/` | Presents data as HTML for the browser |
| App | `admin.py` | Registers models with the built-in admin interface |

Think of it like a restaurant: the project `urls.py` is the **front door**, the app `urls.py` is the **section host**, `views.py` is the **waiter**, `models.py` is the **kitchen**, and `templates/` is the **plating**.

---

## Overview

By the end of Week 2, you had a fully connected Django blog — with a real data model, a working admin interface, and an HTML template that renders live posts from the database. This document maps everything you did across both weeks back to the framework above, so you can see exactly which part of the architecture you were building at each step.

Here is what the framework looked like **at the end of Week 2**:

```
  User's Browser
       │
       │  HTTP Request (GET /blog/)
       ▼
┌─────────────────────────────────────────────────────────────────┐
│  PROJECT LEVEL  (blogproject/)                                  │
│                                                                 │
│  settings.py  ✅  registered blogapp                           │
│  urls.py      ✅  routes /blog/ → blogapp                      │
│                                                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  APP LEVEL  (blogapp/)                                          │
│                                                                 │
│  urls.py      ✅  maps "" → views.index                        │
│  views.py     ✅  index() fetches all Posts, renders template  │
│  models.py    ✅  Post model defined and migrated              │
│  admin.py     ✅  Post registered with admin interface         │
│                                                                 │
│  templates/index.html  ✅  renders posts as HTML               │
│                                                                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
                      db.sqlite3
                  (Post table exists,
                   rows added via admin)
                           │
                           ▼
  User's Browser ◄── HTTP Response (rendered blog page)
```

> ✅ = completed by end of Week 2

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

**Where it fits:** This created the **project-level** container — the outer shell of your entire web application. Django generated this folder structure for you:

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

At this point you had a project shell, but no app and no pages yet.

---

### Step 3 — Creating the App

**What you did:**

```bash
python3 manage.py startapp blogapp
```

**Where it fits:** This created the **app-level** folder — the self-contained module that handles your blog feature. Django generated:

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

The app existed on disk, but Django didn't know about it yet — and there were no pages to visit.

---

### Step 4 — Registering the App with the Project

**What you did:** Opened `blogproject/settings.py` and added your app to `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blogapp.apps.BlogappConfig',   # ← you added this line
]
```

**Where it fits:** This is **connection point #1** between the project and the app. Until this line exists, Django ignores your app entirely — it won't find your models, templates, or any other app files.

The class name `BlogappConfig` comes from `blogapp/apps.py`, which Django auto-generated in Step 3.

---

### Step 5 — Running the First Migration

**What you did:**

```bash
python3 manage.py migrate
```

**Where it fits:** Django's built-in apps (admin, auth, sessions, etc.) need their own database tables before the server will start cleanly. This command created `db.sqlite3` and set those tables up. Your own models don't exist yet, so `makemigrations` was not needed at this stage.

---

### Step 6 — Starting the Development Server

**What you did:**

```bash
python3 manage.py runserver
```

**Where it fits:** This started Django's built-in local web server at `http://127.0.0.1:8000/`. At this stage, visiting `/` showed Django's default welcome page because you hadn't defined any URL routes or views of your own yet.

---

### Step 7 — Writing the First View

**What you did:** Opened `blogapp/views.py` and wrote:

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello World")
```

**Where it fits:** This is the **View** — the first real logic in your app. The `index` function takes the incoming `request` and returns a plain text `HttpResponse`. At this point the function existed, but Django had no way to call it yet — there were no URL routes pointing to it.

---

### Step 8 — Creating the App's `urls.py`

**What you did:** Created a brand new file `blogapp/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index')
]
```

**Where it fits:** This is the **app-level URL routing file**. It tells Django: "when someone requests the base URL of this app (i.e. `/blog/`), call `views.index`." The `''` (empty string) means no extra path beyond whatever prefix the project routes here.

---

### Step 9 — Connecting the App URLs to the Project

**What you did:** Opened `blogproject/urls.py` and updated it:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blogapp.urls'))   # ← you added this line
]
```

**Where it fits:** This is **connection point #2**. The project-level URL file now forwards any request starting with `blog/` down to `blogapp/urls.py`. The two files work as a chain:

```
/blog/  →  project urls.py  →  blogapp/urls.py  →  views.index()
```

Without this line, visiting `/blog/` would return a 404 even though the app URL and view were correctly set up.

---

### Step 10 — Visiting the Page

**What you did:** Navigated to `http://127.0.0.1:8000/blog/` in your browser.

**What happened, traced through the framework:**

```
1. Browser sends GET /blog/

2. Project urls.py:
   path('blog/', include('blogapp.urls'))
   → matches, hands off to blogapp/urls.py

3. App urls.py:
   path('', views.index, name='index')
   → matches, calls views.index(request)

4. views.index() runs:
   return HttpResponse("Hello World")

5. Django sends "Hello World" back to the browser
```

**Result:** A blank page with "Hello World" — your first working Django page. ✅

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

**Where it fits:** This is the **Model** — the data layer of the MTV architecture. Each attribute maps to a column in the database. Django's ORM means you describe your data as a Python class, and Django handles all the SQL for you.

A slug is a URL-friendly version of a string — e.g. a post titled "My First Post" gets a slug of `my-first-post`. Using slugs in URLs is cleaner and more readable than using numeric IDs.

---

### Step 12 — Adding a Custom Model Method

**What you did:** Added a method to the `Post` class:

```python
import datetime
from django.utils import timezone

def is_pre_covid(self):
    covid_date = datetime.date(2020, 3, 10)
    return self.pub_date.date() <= covid_date
```

**Where it fits:** Custom methods add behaviour to individual model instances. Rather than writing this logic in a view or template every time you need it, you attach it directly to the model — keeping the data layer responsible for its own logic.

---

### Step 13 — Creating and Running Migrations

**What you did:**

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

**Where it fits:** Migrations are how Django keeps the database in sync with your models. `makemigrations` inspects your `models.py` and generates a migration file describing the changes needed. `migrate` applies those changes to the actual database — in this case, creating the `blogapp_post` table.

```
blogapp/
└── migrations/
    ├── __init__.py
    └── 0001_initial.py    ← generated by makemigrations
```

Without running migrations, the database has no `Post` table and any attempt to query posts will fail.

---

### Step 14 — Registering the Post Model with Admin

**What you did:** Opened `blogapp/admin.py` and updated it:

```python
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```

**Where it fits:** Django's admin interface is built-in, but it doesn't know about your models until you register them. This single call tells the admin app to expose `Post` for CRUD operations — create, read, update, and delete.

---

### Step 15 — Creating a Superuser

**What you did:**

```bash
python3 manage.py createsuperuser
```

**Where it fits:** The admin interface requires authentication. This command created an admin account (username, email, password) that lets you log in at `http://127.0.0.1:8000/admin/`. Once logged in, you could create `Post` instances directly through the browser — without writing any HTML forms.

---

### Step 16 — Updating the View to Fetch Posts

**What you did:** Opened `blogapp/views.py` and replaced the `index` function:

```python
from django.shortcuts import render
from .models import Post

def index(request):
    postsQuerySet = Post.objects.all()
    return render(request, 'index.html', {'posts': postsQuerySet})
```

**Where it fits:** The view now does three things: queries the database for all `Post` objects, passes them to a template as context, and returns the rendered HTML. This is the full View responsibility in the MTV pattern.

`Post.objects.all()` returns a QuerySet — a collection of all rows in the `Post` table. The `render` function takes the request, the template name, and a dictionary of data to make available inside the template.

---

### Step 17 — Creating the Templates Folder and `index.html`

**What you did:** Created the folder `blogapp/templates/` and a new file `blogapp/templates/index.html`.

```
blogapp/
└── templates/
    └── index.html    ← your blog listing template
```

**Where it fits:** This is the **Template** — the presentation layer of MTV. The `templates/` folder is where Django looks for HTML files. The template uses two special notations:

| Notation | Purpose | Example |
|----------|---------|---------|
| `{{ variable }}` | Outputs a value | `{{ post.title }}` |
| `{% tag %}` | Controls logic | `{% for post in posts %}` |

A typical `index.html` loops over all posts and renders each one:

```html
{% for post in posts %}
<div>
  <h2>{{ post.title }}</h2>
  <p>{{ post.pub_date }}</p>
  <p>{{ post.description }}</p>
</div>
{% endfor %}
```

---

### Step 18 — Testing the Full Stack

**What you did:**

1. Started the development server: `python3 manage.py runserver`
2. Logged in to `http://127.0.0.1:8000/admin/` and created some blog posts.
3. Navigated to `http://127.0.0.1:8000/blog/` and confirmed the posts appeared.

**What happened, traced through the full framework:**

```
1. Browser sends GET /blog/

2. Project urls.py:
   path('blog/', include('blogapp.urls'))
   → hands off to blogapp/urls.py

3. App urls.py:
   path('', views.index, name='index')
   → calls views.index(request)

4. views.index() runs:
   postsQuerySet = Post.objects.all()
   → queries db.sqlite3, retrieves all Post rows

5. render(request, 'index.html', {'posts': postsQuerySet})
   → Django fills in the template with real post data

6. Finished HTML sent back to the browser
```

**Result:** A real blog page showing posts pulled from the database. ✅

---

## What You Touched Across Both Weeks

| File | What You Did |
|------|-------------|
| `blogproject/settings.py` | Added `blogapp.apps.BlogappConfig` to `INSTALLED_APPS` |
| `blogproject/urls.py` | Added `path('blog/', include('blogapp.urls'))` |
| `blogapp/views.py` | Wrote `index()` — first as `HttpResponse`, then updated to fetch posts and render a template |
| `blogapp/urls.py` | Created from scratch — mapped `''` to `views.index` |
| `blogapp/models.py` | Defined the `Post` model with all its fields and a custom method |
| `blogapp/admin.py` | Registered `Post` with `admin.site.register(Post)` |
| `blogapp/templates/index.html` | Created the blog listing template |

## What Django Generated (You Didn't Touch These)

| File | Purpose |
|------|---------|
| `manage.py` | Command-line control centre |
| `blogapp/apps.py` | Contains `BlogappConfig`, referenced in `settings.py` |
| `blogapp/migrations/0001_initial.py` | Generated by `makemigrations` — describes the Post table |
| `db.sqlite3` | The database file — tables added by `migrate` |

---

## What's Still Missing (Coming in Week 3)

By the end of Week 2, every part of the core Django architecture is in place. Week 3 extends it with more advanced features:

**Individual post pages** — right now, `/blog/` shows all posts. Week 3 adds a `post_detail` view and a `details.html` template so each post can be accessed at its own URL, e.g. `/blog/1`.

**URL parameters** — to make individual post pages work, you will add a dynamic URL pattern (`<int:post_id>`) and learn how Django extracts values from URLs and passes them to view functions.

**Template inheritance** — rather than duplicating common HTML across `index.html` and `details.html`, you will create a `base.html` and have both templates extend it.

**Error handling** — you will add `get_object_or_404` so that requesting a non-existent post returns a proper 404 page rather than a server error.

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
