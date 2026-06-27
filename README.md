# DIRFT Todo App

A full-stack Todo application built with an Angular frontend and a FastAPI backend.

This repository contains two main apps:

- `todo-backend/` — FastAPI service exposing a simple TODO REST API.
- `todo-frontend/` — Angular application that consumes the backend API.

## Project overview

- Backend: Python + FastAPI + Pydantic.
- Frontend: Angular 22 with server-side rendering support.
- Data store: in-memory dictionary for development and testing.
- API base path: `/api/todos`.

## Repository structure

- `todo-backend/`
  - `app.py` — FastAPI app and startup entry point.
  - `main.py` — exports the app object for import and deployment.
- `todo-frontend/`
  - `package.json` — Angular CLI scripts and dependencies.
  - `src/` — Angular application source code.

## Getting started

### Backend

1. Change to the backend folder:

```bash
cd todo-backend
```

2. Install Python dependencies (example):

```bash
python -m pip install fastapi uvicorn pydantic
```

3. Start the API server:

```bash
python app.py
```

4. Open the API in the browser or via curl:

```bash
http://127.0.0.1:8000/api/todos
```

### Frontend

1. Change to the frontend folder:

```bash
cd todo-frontend
```

2. Install Node dependencies:

```bash
npm install
```

3. Start the Angular dev server:

```bash
npm start
```

4. Open the app in the browser:

```bash
http://localhost:4200
```

> The frontend is configured to interact with the backend API running on `http://127.0.0.1:8000`.

## Available commands

From `todo-frontend/`:

- `npm start` — run the development server.
- `npm run build` — build the production bundle.
- `npm test` — run Angular unit tests.
- `npm run watch` — build in watch mode.

## Notes

- The backend stores todos in memory, so data is not persisted between restarts.
- Use the frontend and backend together for local development.
- See `todo-frontend/README.md` for additional frontend-specific instructions.

## License

This repository is available under the license defined in `LICENSE`.

