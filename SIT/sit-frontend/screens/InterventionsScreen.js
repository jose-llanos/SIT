import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

export default function InterventionsScreen({ navigation }) {
  const [date, setDate] = useState('');
  const [interventionType, setInterventionType] = useState('');
  const [comments, setComments] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const interventionOptions = ['Tutoría', 'Llamada', 'Reunión', 'Otro'];

  const handleSave = () => {
    setModalMessage('✅ Intervención guardada exitosamente.');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        <Icon name="document-text-outline" size={26} color="#1E90FF" /> Nueva Intervención
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          <Icon name="calendar-outline" size={18} /> Fecha:
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="DD/MM/AAAA"
          value={date}
          onChangeText={setDate}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          <Icon name="options-outline" size={18} /> Tipo de intervención:
        </Text>
        <View style={styles.selectContainer}>
          {interventionOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.selectOption,
                interventionType === option && styles.selectOptionActive,
              ]}
              onPress={() => setInterventionType(option)}
            >
              <Text
                style={[
                  styles.selectOptionText,
                  interventionType === option && styles.selectOptionTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          <Icon name="chatbubble-ellipses-outline" size={18} /> Comentarios / Observaciones:
        </Text>
        <TextInput
          style={styles.textArea}
          placeholder="Escribe tus observaciones aquí..."
          value={comments}
          onChangeText={setComments}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon name="checkmark-circle-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Icon name="close-circle-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Icon name="checkmark-done-circle-outline" size={40} color="#1E90FF" />
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f6f9',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  selectOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectOptionActive: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
  selectOptionText: {
    fontSize: 14,
    color: '#333',
  },
  selectOptionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 25,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF5C5C',
    padding: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    width: screenWidth - 60,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginVertical: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
