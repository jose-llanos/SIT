import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, Dimensions, ScrollView
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function TutoringScreen() {
  const [tutoringSchedules, setTutoringSchedules] = useState([
    {
      id: '1',
      day: 'Lunes',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      modality: 'Presencial',
      attendees: [
        { id: 's1', name: 'Luis Pérez', riskLevel: 'Alto' },
        { id: 's2', name: 'Ana García', riskLevel: 'Medio' },
      ],
    },
    {
      id: '2',
      day: 'Miércoles',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      modality: 'Virtual',
      attendees: [
        { id: 's3', name: 'Carlos Ramírez', riskLevel: 'Bajo' },
      ],
    },
  ]);

  const [studentsToAttend, setStudentsToAttend] = useState([
    { id: 's1', name: 'Luis Pérez', riskLevel: 'Alto' },
    { id: 's2', name: 'Ana García', riskLevel: 'Medio' },
    { id: 's3', name: 'Carlos Ramírez', riskLevel: 'Bajo' },
    { id: 's4', name: 'María López', riskLevel: 'Alto' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const openModal = (schedule) => {
    setSelectedSchedule(schedule);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedSchedule(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🗓️ Horario de Tutorías</Text>

      <FlatList
        data={tutoringSchedules}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.time}>{item.startTime} - {item.endTime}</Text>
            <Text style={styles.modality}>Modalidad: {item.modality}</Text>
            <TouchableOpacity style={styles.attendeesButton} onPress={() => openModal(item)}>
              <Text style={styles.attendeesButtonText}>Ver Asistencia ({item.attendees.length})</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal Bonito */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>👥 Asistencia - {selectedSchedule?.day}</Text>
            <ScrollView style={styles.attendeeList}>
              {selectedSchedule?.attendees.map((attendee, index) => (
                <View
                  key={attendee.id}
                  style={[
                    styles.modalRow,
                    { backgroundColor: index % 2 === 0 ? '#f1f9ff' : '#fff' },
                  ]}
                >
                  <Text style={styles.modalName}>{attendee.name}</Text>
                  <Text
                    style={[
                      styles.modalRisk,
                      attendee.riskLevel === 'Alto'
                        ? styles.riskHigh
                        : attendee.riskLevel === 'Medio'
                          ? styles.riskMedium
                          : styles.riskLow,
                    ]}
                  >
                    {attendee.riskLevel}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tabla de estudiantes sugeridos */}
      <View style={styles.tableSection}>
        <Text style={styles.sectionTitle}>📌 Estudiantes que Deberían Asistir</Text>
        {studentsToAttend.map((student, index) => (
          <View
            key={student.id}
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#f0f8ff' : '#fff' },
            ]}
          >
            <Text style={styles.tableCell}>{student.name}</Text>
            <Text
              style={[
                styles.tableCell,
                student.riskLevel === 'Alto'
                  ? styles.riskHigh
                  : student.riskLevel === 'Medio'
                    ? styles.riskMedium
                    : styles.riskLow,
              ]}
            >
              {student.riskLevel}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef6fb',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007ACC',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  modality: {
    fontSize: 15,
    color: '#888',
    marginTop: 4,
  },
  attendeesButton: {
    marginTop: 12,
    backgroundColor: '#007ACC',
    paddingVertical: 10,
    borderRadius: 8,
  },
  attendeesButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: screenWidth - 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007ACC',
    textAlign: 'center',
    marginBottom: 15,
  },
  attendeeList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalName: {
    fontSize: 16,
    color: '#333',
  },
  modalRisk: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#007ACC',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableSection: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    fontSize: 16,
    color: '#444',
  },
  riskHigh: {
    color: '#FF4C4C',
    fontWeight: 'bold',
  },
  riskMedium: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  riskLow: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },
});
