import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

export default function ModalMensaje({ visible, tipo, titulo, subtitulo, onClose, autoClose = false }) {
    const tipoNormalizado = (tipo || '').toLowerCase();
    const icono = tipoNormalizado === 'exito' || tipoNormalizado === 'success' ? 'check-circle' : 'error';
    const color = tipoNormalizado === 'exito' || tipoNormalizado === 'success' ? '#4CAF50' : '#F44336';

    const scaleAnim = useRef(new Animated.Value(0)).current;



    useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 5,
            }).start();

            // Vibración leve
            Haptics.notificationAsync(
                tipo === 'exito'
                    ? Haptics.NotificationFeedbackType.Success
                    : Haptics.NotificationFeedbackType.Error
            );

            // Cierre automático
            if (autoClose) {
                setTimeout(() => {
                    onClose();
                }, 3000);
            }
        } else {
            scaleAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal animationType="none" transparent visible={visible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <Icon name={icono} size={60} color={color} style={styles.icono} />
                    <Text style={[styles.titulo, { color }]}>{titulo}</Text>
                    <Text style={styles.subtitulo}>{subtitulo}</Text>
                    <TouchableOpacity
                        style={[styles.boton, { backgroundColor: color }]}
                        onPress={onClose}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.textoBoton}>Aceptar</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
        elevation: 8,
    },
    icono: {
        marginBottom: 10,
    },
    titulo: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitulo: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        marginBottom: 20,
    },
    boton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        elevation: 2,
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
