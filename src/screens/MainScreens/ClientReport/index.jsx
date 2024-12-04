import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import supabase from "../../../../database/SupabaseConfig";
import PlanCard from "../../../components/PlanCard";
import defaultStyles from "../../../constants/defaultStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper"; // Importando Searchbar
import { height, width } from "../../../constants/Dimensions"; // Certifique-se de que `width` está disponível

export default ClientReport = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [filteredRelatorios, setFilteredRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchRelatorios = async () => {
    setLoading(true);
    try {
      const { data: userResponse, error: userError } =
        await supabase.auth.getUser();
      if (userError) throw userError;

      const userId = userResponse?.user?.id;
      if (!userId) {
        console.error("Usuário não autenticado ou ID não encontrado.");
        setLoading(false);
        return;
      }

      const query =
        userResponse.user.user_metadata.role !== "admin"
          ? supabase.from("relatorios").select("*").eq("userid", userId)
          : supabase.from("relatorios").select("*");

      const { data, error } = await query;
      if (error) throw error;

      setRelatorios(data);
      setFilteredRelatorios(data); // Atualiza também os relatórios filtrados
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRelatorios();
    }, [])
  );

  const openModal = (relatorio) => {
    setSelectedRelatorio(relatorio);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRelatorio(null);
  };

  const handleSearchRelatorio = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = relatorios.filter((item) =>
        item.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRelatorios(filteredData);
    } else {
      setFilteredRelatorios(relatorios);
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <>
          {/* Searchbar */}
          <Searchbar
            placeholder="Pesquisar relatórios..."
            onChangeText={handleSearchRelatorio}
            value={searchQuery}
            theme={{ colors: { elevation: { level3: "white" } } }}
            style={{
              width: width * 0.94,
              borderWidth: 1,
              borderRadius: 20,
              marginBottom: 12,
              alignSelf: "center",
            }}
          />

          {/* FlatList */}
          <FlatList
            data={filteredRelatorios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PlanCard
                title={item.titulo}
                titleStyle={{
                  height: "100%",
                  width: "100%",
                  marginTop: height * -0.01,
                  verticalAlign: "middle",
                }}
                onPress={() => openModal(item)}
              />
            )}
          />
        </>
      )}

      {/* Modal */}
      {selectedRelatorio && (
        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              <Text>Detalhes do Relatório - {selectedRelatorio.titulo}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Professor:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.nomeprofessor}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Equitação:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.equitacao}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Manejo:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.manejo}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Manejo Puxado:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.manejopuxado}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Salto 0.4:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.salto04}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Salto 0.6:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.salto06}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Salto 0.8:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.salto08}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Salto 0.9:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.salto09}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Salto 1.0:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.salto1}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Salto 1.1:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.salto11}
              </Text>
            </Text>
            <Text>
              <Text style={styles.label}>Salto 1.2:</Text>{" "}
              <Text style={styles.resultText}>
                {selectedRelatorio.salto12}
              </Text>
            </Text>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    padding: 20,
  },
  item: {
    backgroundColor: "#000000",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  itemText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 20,
  },
  resultText: {
    fontSize: 22,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#000000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  textContent: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
  },
});

