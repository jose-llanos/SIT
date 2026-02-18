import AsyncStorage from '@react-native-async-storage/async-storage';

export async function verificarSesion() {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error verificando sesión:', error);
        return false;
    }
}
