import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Alert, StyleSheet, SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createUsuarios } from "../api/servicesUsuarios";
import ModalMensaje from '../components/ModalComponente';
import { obtenerUsuarios } from '../api/servicesUsuarios';

export default function RegisterScreen({ navigation, route }) {
    const { rol = 2 } = route.params || {};



    //Formulario
    const [idUser, setIdUser] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMensaje, setModalMensaje] = useState({
        tipo: '',
        titulo: '',
        subtitulo: ''
    });

    const [showPassword, setShowPassword] = useState(false);



    const handleRegister = async () => {
        if (!idUser.trim() || !nombre.trim() || !apellido.trim() || !email.trim() || !password.trim() || !status.trim()) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error',
                subtitulo: 'Completa Todos Los Campos',
            });
            setModalVisible(true);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error',
                subtitulo: 'Correo No Válido',
            });
            setModalVisible(true);
            return;
        }

        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error',
                subtitulo: 'La Contraseña Debe Tener Al menos 8 Caracteres y un caracter Especial',
            });
            setModalVisible(true);
            return;
        }
        const usuariosExistentes = await obtenerUsuarios();

        // Validar ID duplicado
        const idExistente = usuariosExistentes.some(u => u.id_user === parseInt(idUser));
        if (idExistente) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'ID Duplicado',
                subtitulo: 'Ya existe un usuario con ese ID.',
            });
            setModalVisible(true);
            return;
        }

        // Validar email duplicado
        const emailExistente = usuariosExistentes.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (emailExistente) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Correo ya registrado',
                subtitulo: 'Ya existe un usuario con ese correo electrónico.',
            });
            setModalVisible(true);
            return;
        }

        const userData = {
            id_user: parseInt(idUser),
            name: nombre,
            last_name: apellido,
            email,
            password,
            status,
            id_role: rol,
        };

        try {
            await createUsuarios(userData);
            setModalMensaje({
                tipo: 'exito',
                titulo: '¡Registro exitoso!',
                subtitulo: `Usuario ${nombre} ${apellido} registrado correctamente.`,
            });
            setModalVisible(true);

            setIdUser('');
            setNombre('');
            setApellido('');
            setEmail('');
            setPassword('');
            setStatus('');
        } catch (error) {
            setModalMensaje({
                tipo: 'error',
                titulo: 'Error',
                subtitulo: 'No Se pudo completar el registro: ' + error.message,
            });
            setModalVisible(true);
            console.error('Error al registrar usuario:', error.message);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        if (modalMensaje.tipo === 'exito') {
            navigation.navigate('Login')
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>EIS-SINTEM</Text>
            </View>

            <Text style={styles.title}><Icon name="person" size={30} color="#3376ff" style={styles.inputIcon} /> SING UP</Text>

            {[
                { icon: 'person', placeholder: 'ID Usuario', value: idUser, onChange: setIdUser, type: 'numeric' },
                { icon: 'badge', placeholder: 'Nombre', value: nombre, onChange: setNombre },
                { icon: 'person-outline', placeholder: 'Apellido', value: apellido, onChange: setApellido },
                { icon: 'email', placeholder: 'Correo electrónico', value: email, onChange: setEmail, type: 'email-address' },
                { icon: 'verified-user', placeholder: 'Estado', value: status, onChange: setStatus },
            ].map((input, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Icon name={input.icon} size={20} color="#3376ff" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder={input.placeholder}
                        keyboardType={input.type}
                        secureTextEntry={input.secure}
                        value={input.value}
                        onChangeText={input.onChange}
                    />
                </View>
            ))}
            {/* Campo de contraseña */}
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#3376ff" style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="Contraseña"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <Icon
                    name={showPassword ? 'visibility-off' : 'visibility'}
                    size={20}
                    color="#888"
                    onPress={() => setShowPassword(!showPassword)}
                />
            </View>


            <CustomButton title="Registrarse" onPress={handleRegister} />

            <View style={styles.linkContainer}>
                <Icon name="login" size={20} color="#1E90FF" />
                <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                    ¿Ya tienes cuenta? Inicia sesión aquí
                </Text>
            </View>

            <ModalMensaje
                visible={modalVisible}
                tipo={modalMensaje.tipo}
                titulo={modalMensaje.titulo}
                subtitulo={modalMensaje.subtitulo}
                onClose={handleCloseModal}
                autoClose={true}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f9fc',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logoText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#3376ff',
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        color: '#3376ff',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 12,
        elevation: 2,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 16,
        color: '#333',
    },
    linkContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        marginLeft: 5,
        color: '#1E90FF',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
