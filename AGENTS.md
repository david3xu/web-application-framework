# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Purpose

Educational repository for **COMP3011/COMP6006: Web Application Frameworks** at Curtin University. Contains a working Django blog application and weekly lecture/lab documentation covering Django (weeks 1–3), Bootstrap (weeks 4–5), Express/Node.js (weeks 6–7), and React (weeks 8–10, with brief Socket.io and Axios+CORS tie-ins).

## Running the Django Application

```bash
# Activate virtual environment (from repo root)
source .venv/bin/activate

# Navigate to Django project
cd blogproject

# Run migrations
python manage.py migrate

# Start dev server (available at http://localhost:8000/blog)
python manage.py runserver

# Access Django admin at http://localhost:8000/admin
```

Django version: 4.2.7, database: SQLite3 (`blogproject/db.sqlite3`).

## Django App Architecture

The `blogproject/` directory contains a minimal blog app following Django MTV:

```
Request: /blog → blogproject/urls.py → blogapp/urls.py → views.index()
                                                            ↓
                                                     fetches Post objects
                                                            ↓
                                                   renders index.html template
```

- **Model** (`blogapp/models.py`): `Post` with fields `title`, `description`, `publication_date`, `tag`, `slug`; includes `is_before_covid()` helper method
- **View** (`blogapp/views.py`): single `index()` function that fetches all posts
- **Template** (`blogapp/templates/index.html`): iterates posts with Django template tags
- **Admin** (`blogapp/admin.py`): `Post` registered for CRUD via `/admin`

## Documentation Structure

Weekly materials live in `docs/`:

| Folder | Weeks | Content |
|--------|-------|---------|
| `docs/Django/` | 1–3 | Django MTV, ORM, URL routing, templates |
| `docs/Bootstrap/` | 4–5 | Grid system, responsive design, components |
| `docs/Express/` | 6–7 | Node.js, Express routing/middleware, Mongoose, Pug, REST |
| `docs/React/` | 8–10 | Components/state/events (8), composition/props/children (9), Router/Hooks/Axios (10). Week 8 also covers Socket.io pub/sub; Week 10 also covers CORS on Express. |

Each week has a `_lecture.md` (concept walkthrough) and a `_your_turn.md` (lab exercises with solutions).

## Course Progression Context

The course teaches the **architectural evolution** from monolithic server-side rendering (Django) to separated frontend/backend (React SPA + Express REST API). Week 6 materials explicitly frame this transition — when editing Express docs, maintain this comparative framing.
