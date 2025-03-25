import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonDetailScreen'>;

type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

const PokemonDetailScreen = ({ route, navigation }: Props) => {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        console.log('Fetching details for Pokémon:', name); // Depuración
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        console.log('API response:', response.data); // Depuración
        setPokemon(response.data);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching Pokémon details:', error.message); // Depuración
        setError('No se pudieron cargar los detalles del Pokémon. Intenta de nuevo más tarde.');
      }
    };
    fetchPokemonDetails();
  }, [name]);

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Regresar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  const typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  const backgroundColor = pokemon.types && pokemon.types[0]?.type?.name ? typeColors[pokemon.types[0].type.name] : '#FFFFFF';

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
          }}
          style={styles.image}
          onError={(e) => console.log('Error loading Pokémon image:', e.nativeEvent.error)} // Depuración
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pokemon.name.toUpperCase()} #{pokemon.id}</Text>
        <View style={styles.typesContainer}>
          {pokemon.types && pokemon.types.length > 0 ? (
            pokemon.types.map((type) => (
              <Text
                key={type.type.name}
                style={[styles.type, { backgroundColor: typeColors[type.type.name] || '#FFFFFF' }]} // Color por defecto si el tipo no está en typeColors
              >
                {type.type.name.toUpperCase()}
              </Text>
            ))
          ) : (
            <Text style={styles.errorText}>Tipos no disponibles</Text>
          )}
        </View>
        <Text style={styles.info}>Altura: {pokemon.height ? pokemon.height / 10 : 'N/A'} m</Text>
        <Text style={styles.info}>Peso: {pokemon.weight ? pokemon.weight / 10 : 'N/A'} kg</Text>
        <Text style={styles.sectionTitle}>Estadísticas Base:</Text>
        {pokemon.stats && pokemon.stats.length > 0 ? (
          pokemon.stats.map((stat) => (
            <Text key={stat.stat.name} style={styles.stat}>
              {stat.stat.name.toUpperCase()}: {stat.base_stat}
            </Text>
          ))
        ) : (
          <Text style={styles.errorText}>Estadísticas no disponibles</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Regresar" onPress={() => navigation.goBack()} color="#FF6347" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    padding: 30,
    paddingTop: 50,
  },
  image: {
    width: 220,
    height: 220,
  },
  infoContainer: {
    padding: 25,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  type: {
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 6,
    borderRadius: 12,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  stat: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 3,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default PokemonDetailScreen;