import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([
    { id: '1', studentName: 'Luis Pérez', reason: 'Promedio bajo en Matemáticas', riskLevel: 'Alto', date: '2023-12-15', read: false },
    { id: '2', studentName: 'Ana García', reason: 'Ausencias recurrentes en Física', riskLevel: 'Medio', date: '2023-12-14', read: false },
    { id: '3', studentName: 'Carlos Ramírez', reason: 'Progreso constante en Química', riskLevel: 'Bajo', date: '2023-12-13', read: true },
    { id: '4', studentName: 'María López', reason: 'Promedio bajo en Historia', riskLevel: 'Alto', date: '2023-12-12', read: false },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalVisible(false);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
    openModal({ message: '✅ Todas las notificaciones han sido marcadas como leídas.' });
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'Alto':
        return <MaterialIcons name="error" size={20} color="#FF5C5C" />;
      case 'Medio':
        return <MaterialIcons name="warning" size={20} color="#FFA500" />;
      case 'Bajo':
        return <MaterialIcons name="check-circle" size={20} color="#4CAF50" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          <FontAwesome5 name="bell" size={22} color="#1E90FF" /> Notificaciones
        </Text>
        <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
          <MaterialIcons name="done-all" size={20} color="#fff" />
          <Text style={styles.markAllText}>Marcar todo como leído</Text>
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationCard, !item.read && styles.unreadNotification]}
            onPress={() =>
              openModal({
                student: item.studentName,
                reason: item.reason,
                risk: item.riskLevel,
                date: item.date,
              })
            }
          >
            <View style={styles.iconLeft}>
              {item.read ? (
                <MaterialIcons name="drafts" size={24} color="#999" />
              ) : (
                <MaterialIcons name="notifications-active" size={24} color="#FF5C5C" />
              )}
            </View>
            <View style={styles.notificationDetails}>
              <Text style={styles.studentName}>{item.studentName}</Text>
              <Text style={styles.reason}>{item.reason}</Text>
              <View style={styles.riskRow}>
                {getRiskIcon(item.riskLevel)}
                <Text
                  style={[
                    styles.riskLevel,
                    item.riskLevel === 'Alto'
                      ? styles.riskHigh
                      : item.riskLevel === 'Medio'
                      ? styles.riskMedium
                      : styles.riskLow,
                  ]}
                >
                  {'  '}Riesgo: {item.riskLevel}
                </Text>
              </View>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      {modalContent && (
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                <FontAwesome5 name="info-circle" size={20} color="#1E90FF" /> Detalles de Notificación
              </Text>
              {modalContent.message ? (
                <Text style={styles.modalText}>{modalContent.message}</Text>
              ) : (
                <>
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>👤 Estudiante: </Text>{modalContent.student}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>📌 Motivo: </Text>{modalContent.reason}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>⚠️ Riesgo: </Text>{modalContent.risk}
                  </Text>
                  <Text style={styles.modalText}>
                    <Text style={styles.modalLabel}>📅 Fecha: </Text>{modalContent.date}
                  </Text>
                </>
              )}
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
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  markAllButton: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  markAllText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  unreadNotification: {
    borderColor: '#FF5C5C',
    borderWidth: 2,
  },
  iconLeft: {
    marginRight: 12,
  },
  notificationDetails: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  reason: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskLevel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  riskHigh: { color: '#FF5C5C' },
  riskMedium: { color: '#FFA500' },
  riskLow: { color: '#4CAF50' },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: screenWidth - 40,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
