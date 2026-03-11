# Week 1 Review: What We Built and Where It Fits

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

By the end of Week 1, you had a working Django project running locally in your browser. This document maps everything you did — every command, every file you touched — back to the framework above so you can see exactly which part of the architecture you were building at each step.

Here is what the framework looked like **at the end of Week 1**:

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
│  views.py     ✅  index() returns HttpResponse("Hello World")  │
│                                                                 │
│  models.py    ⬜  introduced but not yet used                  │
│  templates/   ⬜  not yet created                              │
│  admin.py     ⬜  not yet configured                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
       │
       ▼
  User's Browser ◄── HTTP Response: "Hello World"
```

> ✅ = completed in Week 1 &nbsp;&nbsp; ⬜ = coming in later weeks

---

## Step 1 — Installing Django

**What you did:**

```bash
python3 -m pip install Django
```

**Where it fits:** This is a prerequisite — before anything else, Django needs to be installed on your machine. Without it, none of the `django-admin` or `manage.py` commands exist.

---

## Step 2 — Creating the Project

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
    ├── urls.py            ← top-level URL routing (untouched at this stage)
    ├── wsgi.py
    └── asgi.py
```

At this point you had a project shell, but no app and no pages yet.

---

## Step 3 — Creating the App

**What you did:**

```bash
python3 manage.py startapp blogapp
```

**Where it fits:** This created the **app-level** folder — the self-contained module that will handle your blog feature. Django generated:

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

## Step 4 — Registering the App with the Project

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

## Step 5 — Running the First Migration

**What you did:**

```bash
python3 manage.py migrate
```

**Where it fits:** Even before you define any of your own models, Django's built-in apps (admin, auth, sessions, etc.) need their own database tables. This command created the `db.sqlite3` database file and set those tables up.

```
blogproject/
├── db.sqlite3     ← created here for the first time
└── ...
```

Without this, the development server won't start cleanly. Your own models don't exist yet, so `makemigrations` was not needed at this stage.

---

## Step 6 — Starting the Development Server

**What you did:**

```bash
python3 manage.py runserver
```

**Where it fits:** This started Django's built-in local web server, making your project accessible at `http://127.0.0.1:8000/`. At this stage, visiting `/` showed Django's default welcome page because you hadn't defined any URL routes or views of your own yet.

---

## Step 7 — Writing the First View

**What you did:** Opened `blogapp/views.py` and wrote:

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello World")
```

**Where it fits:** This is the **View** — the first real logic in your app. The `index` function is a View function that:
- Takes the incoming `request` as a parameter
- Returns an `HttpResponse` with the text "Hello World"

At this point the function existed, but Django had no way to call it yet — there were no URL routes pointing to it.

---

## Step 8 — Creating the App's `urls.py`

**What you did:** Created a brand new file `blogapp/urls.py` (Django does not generate this for you):

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index')
]
```

**Where it fits:** This is the **app-level URL routing file**. It tells Django: "when someone requests the base URL of this app (i.e. `/blog/`), call `views.index`." The `''` (empty string) means no extra path beyond whatever prefix the project routes here.

---

## Step 9 — Connecting the App URLs to the Project

**What you did:** Opened `blogproject/urls.py` and updated it:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blogapp.urls'))   # ← you added this line
]
```

**Where it fits:** This is **connection point #2** — the **project-level URL routing file** now knows to forward any request starting with `blog/` down to `blogapp/urls.py`. Without this line, visiting `/blog/` would return a 404 error even though the app URL and view were correctly set up.

The two `urls.py` files work as a chain:

```
/blog/  →  project urls.py  →  blogapp/urls.py  →  views.index()
```

---

## Step 10 — Visiting the Page

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

## What You Touched in Week 1

| File | What You Did |
|------|-------------|
| `blogproject/settings.py` | Added `blogapp.apps.BlogappConfig` to `INSTALLED_APPS` |
| `blogproject/urls.py` | Added `path('blog/', include('blogapp.urls'))` |
| `blogapp/views.py` | Wrote the `index()` view function |
| `blogapp/urls.py` | Created from scratch — mapped `''` to `views.index` |

## What Django Generated (You Didn't Touch These)

| File | Purpose |
|------|---------|
| `manage.py` | Command-line control centre |
| `blogproject/settings.py` | Global config (you only edited it, didn't create it) |
| `blogapp/models.py` | Empty — ready for Week 2 |
| `blogapp/admin.py` | Empty — ready for Week 2 |
| `blogapp/apps.py` | Contains `BlogappConfig`, referenced in `settings.py` |
| `db.sqlite3` | Created by `migrate` — the database file |

---

## What's Still Missing (Coming in Week 2)

By the end of Week 1, three major parts of the Django framework were untouched:

**Models (`models.py`)** — you have an empty file. Week 2 will have you define the `Post` model with fields like `title`, `description`, `pub_date`, and `slug`.

**Templates (`templates/`)** — this folder doesn't even exist yet. Week 2 will have you create it and write HTML templates so your view returns a proper page instead of just a plain text string.

**Admin (`admin.py`)** — empty for now. Week 2 will have you register your `Post` model here so you can create and manage blog posts through Django's built-in admin interface.

---

## Week 1 Commands at a Glance

| Command | What It Did |
|---------|------------|
| `python3 -m pip install Django` | Installed Django on your machine |
| `django-admin startproject blogproject` | Created the project shell |
| `python3 manage.py startapp blogapp` | Created the blog app |
| `python3 manage.py migrate` | Created the database and built-in tables |
| `python3 manage.py runserver` | Started the local development server |
