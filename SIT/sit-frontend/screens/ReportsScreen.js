import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Usa MaterialIcons como ejemplo

const screenWidth = Dimensions.get('window').width;

export default function ReportsScreen() {
  const [filters, setFilters] = useState({
    course: '',
    group: '',
    date: '',
  });

  const tableData = [
    { course: 'Ingeniería de Software', students: 45, riskPercentage: 18, interventions: 10 },
    { course: 'Cálculo Diferencial', students: 60, riskPercentage: 25, interventions: 15 },
    { course: 'Física General', students: 50, riskPercentage: 12, interventions: 8 },
    { course: 'Historia de la Tecnología', students: 40, riskPercentage: 8, interventions: 2 },
    { course: 'Biología Molecular', students: 30, riskPercentage: 20, interventions: 5 },
  ];

  const pieChartData = [
    { name: 'Riesgo Alto', population: 20, color: '#FF5C5C', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'Riesgo Medio', population: 40, color: '#FFA500', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'Riesgo Bajo', population: 40, color: '#4CAF50', legendFontColor: '#333', legendFontSize: 12 },
  ];

  const barChartData = {
    labels: ['Software', 'Cálculo', 'Física', 'Historia', 'Biología'],
    datasets: [{ data: [80, 65, 70, 85, 75] }],
  };

  const tutoringChartData = {
    labels: ['Software', 'Cálculo', 'Física', 'Historia', 'Biología'],
    datasets: [{ data: [12, 18, 10, 5, 9] }],
  };

  const handleExport = () => {
    alert('Exportar en formato PDF/Excel está en desarrollo.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>
        <Icon name="bar-chart" size={28} color="#1E90FF" /> Reportes Académicos
      </Text>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>
          <Icon name="filter-list" size={20} color="#333" /> Filtros
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Curso"
          value={filters.course}
          onChangeText={(text) => setFilters({ ...filters, course: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Grupo"
          value={filters.group}
          onChangeText={(text) => setFilters({ ...filters, group: text })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Fecha (DD/MM/AAAA)"
          value={filters.date}
          onChangeText={(text) => setFilters({ ...filters, date: text })}
        />
        <TouchableOpacity style={styles.applyButton}>
          <Icon name="check-circle" size={18} color="#fff" />
          <Text style={styles.applyButtonText}>  Aplicar Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          <Icon name="pie-chart" size={20} color="#1E90FF" /> Distribución de Riesgo
        </Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{ color: (opacity = 1) => `rgba(30, 144, 255, ${opacity})` }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Promedios */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          <Icon name="show-chart" size={20} color="#1E90FF" /> Promedios Académicos por Curso
        </Text>
        <BarChart
          data={barChartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#1E90FF',
            backgroundGradientFrom: '#1E90FF',
            backgroundGradientTo: '#87CEFA',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          verticalLabelRotation={30}
          style={styles.barChart}
        />
      </View>

      {/* Tutorías */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          <Icon name="school" size={20} color="#1E90FF" /> Asistencias a Tutorías por Curso
        </Text>
        <BarChart
          data={tutoringChartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#6A5ACD',
            backgroundGradientFrom: '#6A5ACD',
            backgroundGradientTo: '#9370DB',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          verticalLabelRotation={30}
          style={styles.barChart}
        />
      </View>

      {/* Tabla */}
      <View style={styles.tableContainer}>
        <Text style={styles.chartTitle}>
          <Icon name="table-chart" size={20} color="#1E90FF" /> Estadísticas Resumidas
        </Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.headerCell]}>Curso</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Estudiantes</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>% Riesgo</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Intervenciones</Text>
        </View>
        <FlatList
          data={tableData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.course}</Text>
              <Text style={styles.tableCell}>{item.students}</Text>
              <Text style={styles.tableCell}>{item.riskPercentage}%</Text>
              <Text style={styles.tableCell}>{item.interventions}</Text>
            </View>
          )}
        />
      </View>

      {/* Exportar */}
      <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
        <Icon name="file-download" size={20} color="#fff" />
        <Text style={styles.exportText}>  Exportar PDF / Excel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f8f9fc', padding: 16 },
  header: { fontSize: 26, fontWeight: 'bold', color: '#1E90FF', textAlign: 'center', marginBottom: 20 },
  filtersContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  filterTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  applyButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  chartContainer: { marginBottom: 20 },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingBottom: 10,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1E90FF',
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerCell: { fontWeight: 'bold', color: '#fff', textAlign: 'center', flex: 1 },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: { flex: 1, textAlign: 'center', fontSize: 14, color: '#333' },
  exportButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  exportText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  barChart: { borderRadius: 10 },
});
