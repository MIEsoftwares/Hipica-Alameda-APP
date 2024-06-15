import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { ActivityIndicator, Card, Paragraph, Searchbar, TextInput, Title } from 'react-native-paper';
import supabase from '../../../database/SupabaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.nome}</Title>
        <Paragraph>CPF: {item.cpf}</Paragraph>
        <Paragraph>Email: {item.email}</Paragraph>
        <Paragraph>Telefone: {item.telefone}</Paragraph>
        <Paragraph>Proprietário de Cavalo: {item.proprietario_de_cavalo}</Paragraph>
        <Paragraph>Nome do Cavalo: {item.nome_do_cavalo}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
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
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
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
  card: {
    marginBottom: 16,
  },
});