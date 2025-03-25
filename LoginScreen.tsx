import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated, Easing, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';
import { useUserData } from './UserData';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

const LoginScreen = ({ navigation }: Props) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const logoScale = useRef(new Animated.Value(1.2)).current;
  const logoTranslateY = useRef(new Animated.Value(0)).current;

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { userData } = useUserData();

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 0.6,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: -30,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => setShowForm(true));
    }, 500);
  }, []);

  const handleLogin = () => {
    if (username.length < 3) {
      Alert.alert('Error', 'El usuario debe tener al menos 3 caracteres');
      return;
    }
    if (password.length <= 3) {
      Alert.alert('Error', 'La contraseña debe tener al menos 4 caracteres');
      return;
    }
    if (username === userData.username || username ==userData.email && password === userData.password) {
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const goToRegister = () => {
    navigation.replace('RegisterScreen');
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://m.media-amazon.com/images/I/61e064oxbmL.png' }}
        style={[styles.logo, { transform: [{ scale: logoScale }, { translateY: logoTranslateY }] }]}
      />

      {showForm && (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Pokedex</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario o Correo"
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
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={goToRegister}>
            <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>
      )}
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
  logo: {
    width: 180,
    height: 180,
  },
  formContainer: {
    marginTop: -10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  input: {
    width: '100%',
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
    width: '100%',
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

export default LoginScreen;