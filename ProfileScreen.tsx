import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';
import { useUserData } from './UserData';
import { ScrollView } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileScreen'>;

const ProfileScreen = ({ navigation }: Props) => {
  const { userData } = useUserData();

  const handleLogout = () => {
    navigation.replace('LoginScreen'); // Ahora podemos navegar a LoginScreen
  };

  return (
    <ScrollView>
    <View style={styles.container}>
    <Image source={{uri: userData.userima}} style={styles.image}  />
      <Text style={styles.info}>Usuario: {userData.username}</Text>
      <Text style={styles.info}>Contraseña: {'•'.repeat(userData.password.length)}</Text>
      <Text style={styles.info}>Correo: {userData.email}</Text>
      <Text style={styles.info}>Comienzo de Aventura: {userData.registrationDate}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#11151c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100, // Más redondeado 
  },
});

export default ProfileScreen;