::: {align="center"}
# 🚀 TaskPilot AI

### AI-Powered Project Manager Assistant

Turn unstructured meeting notes and documents into **clean, structured,
actionable tasks** with AI.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Tailwind
CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](#license)
:::

------------------------------------------------------------------------

## 📌 Overview

**TaskPilot AI** is a full-stack AI-powered project management assistant
that converts meeting notes, documents, and unstructured text into
useful, structured tasks.

Instead of manually reading meeting notes and creating tasks one by one,
TaskPilot processes the input through an AI pipeline and generates tasks
containing information such as:

-   📝 Task title
-   👤 Owner
-   📅 Deadline
-   🔥 Priority
-   📊 Status

Users can then review, edit, filter, delete, and export their tasks.

------------------------------------------------------------------------

## ✨ Features

### 🤖 AI Task Generation

-   Paste meeting notes directly into the application
-   Upload `.txt`, `.pdf`, or `.docx` files
-   Automatically detect action items
-   Extract task owners
-   Infer deadlines
-   Assign task priorities

### 🧠 Multi-Stage AI Pipeline

``` text
Meeting Notes / Document
          ↓
     Text Extraction
          ↓
 Action Item Detection
          ↓
 Structured Task Extraction
          ↓
   Python Cleanup Layer
          ↓
   Pydantic Validation
          ↓
    SQLite Database
          ↓
      Task Dashboard
```

The multi-stage approach separates **understanding** from
**structuring**, helping produce cleaner and more reliable task data.

### 🔄 Multiple AI Providers

TaskPilot supports multiple AI providers:

``` text
Groq
  ↓
Gemini
  ↓
Ollama
```

If one provider is unavailable, the application can fall back to another
configured provider.

### 📡 Real-Time Processing

TaskPilot uses **Server-Sent Events (SSE)** to show processing progress
in real time.

``` text
Reading File
     ↓
Extracting Text
     ↓
Detecting Action Items
     ↓
Calling AI Provider
     ↓
Parsing Response
     ↓
Validating Tasks
     ↓
Saving Tasks
     ↓
Completed
```

### 🗂 Task Management

-   View tasks
-   Edit tasks
-   Delete tasks
-   Filter tasks
-   Filter by owner
-   Filter by priority
-   Filter by status
-   Export tasks as JSON

### ♻️ Smart Deduplication

Submitted content can be normalized and hashed using SHA-256 to avoid
unnecessarily processing identical input multiple times.

------------------------------------------------------------------------

## 🛠️ Tech Stack

  Layer             Technology
  ----------------- -------------------------------------
  Frontend          React 19, Vite, Tailwind CSS, Axios
  Backend           FastAPI, Uvicorn, Python
  Database          SQLite, SQLAlchemy, aiosqlite
  Validation        Pydantic
  AI                Groq, Google Gemini, Ollama
  File Processing   pypdf, python-docx
  Communication     REST API + SSE
  Configuration     python-dotenv, pydantic-settings

------------------------------------------------------------------------

## 📁 Project Structure

``` text
TaskPilot AI/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── providers/
│   │   ├── repository/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── prompts/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── .env.example
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
├── .gitignore
└── README.md
```

------------------------------------------------------------------------

## 🚀 Getting Started

### Prerequisites

Install:

-   Python 3.11+
-   Node.js
-   npm
-   Git
-   An API key for Groq or Gemini if you want to use those providers
-   Ollama if you want to use a local AI provider

### 1. Clone the repository

``` bash
git clone https://github.com/SumitPrajapati03/taskpilot.git
cd taskpilot
```

### 2. Setup Backend

``` bash
cd backend
python -m venv .venv
```

#### Windows

``` powershell
.venv\Scripts\Activate.ps1
```

#### macOS / Linux

``` bash
source .venv/bin/activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create:

``` text
backend/.env
```

Add:

``` env
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
OLLAMA_BASE_URL=http://localhost:11434

DATABASE_URL=sqlite+aiosqlite:///./taskpilot.db

ENV=development
```

You can use `backend/.env.example` as a reference.

> ⚠️ Never upload your real API keys to GitHub.

### 4. Start Backend

From the `backend` folder:

``` bash
uvicorn app.main:app --reload
```

Backend:

``` text
http://127.0.0.1:8000
```

FastAPI documentation:

``` text
http://127.0.0.1:8000/docs
```

### 5. Start Frontend

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

Vite will provide the frontend URL, normally:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

## 🔐 Environment Variables

  Variable            Purpose
  ------------------- ----------------------------------
  `GROQ_API_KEY`      Groq API authentication
  `GEMINI_API_KEY`    Google Gemini API authentication
  `OLLAMA_BASE_URL`   Local Ollama server URL
  `DATABASE_URL`      SQLite database connection
  `ENV`               Application environment

------------------------------------------------------------------------

## 📡 API Endpoints

  Method     Endpoint               Description
  ---------- ---------------------- ----------------------------
  `GET`      `/health`              Check API status
  `POST`     `/generate`            Generate tasks from input
  `GET`      `/progress/{job_id}`   Stream processing progress
  `GET`      `/tasks`               Retrieve tasks
  `PUT`      `/tasks/{task_id}`     Update a task
  `DELETE`   `/tasks/{task_id}`     Delete a task
  `GET`      `/tasks/export/json`   Export tasks as JSON

For complete request and response schemas, open the FastAPI Swagger UI
at `/docs`.

------------------------------------------------------------------------

## 🧩 How It Works

### Step 1 --- Input

The user enters meeting notes or uploads a document.

### Step 2 --- Text Extraction

The backend extracts text from the uploaded file.

### Step 3 --- AI Processing

The AI identifies meaningful action items.

### Step 4 --- Task Creation

The action items are converted into structured task information.

### Step 5 --- Validation

Pydantic validates the generated data.

### Step 6 --- Database

Valid tasks are stored in SQLite.

### Step 7 --- Dashboard

The React frontend displays the generated tasks.

``` text
User
 │
 ▼
React Frontend
 │
 ▼
FastAPI Backend
 │
 ▼
Text Extraction
 │
 ▼
AI Providers
 │
 ▼
Task Processing
 │
 ▼
Validation
 │
 ▼
SQLite
 │
 ▼
Task Dashboard
```

------------------------------------------------------------------------

## 🎯 Why TaskPilot?

Meeting discussions often contain important tasks hidden inside long
conversations.

For example:

> "We should probably update the landing page before the next release."

TaskPilot can transform this type of statement into a structured task:

``` json
{
  "title": "Update the landing page",
  "priority": "Medium",
  "status": "Pending"
}
```

This reduces manual work and helps teams avoid missing important action
items.

------------------------------------------------------------------------

## 🔮 Future Improvements

-   [ ] User authentication
-   [ ] Multi-user workspaces
-   [ ] PostgreSQL support
-   [ ] Redis background jobs
-   [ ] Docker / Docker Compose
-   [ ] Calendar integration
-   [ ] Jira integration
-   [ ] Trello integration
-   [ ] Team collaboration
-   [ ] Automated testing
-   [ ] CI/CD pipeline
-   [ ] Production monitoring

------------------------------------------------------------------------

## 👨‍💻 Author

### Sumit Prajapati

Computer Engineering Student 

GitHub:\
https://github.com/SumitPrajapati03

------------------------------------------------------------------------

## 📄 License

This project is licensed under the **MIT License**.

------------------------------------------------------------------------

::: {align="center"}
### ⭐ If you like this project, consider giving it a star!
:::
