import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Nuevo ícono más bonito

const screenWidth = Dimensions.get('window').width;

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [userData, setUserData] = useState({
    fullName: 'Luis Pérez',
    email: 'luis.perez@example.com',
    role: 'Docente',
    photo: 'https://via.placeholder.com/150',
  });

  const [tempData, setTempData] = useState({ ...userData });

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalType(null);
    setModalVisible(false);
  };

  const saveChanges = () => {
    setUserData({ ...tempData });
    closeModal();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        {/* Título con icono más bonito */}
        <View style={styles.header}>
          <FontAwesome5 name="user-circle" size={26} color="#fff" style={{ marginRight: 10 }} />
          <Text style={styles.headerText}>Mi Perfil</Text>
        </View>

        <View style={styles.profileCard}>
          <Image source={{ uri: userData.photo }} style={styles.profilePhoto} />
          <Text style={styles.name}>{userData.fullName}</Text>
          <Text style={styles.email}>{userData.email}</Text>
          <Text style={styles.role}>{userData.role}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => openModal('edit')}>
            <MaterialIcons name="edit" size={20} color="#fff" />
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => openModal('password')}>
            <MaterialIcons name="lock" size={20} color="#1E90FF" />
            <Text style={[styles.buttonText, { color: '#1E90FF' }]}>Cambiar Contraseña</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {modalType === 'edit' && (
                <>
                  <Text style={styles.modalTitle}>Editar Perfil</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    value={tempData.fullName}
                    onChangeText={(text) => setTempData({ ...tempData, fullName: text })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={tempData.email}
                    onChangeText={(text) => setTempData({ ...tempData, email: text })}
                    keyboardType="email-address"
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                    <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                  </TouchableOpacity>
                </>
              )}

              {modalType === 'password' && (
                <>
                  <Text style={styles.modalTitle}>Cambiar Contraseña</Text>
                  <TextInput style={styles.input} placeholder="Contraseña actual" secureTextEntry />
                  <TextInput style={styles.input} placeholder="Nueva contraseña" secureTextEntry />
                  <TextInput style={styles.input} placeholder="Confirmar nueva contraseña" secureTextEntry />
                  <TouchableOpacity style={styles.saveButton} onPress={closeModal}>
                    <Text style={styles.saveButtonText}>Actualizar Contraseña</Text>
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  scrollViewContent: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 30,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#1E90FF',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  role: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
    marginTop: 8,
  },
  buttonGroup: {
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#1E90FF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E90FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#999',
    fontSize: 14,
  },
});
