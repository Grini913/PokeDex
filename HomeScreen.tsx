import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

type Pokemon = {
  name: string;
  id: number;
  type: string;
};

const HomeScreen = ({ navigation }: Props) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon: { name: string; url: string }) => {
            const pokeDetails = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              id: pokeDetails.data.id,
              type: pokeDetails.data.types[0].type.name,
            };
          })
        );
        setPokemonList(pokemonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemon();
  }, []);

  const typeColors: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#2980ef',
    electric: '#F7D02C',
    grass: '#78c850',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#91a119',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  const renderPokemon = ({ item }: { item: Pokemon }) => {
    const backgroundColor = typeColors[item.type] || '#FFFFFF';
    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor }]}
        onPress={() => navigation.navigate('PokemonDetailScreen', { name: item.name })}
      >
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
          }}
          style={styles.image}
        />
        <Text style={styles.name}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={renderPokemon}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  row: { justifyContent: 'space-between' },
  card: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 80,
  },
  image: { width: 80, height: 80 },
  name: { fontSize: 16, fontWeight: 'bold', marginTop: 5, color: '#FFF', textAlign: 'center' },
});

export default HomeScreen;