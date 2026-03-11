# Web Application Frameworks (COMP3011/COMP 6006)
## Week 1 Lab Exercises: Introduction to Django

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Before You Begin

There is no lab in the first week — these exercises are completed during the lecture itself. Work through each exercise in order. Do not run any commands you see in the lecture slides until you reach a **YOUR TURN** section.

When you see something in carets (e.g. `<projectname>`), replace it with a value of your choosing, including removing the carets themselves (i.e. `<projectname>` becomes `blogproject`).

---

## Exercise 1 — Practical Overview (5 min)

You will be building a personal blog website throughout this unit. At this stage the site will only have a blog feature, but other features such as videos and forums may be added later.

A blog is a list of articles (posts) published on a single website and organised by date. You can choose any theme you like — technology news, philosophy, reviews, travel, sport, etc.

Spend a few minutes thinking about what your blog will be about and write down some example post ideas on paper or in a document.

---

## Exercise 2 — Set Up Prerequisites: Part 1 (10 min)

This exercise assumes you have a code editor and Python 3 installed.

- If you are on a **Curtin lab machine**, these are already installed — skip to Exercise 3.
- If you are on your **own machine**, install the following:
  - **Visual Studio Code** (latest version) from https://code.visualstudio.com/
  - **Python 3.6 or later** from https://www.python.org/ — do not install from the Windows Store.

---

## Exercise 3 — Set Up Prerequisites: Part 2 (10 min)

Install Django using Python's package manager. Run the following command in your terminal:

```bash
python3 -m pip install Django
```

Notes:
- On some systems you may need to use `python` instead of `python3`.
- If you are on a **lab machine**, you will need to run this command each time you log in and want to use `django-admin`.
- On the **VDI**, all `django-admin` commands must be prefixed: use `~/.local/bin/django-admin` instead of `django-admin`.

---

## Exercise 4 — Creating a New Django Project: Part 1 (5 min)

Open a terminal. Use `pwd` to check your current location and `cd` to navigate to a folder where you want to store your work. On the VDI, use `/mnt/home/<yourID>` as your working directory so your files persist between sessions.

---

## Exercise 5 — Creating a New Django Project: Part 2 (5 min)

Once you are in the right folder, run the following command to create your Django project:

```bash
django-admin startproject <projectname>
```

A good name for your project would be `blogproject`. This command generates the initial folder structure for your project.

---

## Exercise 6 — Creating a New Django Project: Part 3 (5 min)

Change into your newly created project folder and list the files inside it:

```bash
cd <projectname>
ls -lR
```

On Windows, you can use `dir /s` instead of `ls -lR`.

---

## Exercise 7 — Creating a New Django Project: Part 4 (5 min)

Answer the following questions in a document or on paper:

1. What is the purpose of the `__init__.py` file?
2. What does the `settings.py` file do?
3. What is the purpose of the `urls.py` file?
4. Describe what the `wsgi.py` file does.
5. What does the `manage.py` file do?

---

## Exercise 8 — Creating the Blog App (5 min)

In your project directory, run the following command to create the blog app:

```bash
python3 manage.py startapp blogapp
```

Then list the directory contents to see the files Django generated:

```bash
ls -lR
```

Answer the following questions in your document:

1. Describe what the `admin.py` file does.
2. What does the `apps.py` file do?
3. What is the purpose of the `models.py` file?
4. What does the `tests.py` file do?
5. Describe what the `urls.py` file does.
6. What is the purpose of the `views.py` file?

---

## Exercise 9 — Starting the Web Server (5 min)

Before the server can run, Django needs a database. Run the following command from inside your project folder to create it:

```bash
python3 manage.py migrate
```

Then start the local development server:

```bash
python3 manage.py runserver
```

Navigate to http://127.0.0.1:8000/ in your browser. You should see Django's default welcome page.

---

## Exercise 10 — Connecting the App to the Project (5 min)

Django is not automatically aware of your blog app. Open `<projectname>/settings.py` and add your app to the `INSTALLED_APPS` list:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'blogapp.apps.BlogappConfig'
]
```

The config class name (`BlogappConfig`) comes from `blogapp/apps.py`, which Django generated when you ran `startapp`.

Run the web server again to confirm everything still works:

```bash
python3 manage.py runserver
```

---

## Exercise 11 — Creating a View (10 min)

In your document, describe the MVC architecture in your own words.

Then open `blogapp/views.py` and write an `index` function that returns a `Hello World` response:

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello World")
```

---

## Exercise 12 — Mapping Views to URLs: Part 1 (5 min)

Inside your `blogapp` directory, create a new file called `urls.py` and add the following:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index')
]
```

---

## Exercise 13 — Mapping Views to URLs: Part 2 (5 min)

Open the **project-level** `<projectname>/urls.py` file (not the one inside `blogapp`) and update it to include your app's URLs:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blogapp.urls'))
]
```

Start the web server and navigate to http://127.0.0.1:8000/blog/ in your browser:

```bash
python3 manage.py runserver
```

If everything is set up correctly, you should see a plain white page with **Hello World** on it.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `python3 -m pip install Django` | Install Django |
| `django-admin startproject <projectname>` | Create a new Django project |
| `python3 manage.py startapp <appname>` | Create a new app inside the project |
| `python3 manage.py migrate` | Create the database and apply built-in migrations |
| `python3 manage.py runserver` | Start the local development server |
| `python3 manage.py makemigrations` | Generate migration files from model changes |
| http://127.0.0.1:8000/blog/ | View your blog app in the browser |
