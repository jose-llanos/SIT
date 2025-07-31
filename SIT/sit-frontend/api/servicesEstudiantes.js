import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.101.15:8000/api/students/";

export async function obtenerEstudiantes() {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await fetch(API_URL, {
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

        return await response.json();
    } catch (error) {
        throw new Error('Error al obtener los estudiantes: ' + error.message);
    }
}


const loginUsuario = async (email, password) => {
    const response = await fetch(API_URL, {
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
    return data;
};