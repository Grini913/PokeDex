import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import de pantallas
import HomeScreen from './HomeScreen';
import PokemonDetailScreen from './PokemonDetailScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';

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

// Crear los navegadores
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Stack Navigator para la pestaña Home
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Pokémon List' }} />
      <Stack.Screen name="PokemonDetailScreen" component={PokemonDetailScreen} options={{ title: 'Pokémon Details' }} />
    </Stack.Navigator>
  );
};

// Stack Navigator para la pestaña Search
const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Buscar Pokémon' }} />
      <Stack.Screen name="PokemonDetailScreen" component={PokemonDetailScreen} options={{ title: 'Pokémon Details' }} />
    </Stack.Navigator>
  );
};

// Stack Navigator para la pestaña Profile
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Stack.Navigator>
  );
};

// Tab Navigator principal (sin NavigationContainer ni UserProvider)
const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#ffcc00', // Color del ícono activado
        tabBarInactiveTintColor: '#888', // Color del ícono inactivo
        tabBarStyle: {
          backgroundColor: '#11151c', // Color de fondo de la barra de pestañas 
        },
      }}
    >
      {/* Pestaña Home con Stack Navigator */}
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'PokeList',
          headerShown: false,
        }}
      />
      {/* Pestaña Search con Stack Navigator */}
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
        }}
      />
      {/* Pestaña Profile con Stack Navigator */}
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;