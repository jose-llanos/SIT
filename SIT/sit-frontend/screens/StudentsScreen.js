import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { obtenerEstudiantes } from '../api/servicesEstudiantes';

const screenWidth = Dimensions.get('window').width;

export default function StudentsScreen({ navigation }) {
  const [studentsData, setStudentsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await obtenerEstudiantes();

        const formatted = res.map((student) => ({
          id: String(student.id_student),
          name: `${student.name} ${student.last_name}`,
          course: student.course_name || '---',
          average: student.promedio || '---',
          risk: student.riesgo || '---',
        }));

        setStudentsData(formatted);
      } catch (error) {
        console.error('Error al cargar los estudiantes:', error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = studentsData.filter((student) => {
    const matchQuery =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.includes(searchQuery);

    const matchRisk =
      !selectedRiskLevel || student.risk === selectedRiskLevel;

    return matchQuery && matchRisk;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título */}
      <View style={styles.titleContainer}>
        <FontAwesome5 name="user-graduate" size={22} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.title}>Estudiantes</Text>
      </View>

      {/* Buscador */}
      <View style={styles.searchWrapper}>
        <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o matrícula"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        {['Bajo', 'Medio', 'Alto'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.chip,
              selectedRiskLevel === level && styles.chipActive,
            ]}
            onPress={() => setSelectedRiskLevel(level)}
          >
            <FontAwesome5
              name={
                level === 'Bajo' ? 'smile' :
                  level === 'Medio' ? 'meh' :
                    'frown'
              }
              size={14}
              color={selectedRiskLevel === level ? '#fff' : '#333'}
              style={{ marginRight: 6 }}
            />
            <Text
              style={[
                styles.chipText,
                selectedRiskLevel === level && { color: '#fff' },
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setSelectedRiskLevel(null)} style={styles.clearButton}>
          <Text style={styles.clearText}>Todos</Text>
        </TouchableOpacity>
      </View>

      {/* Tabla */}
      <View style={styles.listContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Nombre</Text>
          <Text style={styles.headerCell}>Curso</Text>
          <Text style={styles.headerCell}>Prom.</Text>
          <Text style={styles.headerCell}>Riesgo</Text>
        </View>

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.rowCell}>{item.name}</Text>
              <Text style={styles.rowCell}>{item.course}</Text>
              <Text style={styles.rowCell}>{item.average}</Text>
              <View style={[styles.rowCell, styles.riskCell]}>
                <FontAwesome5
                  name={
                    item.risk === 'Bajo'
                      ? 'smile'
                      : item.risk === 'Medio'
                        ? 'meh'
                        : 'frown'
                  }
                  size={14}
                  color={
                    item.risk === 'Bajo'
                      ? '#4CAF50'
                      : item.risk === 'Medio'
                        ? '#FFA500'
                        : '#FF5C5C'
                  }
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={[
                    styles.riskText,
                    item.risk === 'Alto'
                      ? styles.riskHigh
                      : item.risk === 'Medio'
                        ? styles.riskMedium
                        : styles.riskLow,
                  ]}
                >
                  {item.risk}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Botón detalles */}
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate('StudentDetails')}
      >
        <MaterialIcons name="visibility" size={20} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.detailButtonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6F9',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#1E90FF',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  searchWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: '#333',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
    justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  chipActive: {
    backgroundColor: '#1E90FF',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  clearText: {
    color: '#1E90FF',
    fontWeight: '600',
    fontSize: 13,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
    color: '#555',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    color: '#333',
  },
  riskCell: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskText: {
    fontSize: 13,
    fontWeight: '600',
  },
  riskHigh: {
    color: '#FF5C5C',
  },
  riskMedium: {
    color: '#FFA500',
  },
  riskLow: {
    color: '#4CAF50',
  },
  detailButton: {
    marginTop: 24,
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
