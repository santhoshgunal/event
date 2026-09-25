<<<<<<< HEAD
# Event Management System (Django + React)

Simple CRUD app. Only **GET** and **POST** routes are used (no PUT/PATCH/DELETE HTTP verbs) —
create, update and delete are all done via POST to dedicated URLs.

## API routes (Django)

| Method | URL                          | Purpose            |
|--------|-------------------------------|---------------------|
| GET    | /api/events/                 | list all events     |
| GET    | /api/events/<id>/             | get one event       |
| POST   | /api/events/add/              | create an event     |
| POST   | /api/events/update/<id>/      | update an event     |
| POST   | /api/events/delete/<id>/      | delete an event     |

## 1. Backend setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # on Windows: venv\Scripts\activate

pip install -r requirements.txt

cd eventmgmt
python manage.py makemigrations events
python manage.py migrate
python manage.py runserver
```

Django will run at **http://127.0.0.1:8000/**
Test it in the browser: http://127.0.0.1:8000/api/events/ (should show `[]`)

Optional: create an admin user to add events from Django admin too:
```bash
python manage.py createsuperuser
```

## 2. Frontend setup (React)

Open a **new terminal** (keep Django running):

```bash
cd frontend
npm install
npm start
```

React will run at **http://127.0.0.1:3000/** and talk to Django automatically.

## How it works

- `src/api.js` — every network call (GET/POST) lives here using axios.
- `src/App.js` — loads the event list on page load (GET) and passes data down.
- `src/components/EventForm.js` — one form used for both **Add** and **Update**
  (POST to different URLs depending on mode).
- `src/components/EventList.js` — renders events, with Edit/Delete buttons
  (Delete = POST to the delete route).

## Notes
- CORS is fully open (`CORS_ALLOW_ALL_ORIGINS = True`) for local development only —
  tighten this before deploying anywhere real.
- SQLite is used by default, so there's zero database setup needed.
=======
# event
>>>>>>> cf60adc91e58c51ca22c489e86acb5548af7d413
