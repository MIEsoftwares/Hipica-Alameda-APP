import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Card, Paragraph, Searchbar, Title } from "react-native-paper";
import styles from "./styles";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";

export default function EditUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        console.error("Erro ao buscar dados:", error);
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
      const filtered = allItems.filter((item) =>
        item.nome.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(allItems);
    }
  };

  const renderItem = ({ item }) => (
    <Card>
      <Card.Content>
        <Title>{item.nome}</Title>
        <Paragraph>CPF: {item.cpf}</Paragraph>
        <Paragraph>Email: {item.email}</Paragraph>
        <Paragraph>Telefone: {item.telefone}</Paragraph>
        <Paragraph>
          Proprietário de Cavalo: {item.proprietariodecavalo.toString()}
        </Paragraph>
        <Paragraph>Nome do Cavalo: {item.nomedocavalo}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        placeholder="Pesquise um usuário"
        theme={{ colors: { elevation: { level3: "white" } } }}
        style={{ borderWidth: 1, borderRadius: 26 }}
        value={searchQuery}
        onChangeText={handleSearch}
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
