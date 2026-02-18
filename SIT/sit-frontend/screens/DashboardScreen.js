import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { obtenerEstudiantes } from '../api/servicesEstudiantes';

export default function DashboardScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await obtenerEstudiantes();
        console.log('Estudiantes recibidos:', data);
        setStudents(data);
      } catch (error) {
        console.error('Error al obtener estudiantes:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const totalStudents = students.length;
  const highRisk = students.filter(s => s.riesgo === 'Alto').length;
  const interventions = students.filter(s => s.intervencion === true).length;

  // SOLO estudiantes en riesgo alto
  const highRiskStudentNames = students
    .filter(s => s.riesgo === 'Alto')
    .map(({ id_student, name, last_name }) => ({
      id: String(id_student),
      fullName: `${name} ${last_name}`,
    }));

  if (loading) return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Dashboard</Text>
        <Text style={styles.subHeader}>Resumen general del estado académico</Text>
      </View>

      {/* KPI Cards */}
      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.shadow]}>
          <Ionicons name="people" size={28} color="#1E90FF" />
          <Text style={styles.cardValue}>{totalStudents}</Text>
          <Text style={styles.cardLabel}>Total Estudiantes</Text>
        </View>
        <View style={[styles.card, styles.shadow]}>
          <Ionicons name="alert-circle" size={28} color="#FF5C5C" />
          <Text style={styles.cardValue}>{highRisk}</Text>
          <Text style={styles.cardLabel}>En Riesgo Alto</Text>
        </View>
        <View style={[styles.card, styles.shadow]}>
          <Ionicons name="clipboard" size={28} color="#FFA500" />
          <Text style={styles.cardValue}>{interventions}</Text>
          <Text style={styles.cardLabel}>Intervenciones</Text>
        </View>
      </View>

      {/* Alertas recientes */}
      <View style={styles.alertsContainer}>
        <Text style={styles.alertsTitle}>⚠️ Alertas Recientes</Text>
        <FlatList
          data={students}
          keyExtractor={(item) => String(item.id_student)}
          renderItem={({ item }) => (
            <View style={[styles.alertItem, styles.shadow]}>
              <Text style={styles.alertName}>{item.name} {item.last_name}</Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Students')}
        >
          <Text style={styles.viewAllText}>Ver lista completa de estudiantes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  subHeader: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  cardLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  alertsContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  alertsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 12,
  },
  alertItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  alertName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
