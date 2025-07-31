import { View, Text, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../screens/DashboardScreen'; 
import StudentsScreen from '../screens/StudentsScreen'; 
import InterventionsScreen from '../screens/InterventionsScreen';
import ReportsScreen from '../screens/ReportsScreen'; 
import NotificationsScreen from '../screens/NotificationsScreen';
import FavoritesScreen from '../screens/FavoritesScreen'; 
import ProfileScreen from '../screens/ProfileScreen'; 
import SettingsScreen from '../screens/SettingsScreen'; 
import TutoringScheduleScreen from '../screens/TutoringScheduleScreen';
import RegistrarCyS from '../screens/RegistrarCyS';
import VerRegistrosScreen from '../screens/VerRegistrosScreen';




const Drawer = createDrawerNavigator();

// Encabezado personalizado para el menú
function CustomDrawerHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/80' }} // Foto de perfil simulada
        style={styles.profileImage}
      />
      <Text style={styles.appTitle}>Alerta Estudiantil</Text>
      <Text style={styles.userName}>John Doe</Text>
      <Text style={styles.userRole}>Docente</Text>
    </View>
  );
}

export default function DashboardNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f9f9f9', // Fondo del menú
          width: 250, // Ancho del menú lateral
        },
        drawerActiveTintColor: '#1E90FF', // Color de texto activo
        drawerInactiveTintColor: '#666', // Color de texto inactivo
        headerShown: true, // Ocultar encabezado predeterminado
      }}
    >
      {/* Opciones principales del menú */}
      <Drawer.Screen name="DashboardS" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="Students" component={StudentsScreen} options={{ title: 'Estudiantes' }} />
      <Drawer.Screen name="Interventions" component={InterventionsScreen} options={{ title: 'Intervenciones' }} />
      <Drawer.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reportes' }} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notificaciones' }} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Seguimiento' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configuración' }} />
      <Drawer.Screen name="TutoringSchedule" component={TutoringScheduleScreen} options={{ title: 'Horario de Tutorías' }} />
      <Drawer.Screen name='RegistrarCys' component={RegistrarCyS} options={{title:'Registrar'}}/>
      <Drawer.Screen name='VerRegistros' component={VerRegistrosScreen} options={{title: 'Ver Registros'}}/>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userName: {
    fontSize: 16,
    color: '#fff',
  },
  userRole: {
    fontSize: 14,
    color: '#fff',
    fontStyle: 'italic',
  },
});
