<h1 align="center">📚 Academic Platform API</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Django-4.x-green?style=for-the-badge&logo=django">
  <img src="https://img.shields.io/badge/DRF-3.14-blue?style=for-the-badge&logo=python">
  <img src="https://img.shields.io/badge/Swagger-UI-yellowgreen?style=for-the-badge&logo=swagger">
  <img src="https://img.shields.io/badge/Redoc-ready-orange?style=for-the-badge">
</p>

<p align="center">
  <strong>A microservices-friendly Django REST API to manage courses, semesters, students, and teachers.</strong>
</p>

<p align="center">
  <a href="#-api-documentation">📖 Documentation</a> •
  <a href="#-installation--setup">⚙️ Setup</a> •
  <a href="#-project-structure">📁 Structure</a>
</p>

<hr/>

# 📚 Academic Platform - Microservices API

This project is a RESTful API built with Django and Django REST Framework to manage an academic platform. It handles courses, students, semesters, teachers, and their relations. It also includes interactive documentation via Swagger and Redoc.

---

## 🚀 Main Features

- CRUD for:
  - Courses
  - Semesters
  - Students
  - Teachers
  - Course-Semester relationships
- Interactive documentation with Swagger and Redoc
- Modular and extensible architecture
- Swagger endpoints grouped by tags for easy navigation

---

## ⚙️ Tech Stack

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [drf-yasg (Swagger)](https://github.com/axnsan12/drf-yasg)
- [Redoc](https://github.com/Redocly/redoc)

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```

### 2. Create a virtual environment

```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply migrations

```bash
python manage.py migrate
```

### 5. Run the server

```bash
python manage.py runserver
```

---

## 📑 API Documentation

Once running, access the documentation at:

- Swagger UI: [http://localhost:8000/swagger/](http://localhost:8000/swagger/)
- Redoc: [http://localhost:8000/redoc/](http://localhost:8000/redoc/)
- JSON Schema: [http://localhost:8000/swagger.json](http://localhost:8000/swagger.json)

---

## 🧪 Main Endpoints

| Resource               | Base Endpoint              |
|------------------------|----------------------------|
| Courses                | `/api/courses/`            |
| Semesters              | `/api/semesters/`          |
| Students               | `/api/students/`           |
| Teachers               | `/api/teachers/`           |
| Courses by Semester    | `/api/course-semesters/`   |

---

## 📁 Project Structure

```bash
microservices_project/
│
├── academics/              # Main app
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   └── urls.py
│
├── microservices_project/  # Project settings
│   └── urls.py
│
├── manage.py
└── README.md
```

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

