import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.101.15:8000/api/users/register/";
const API_URL_GET = "http://192.168.101.15:8000/api/users/all/";
const API_URL_LOGIN = "http://192.168.101.15:8000/api/users/login/"

export async function obtenerUsuarios() {
    try {
        const token = await AsyncStorage.getItem('token'); 

        const response = await fetch(API_URL_GET, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + error.message);
    }
}



export async function createUsuarios(estudiante) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudiante),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }

    const newUsuario = await response.json();
    return newUsuario;
}

export async function loginUsuario(email, password) {
    const response = await fetch(API_URL_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Error al iniciar sesión");
    }

    await AsyncStorage.setItem('token', data.access);
    await AsyncStorage.setItem('refresh', data.refresh);

    return data;
}
