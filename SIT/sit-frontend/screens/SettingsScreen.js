import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

export default function SettingsScreen({ navigation }) {
  const [lowRisk, setLowRisk] = useState(70);
  const [mediumRisk, setMediumRisk] = useState(50);
  const [highRisk, setHighRisk] = useState(30);
  const [failedSubjectsAlert, setFailedSubjectsAlert] = useState(2);

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSave = () => {
    alert('Cambios guardados correctamente.');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <Icon name="settings" size={28} color="#1E90FF" style={{ marginRight: 10 }} />
        <Text style={styles.header}>Configuración del Sistema</Text>
      </View>

      {/* Reglas de riesgo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Reglas de Riesgo Académico</Text>
        {[
          { label: 'Promedio mínimo para Riesgo Bajo', value: lowRisk, setter: setLowRisk },
          { label: 'Promedio mínimo para Riesgo Medio', value: mediumRisk, setter: setMediumRisk },
          { label: 'Promedio mínimo para Riesgo Alto', value: highRisk, setter: setHighRisk },
          { label: 'Nº de materias reprobadas para alerta', value: failedSubjectsAlert, setter: setFailedSubjectsAlert },
        ].map((item, index) => (
          <View key={index} style={styles.inputGroup}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={styles.input}
              value={item.value.toString()}
              onChangeText={(text) => item.setter(Number(text))}
              keyboardType="numeric"
              placeholder="0"
            />
          </View>
        ))}
      </View>

      {/* Preferencias */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Preferencias de Usuario</Text>
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceLabel}>
            <Icon name="brightness-6" size={20} color="#555" />
            <Text style={styles.label}>Tema oscuro</Text>
          </View>
          <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
        </View>
        <View style={styles.preferenceRow}>
          <View style={styles.preferenceLabel}>
            <Icon name="email" size={20} color="#555" />
            <Text style={styles.label}>Notificaciones por correo</Text>
          </View>
          <Switch value={emailNotifications} onValueChange={setEmailNotifications} />
        </View>
      </View>

      {/* Horario de Tutorías */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Horario de Tutorías</Text>
        <Text style={styles.infoText}>Configura tu disponibilidad para sesiones de tutorías.</Text>
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={() => navigation.navigate('TutoringSchedule')}
        >
          <Icon name="calendar-today" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.scheduleButtonText}>Editar Horario</Text>
        </TouchableOpacity>
      </View>

      {/* Guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Icon name="save" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F4F8FC',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fefefe',
    fontSize: 15,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  preferenceLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
  },
  scheduleButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
