import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SearchScreen'>;

type SearchResult = {
  id: number;
  name: string;
};

const SearchScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    // Verificar si el campo de búsqueda está vacío
    if (!searchQuery.trim()) {
      setError('Por favor, ingresa el nombre de un Pokémon');
      setResult(null);
      return; // No hacemos nada más, permanecemos en la ventana de búsqueda
    }

    setError('');
    setResult(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      setResult({
        id: response.data.id,
        name: response.data.name,
      });
    } catch (err) {
      setError('Pokémon no encontrado');
    }
  };

  return (
    <View style={styles.container}>
      {/* Contenedor para la barra de búsqueda con ícono */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : result ? (
        <TouchableOpacity
          style={styles.resultContainer}
          onPress={() => navigation.navigate('PokemonDetailScreen', { name: result.name })}
        >
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.id}.png`,
            }}
            style={styles.image}
          />
          <Text style={styles.resultText}>{result.name.toUpperCase()}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 25, // Más redondeado 
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
  input: {
    flex: 1, // Ocupa todo el espacio disponible
    height: 50,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  
  button: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#11151c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    marginTop: 20,
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 150,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
});

export default SearchScreen;