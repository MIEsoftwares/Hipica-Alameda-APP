import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Card, Searchbar} from "react-native-paper";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import defaultStyles from "../../../constants/defaultStyles";
import supabase from "../../../../database/SupabaseConfig";
import { width } from "../../../constants/Dimensions";

export default function ListUsers({navigation}) {
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
    <Card theme={{colors: {elevation: {level1: "#ffffff"}}}} style={{marginBottom: 12, marginHorizontal: 8}} onPress={() => navigation.navigate("EditUsers", {item: item})}>
      <Card.Title
        titleStyle={{fontSize: 18, fontWeight: "bold"}}
        title={item.nome}
        subtitle={"Email: " + item.email}
        right={() => <Ionicons name="create-outline" size={24} onPress={() => navigation.navigate("EditUsers", {item: item})}/>}
        rightStyle={{marginRight: 16}}
      />
    </Card>
  );

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Searchbar
        placeholder="Pesquise um usuário"
        theme={{ colors: { elevation: { level3: "white" } } }}
        style={{ borderWidth: 1, borderRadius: 20, marginBottom: 12 }}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
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
