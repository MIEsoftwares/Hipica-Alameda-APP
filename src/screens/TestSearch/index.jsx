import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import supabase from '../../../database/SupabaseConfig';

export default function TestSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [allItems, setAllItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchItems = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*');
  
        if (error) {
          console.error('Erro ao buscar dados:', error);
        } else {
          setAllItems(data);
          setFilteredItems(data);
          setLoading(false);
        }
      };
  
      fetchItems();
    }, []);
  
    const handleSearch = (query) => {
      setSearchQuery(query);
      if (query.length > 0) {
        const filtered = allItems.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
        setFilteredItems(filtered);
      } else {
        setFilteredItems(allItems);
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          label="Search"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.resultItem}>
                <Text>{item.nome}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    searchBar: {
      marginBottom: 16,
    },
    resultItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
});