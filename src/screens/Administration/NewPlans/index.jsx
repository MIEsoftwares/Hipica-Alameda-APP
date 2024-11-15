import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AnnouncementCard from "../../../components/AnnouncementCard";
import { useEffect, useState } from "react";
import { Button, Icon, Searchbar } from "react-native-paper";
import supabase from "../../../../database/SupabaseConfig";
import defaultStyles from "../../../constants/defaultStyles";
import styles from "./styles";
import DefButton from "../../../components/DefButton";
import LightGrayInputText from "../../../components/LightGrayInputText";
import InputSelectDateTime from "../../../components/InputSelectDateTime";
import { height, width } from "../../../constants/Dimensions";
import { deletePlans } from "../../../../database/actions/Plans/deletePlans";
import { insertPlans } from "../../../../database/actions/Plans/insertPlans";
import { updatePlans } from "../../../../database/actions/Plans/updatePlans";

export default function NewPlan({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [newPlan, setNewPlan] = useState({
    id: undefined,
    nome: undefined,
    valor: undefined,
    quantidadeaulas: undefined,
    duracao: undefined,
  })


  const deletePlan = async (id) => {
    await deletePlans(id);
    fetchItems();
  };

  const insertPlan = async (nome, duracao, valor, quantidadeaulas) => {
    await insertPlans(nome, duracao, valor, quantidadeaulas);
    fetchItems();
  };

  const updatePlan = async (id, nome, duracao, valor, quantidadeaulas) => {
    await updatePlans(id, nome, duracao, valor, quantidadeaulas);
    fetchItems();
  };

  const fetchItems = async () => {
    const { data, error } = await supabase.from("planosaula").select("*");

    if (error) {
      console.error("Erro ao buscar dados:", error);
    } else {
      setAllItems(data);
      setFilteredItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 4 }}>
      <AnnouncementCard
        title={item.nome}
        admin={true}
        description={item.duracao}
        imagem="noImage"
        onPress={() => {setNewPlan({id: item.id, nome: item.nome, duracao: item.duracao, valor: item.valor.toString(), quantidadeaulas: item.quantidadeaulas.toString()}); setUpdateModalVisibility(true);
        }}
        onIconPress={() => deletePlan(item.id)}
      />
    </View>
  );

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

  function openNewModal() {
    return (
      <View style={styles.modal}>
        <Pressable
          style={styles.pressable}
          onPress={() => setModalVisibility(false)}
        />
        <View style={styles.form}>
          <Text style={{ fontSize: 26, textAlign: "center" }}>
            Novo Plano
          </Text>

          <LightGrayInputText
            label={"Nome:"}
            action={(value) => setNewPlan( (prevState) => ({ ...prevState, nome: value}))}
            value={newPlan.nome}
          />

          <LightGrayInputText
            label={"Quantidade de aulas:"}
            action={(value) => setNewPlan( (prevState) => ({ ...prevState, quantidadeaulas: value}))}
            value={newPlan.quantidadeaulas}
            keyboardType="numeric"
          />

          <LightGrayInputText
            label={"Duração:"}
            action={(value) => setNewPlan( (prevState) => ({ ...prevState, duracao: value}))}
            value={newPlan.duracao}
          />

          <LightGrayInputText
            label={"Valor:"}
            style={{ marginBottom: 8 }}
            action={(value) => setNewPlan( (prevState) => ({ ...prevState, valor: value}))}
            value={newPlan.valor}
            keyboardType="numeric"
          />
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              icon="content-save"
              children="Salvar"
              mode="contained"
              theme={{ colors: { primary: "#53C64D" } }}
              disabled={newPlan.nome === undefined || newPlan.duracao === undefined || newPlan.valor === undefined}
              onPress={() => {
                fetchItems();
                insertPlan(newPlan.nome, newPlan.duracao, Number(newPlan.valor), Number(newPlan.quantidadeaulas));
                console.log(newPlan);
                
                setModalVisibility(false);
              }}
            />
            <Button
              icon="cancel"
              children="Cancelar"
              mode="contained"
              theme={{ colors: { primary: "#ff0000" } }}
              onPress={() => setModalVisibility(false)}
            />
          </View>
        </View>
      </View>
    );
  }

  function openUpdateModal() {
    return (
      <View style={styles.modal}>
        <Pressable
          style={styles.pressable}
          onPress={() => setUpdateModalVisibility(false)}
        />
        <View style={styles.form}>
          <Text style={{ fontSize: 26, textAlign: "center" }}>
            Editar Plano
          </Text>

          <LightGrayInputText
            label={"Nome:"}
            action={(value) => setNewPlan( (prevState) => ({ ...prevState, nome: value}))}
            value={newPlan.nome}
          />

          <LightGrayInputText
            label={"Quantidade de aulas:"}
            action={(value) => setNewPlan( (prevState) => ({ ...prevState, quantidadeaulas: value}))}
            value={newPlan.quantidadeaulas}
            keyboardType="numeric"
          />

          <LightGrayInputText
            label={"Duração:"}
            action={(value) => setNewPlan( (prevState) => ({ ...prevState, duracao: value}))}
            value={newPlan.duracao}
          />

          <LightGrayInputText
            label={"Valor:"}
            style={{ marginBottom: 8 }}
            action={(value) => setNewPlan( (prevState) => ({ ...prevState, valor: value}))}
            value={newPlan.valor}
            keyboardType="numeric"
          />
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              icon="content-save"
              children="Salvar"
              mode="contained"
              theme={{ colors: { primary: "#53C64D" } }}
              disabled={newPlan.nome === undefined || newPlan.duracao === undefined || newPlan.valor === undefined}
              onPress={() => {
                fetchItems();
                updatePlan(newPlan.id, newPlan.nome, newPlan.duracao, Number(newPlan.valor), Number(newPlan.quantidadeaulas));
                setUpdateModalVisibility(false);
              }}
            />
            <Button
              icon="cancel"
              children="Cancelar"
              mode="contained"
              theme={{ colors: { primary: "#ff0000" } }}
              onPress={() => setUpdateModalVisibility(false)}
            />
          </View>
        </View>
      </View>
    );
  }
  

  return (
    <SafeAreaView style={defaultStyles.containerWHeader}>
      <Searchbar
        placeholder="Pesquise um plano"
        theme={{ colors: { elevation: { level3: "white" } } }}
        style={{ borderWidth: 1, borderRadius: 20 }}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <DefButton
        onPress={() => setModalVisibility(true)}
        icon={<Ionicons name="add" size={48} color="#FFFFFF" />}
        style={{
          alignSelf: "flex-end",
          marginTop: 12,
          position: "absolute",
          bottom: height * 0.01,
          right: width * 0.025,
          zIndex: 5,
          minWidth: 1,
          minHeight: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        labelStyle={{ fontSize: 20 }}
      />
     
      {modalVisibility && openNewModal()}
      {updateModalVisibility && openUpdateModal()}

      <View style={styles.cardView}>
        <FlatList
          style={{ flexGrow: 1, height: height * 0.76 }}
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          
        />
      </View>
    </SafeAreaView>
  );
}
