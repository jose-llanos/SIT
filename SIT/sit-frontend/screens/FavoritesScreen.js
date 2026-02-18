import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function FavoritesScreen() {
  const [students, setStudents] = useState([
    {
      id: '1',
      name: 'Luis Pérez',
      course: 'Matemáticas',
      average: 85,
      lastIntervention: '2023-12-10',
      riskLevel: 'Alto',
      isFollowed: true,
    },
    {
      id: '2',
      name: 'Ana García',
      course: 'Física',
      average: 70,
      lastIntervention: '2023-12-08',
      riskLevel: 'Medio',
      isFollowed: true,
    },
    {
      id: '3',
      name: 'Carlos Ramírez',
      course: 'Química',
      average: 60,
      lastIntervention: '2023-12-06',
      riskLevel: 'Bajo',
      isFollowed: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.isFollowed - a.isFollowed); // Los seguidos arriba

  const toggleFollow = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id
          ? { ...student, isFollowed: !student.isFollowed }
          : student
      )
    );
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalVisible(false);
  };

  const getBorderColor = (risk) => {
    if (risk === 'Alto') return '#FF5C5C';
    if (risk === 'Medio') return '#FFA500';
    if (risk === 'Bajo') return '#4CAF50';
    return '#ccc';
  };

  const getIcon = (risk) => {
    if (risk === 'Alto') return 'alert-circle';
    if (risk === 'Medio') return 'warning';
    return 'checkmark-circle';
  };

  const getColor = (risk) => {
    if (risk === 'Alto') return '#FF5C5C';
    if (risk === 'Medio') return '#FFA500';
    return '#4CAF50';
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <Ionicons name="star" size={28} color="#1E90FF" style={{ marginRight: 8 }} />
        <Text style={styles.header}>Estudiantes en Seguimiento</Text>
      </View>

      {/* Buscador */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar estudiante..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredStudents.length === 0 ? (
        <Text style={styles.noResultsText}>No se encontraron estudiantes.</Text>
      ) : (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.card, { borderColor: getBorderColor(item.riskLevel) }]}>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>📘 Curso: {item.course}</Text>
                <Text style={styles.detail}>🎯 Promedio: {item.average}</Text>
                <Text style={styles.detail}>🕒 Última Intervención: {item.lastIntervention}</Text>
                <View style={styles.riskContainer}>
                  <Ionicons
                    name={getIcon(item.riskLevel)}
                    size={20}
                    color={getColor(item.riskLevel)}
                    style={styles.riskIcon}
                  />
                  <Text style={[styles.riskLevel, { color: getColor(item.riskLevel) }]}>
                    Riesgo: {item.riskLevel}
                  </Text>
                </View>
              </View>

              {/* Botones */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.detailsButton} onPress={() => openModal(item)}>
                  <FontAwesome5 name="info-circle" size={16} color="#fff" />
                  <Text style={styles.buttonText}>Detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={item.isFollowed ? styles.unfollowButton : styles.followButton}
                  onPress={() => toggleFollow(item.id)}
                >
                  <Ionicons
                    name={item.isFollowed ? 'remove-circle' : 'add-circle'}
                    size={18}
                    color="#fff"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.buttonText}>
                    {item.isFollowed ? 'Quitar' : 'Seguir'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Modal Detalles */}
      {selectedStudent && (
        <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>👤 Detalles del Estudiante</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Nombre: </Text>{selectedStudent.name}</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Curso: </Text>{selectedStudent.course}</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Promedio: </Text>{selectedStudent.average}</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Última Intervención: </Text>{selectedStudent.lastIntervention}</Text>
              <Text style={styles.modalText}><Text style={styles.modalLabel}>Nivel de Riesgo: </Text>{selectedStudent.riskLevel}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FC',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  cardContent: {
    marginBottom: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  riskIcon: {
    marginRight: 6,
  },
  riskLevel: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
  },
  unfollowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5C5C',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 5,
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
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
