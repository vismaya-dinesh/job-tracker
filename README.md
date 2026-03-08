# Job Tracker

A full-stack web application that helps users track job applications, manage interview stages, and keep notes about each opportunity in one place.

## Live Demo

Frontend: https://your-vercel-app.vercel.app
Backend API: https://job-tracker-17hi.onrender.com

## Features

* Add new job applications
* Update application status (Applied, Interview, Offer, etc.)
* Save application links and notes
* Edit or delete job entries
* View all job applications in a dashboard

## Tech Stack

Frontend:

* React (Vite)
* Axios
* Material UI

Backend:

* Flask
* Flask-SQLAlchemy
* Flask-CORS

Database:

* PostgreSQL (Render)

Deployment:

* Frontend hosted on Vercel
* Backend hosted on Render

## Project Structure

```
job-tracker
│
├── backend
│   ├── app.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── package.json
│   └── vite.config.js
```

## API Endpoints

GET `/jobs` – Fetch all jobs
POST `/jobs` – Add a new job
PUT `/jobs/:id` – Update job details
DELETE `/jobs/:id` – Delete a job

## Installation (Local Setup)

Clone the repository:

```
git clone https://github.com/yourusername/job-tracker.git
```

Backend setup:

```
cd backend
pip install -r requirements.txt
python app.py
```

Frontend setup:

```
cd frontend
npm install
npm run dev
```

## Future Improvements

* User authentication
* Interview calendar reminders
* Application analytics dashboard
