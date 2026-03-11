# Web Application Frameworks (COMP3011/COMP 6006)
## Week 2 Lab Exercises: Django Models, Admin & Templates

*Copyright © 2025 Curtin University CRICOS Provider Code: 00301J*

---

## Before You Begin

Ensure you have completed last week's work before continuing. You should have:

- A Django project created (e.g. `blogproject`)
- A blog app created (`blogapp`)
- The app registered in `settings.py`
- A working `index` view returning `Hello World` at `/blog/`

---

## Exercise 1 — Defining the Model (5 min)

Before writing any code, plan your data structure on paper or in a document.

A typical blog post will contain the following information:

- **Post title** – self-explanatory
- **Description** – the content of the blog
- **Publication date** – self-explanatory
- **Tag** – a keyword describing the post
- **Slug** – a URL component for the blog post

Answer the following in your document:

1. What classes will you need, what fields will each have, and what types should those fields be?
2. Why do you need the `slug` attribute? What is the main benefit of using slugs?
3. Are there any other attributes you would like to store about a blog post?

---

## Exercise 2 — Creating the Django Model (10 min)

Open `blogapp/models.py` and update it to define your `Post` model.

Start with the following and complete the remaining attributes:

```python
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)
    # Add the remaining attributes here...
```

- Choose appropriate `max_length` values for text fields.
- Choose appropriate field types for each attribute.
- Refer to the Django field type reference: https://docs.djangoproject.com/en/5.1/topics/db/models/#fields

---

## Exercise 3 — Custom Model Method (5 min)

Custom methods can add useful functionality to model instances.

Add a method to your `Post` class that determines whether the post is **pre-COVID** (published on or before 10 Mar 2020) or **post-COVID**.

You will need to research how to do this. Start here:
https://docs.djangoproject.com/en/4.2/topics/db/models/#model-methods

---

## Exercise 4 — Migrations (5 min)

In your document, answer: **What is the purpose of migrations in Django?**

Then run the following commands to create and apply your migrations:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

Start the development server to confirm everything is working:

```bash
python3 manage.py runserver
```

> A **Page Not Found** error at `/` is still fine at this stage.

---

## Exercise 5 — Django Admin Interface (5 min)

Register your `Post` model with the admin app so you can manage posts through the interface.

Open `blogapp/admin.py` and update it:

```python
from django.contrib import admin
from .models import Post

admin.site.register(Post)
```

---

## Exercise 6 — Create a Superuser (5 min)

Stop the server (`CTRL+C`), then run:

```bash
python3 manage.py createsuperuser
```

Follow the prompts to set a username, email, and password. Then restart the server and navigate to http://127.0.0.1:8000/admin/ to log in and confirm your account works.

---

## Exercise 7 — Django Templates (10 min)

In your document:

1. **Describe how templates in Django work.** What is the template engine? What are the two key notations and what do they do?
2. **Design a mock-up** of how you want your blog posts to look. Use any tool you like. Make sure all attributes of your `Post` model are represented as they would appear on a real web page.

---

## Exercise 8 — Creating a Template (5 min)

Inside your `blogapp` directory, create a new folder called `templates`. Inside it, create a blank file called `index.html`.

Then open `blogapp/views.py` and update the `index` function:

```python
from django.shortcuts import render
from .models import Post

def index(request):
    postsQuerySet = Post.objects.all()
    return render(request, 'index.html', {'posts': postsQuerySet})
```

In your document, describe what `.objects.all()` does.

---

## Exercise 9 — Writing the Template (5 min)

Open `blogapp/templates/index.html` and write the HTML for your blog posts, based on your mock-up from Exercise 7.

Use the starter template at https://gist.github.com/cmalven/1885287 to ensure your HTML is valid. Your content goes between `<body>` and `</body>`, and add a descriptive title between `<title>` and `</title>`.

Use the following Django template notations to render dynamic content:

| Notation | Purpose | Example |
|----------|---------|---------|
| `{{ variable }}` | Outputs a value | `{{ post.title }}` |
| `{% tag %}` | Controls logic | `{% for post in posts %}` ... `{% endfor %}` |

---

## Exercise 10 — Test Your Site (5 min)

Start the development server:

```bash
python3 manage.py runserver
```

1. Go to http://127.0.0.1:8000/admin/ and manually add a few blog posts using the admin interface.
2. Navigate to http://127.0.0.1:8000/blog/ and confirm your posts are rendering correctly.
3. If something isn't right, check for errors in the terminal and correct them, then try again.

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `python3 manage.py makemigrations` | Generate migrations from model changes |
| `python3 manage.py migrate` | Apply migrations to the database |
| `python3 manage.py createsuperuser` | Create an admin user |
| `python3 manage.py runserver` | Start the local development server |
| http://127.0.0.1:8000/admin/ | Access the admin interface |
