import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://192.168.101.15:8000/api";

// Función general para peticiones con token
export async function fetchConToken(endpoint, options = {}) {
    const token = await AsyncStorage.getItem('token');

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
}

// Función para peticiones públicas (sin token)
export async function fetchSinToken(endpoint, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
}

// ===================== USUARIOS =====================

export async function obtenerUsuarios() {
    return fetchConToken('/users/all/');
}

export async function createUsuario(usuario) {
    return fetchSinToken('/users/register/', {
        method: 'POST',
        body: JSON.stringify(usuario),
    });
}

export async function loginUsuario(email, password) {
    return fetchSinToken('/users/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

// ===================== CURSOS =====================

export async function obtenerCursos() {
    return fetchConToken('/courses/', { method: 'GET' });
}

export async function createCourse(curso) {
    return fetchConToken('/courses/', {
        method: 'POST',
        body: JSON.stringify(curso),
    });
}


//============Semestres======================
export async function obtenerSemestres() {
    return fetchConToken('/semesters/', { method: 'GET' });
}
export async function createSemestre(semestre) {
    return fetchConToken('/semesters/', {
        method: 'POST',
        body: JSON.stringify(semestre),
    });
}
//=============cursoSemestre===============
export async function obtenerCursoSemestre() {
    return fetchConToken('/course-semesters/', { method: 'GET' });
}
export async function createCursoSemestre(cursoSemestre) {
    return fetchConToken('/course-semesters/', {
        method: 'POST',
        body: JSON.stringify(cursoSemestre),
    });
}

// ===================== ESTUDIANTES =====================

export async function obtenerEstudiantes() {
    return fetchConToken('/students/', { method: 'GET' });
}

export async function createEstudiante(estudiante) {
    return fetchConToken('/students/', {
        method: 'POST',
        body: JSON.stringify(estudiante),
    });
}

// ===================== Profesores =====================

export async function obtenerProfesores() {
    return fetchConToken('/teachers/', { method: 'GET' });
}

export async function createProfesores(profesor) {
    return fetchConToken('/teachers/', {
        method: 'POST',
        body: JSON.stringify(profesor),
    });
}

// ===================== cursoEstudiante =====================

export async function obtenerCursoEstudiantes() {
    return fetchConToken('/course-students/', { method: 'GET' });
}

export async function createcursoEstudiante(cursoEstudiante) {
    return fetchConToken('/course-students/', {
        method: 'POST',
        body: JSON.stringify(cursoEstudiante),
    });
}

// ===================== cursoProfesor =====================

export async function obtenerCursoProfesores() {
    return fetchConToken('/course-teachers/', { method: 'GET' });
}

export async function createcursoProfesor(cursoProfesor) {
    return fetchConToken('/course-teachers/', {
        method: 'POST',
        body: JSON.stringify(cursoProfesor),
    });
}

// ===================== Roles =====================

export async function obtenerRoles() {
    return fetchConToken('/roles/', { method: 'GET' });
}

export async function createRoles(rol) {
    return fetchConToken('/roles/', {
        method: 'POST',
        body: JSON.stringify(rol),
    });
}

