import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardNavigator from './DashboardNavigator'; 
import VerRegistrosScreen from '../screens/VerRegistrosScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Pantalla de inicio de sesión */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      {/* Pantalla de registro */}
      <Stack.Screen
        name="Registro"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      {/* Dashboard con menú hamburguesa */}
      <Stack.Screen
        name="Dashboard"
        component={DashboardNavigator} // Usa el Drawer Navigator
        options={{ headerShown: false }}
      />
      <Stack.Screen name='VerRegistro'
      component={VerRegistrosScreen}
      options={{headerShown : false}}/>
    </Stack.Navigator>
  );
}
