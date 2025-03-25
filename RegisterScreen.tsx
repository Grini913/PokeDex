import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';
import { useUserData } from './UserData';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userima, setUserima] = useState<string>(''); // Añadimos el estado para userima

  const { updateUserData } = useUserData();

  const handleRegister = () => {
    // Validaciones básicas
    if (!email.includes('@') || email.length < 5) {
      Alert.alert('Error', 'Por favor, ingresa un correo válido');
      return;
    }
    if (username.length < 3) {
      Alert.alert('Error', 'El usuario debe tener al menos 3 caracteres');
      return;
    }
    if (password.length <= 3) {
      Alert.alert('Error', 'La contraseña debe tener al menos 4 caracteres');
      return;
    }
    

    // Actualizamos los datos del usuario en el contexto
    updateUserData({
      email,
      username,
      password,
      registrationDate: new Date().toLocaleDateString(),
    });

    Alert.alert('Éxito', 'Registro completado. Por favor, inicia sesión.');
    navigation.replace('LoginScreen');
  };

  const goToLogin = () => {
    navigation.replace('LoginScreen');
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#FFF"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#FFF"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#FFF"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
    
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton} onPress={goToLogin}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11151c',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#11151c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#ffcc00',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;