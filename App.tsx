import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import de pantallas
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import Navigation from './Navigation';
import { UserProvider } from './UserData';

// Definición de tipos para las rutas del Stack Navigator
export type RootStackParamList = {
  HomeScreen: undefined;
  PokemonDetailScreen: { name: string };
  SearchScreen: undefined;
  ProfileScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  MainTabs: undefined;
};

// Crear el Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainTabs"
            component={Navigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;