import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AnnouncementCard from "../../../components/AnnouncementCard";
import { useCallback, useEffect, useState } from "react";
import { Searchbar, List, Chip } from "react-native-paper";
import supabase from "../../../../database/SupabaseConfig";
import defaultStyles from "../../../constants/defaultStyles";
import styles from "./styles";
import { height } from "../../../constants/Dimensions";
import DefButton from "../../../components/DefButton";
import { useFocusEffect } from "@react-navigation/native";

export default function Schedule({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [aula, setAula] = useState({
    id: "",
    dia: "",
    professor: "",
    disabled: false,
    alunosConfirmados: [],
    alunosCancelados: [],
    status: "",
  });
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [expandedConfirmados, setExpandedConfirmados] = useState(false);
  const [expandedCancelados, setExpandedCancelados] = useState(false);

  const getUser = async () => {
    const { data: userResponse, error: userError } =
      await supabase.auth.getUser();
    setUser(userResponse);

    return userResponse;
  };

  const fetchItems = async () => {
    await getUser();
    const { data, error } = await supabase
      .from("aulas")
      .select("*")
      .contains("alunos", [
        user?.user?.user_metadata?.role === "admin" ? [] : [user?.user?.id],
      ]);

    if (error) {
      console.error("Erro ao buscar dados:", error);
    } else {
      setAllItems(data);
      setFilteredItems(data);
    }
    setLoading(false); // Finaliza o loading após o fetch
  };

  async function fetchAlunosConfirmados(aulaId) {
    try {
      // Buscar IDs de alunos confirmados
      const { data: aula, error: fetchError } = await supabase
        .from("aulas")
        .select("alunosconfirmados")
        .eq("id", aulaId)
        .single();

      if (fetchError) {
        throw new Error(
          `Erro ao buscar IDs de alunos confirmados: ${fetchError.message}`
        );
      }

      const { alunosconfirmados = [] } = aula;

      if (alunosconfirmados.length === 0) {
        return []; // Retorna vazio se não houver alunos confirmados
      }

      // Buscar os nomes dos alunos confirmados
      const { data: alunos, error: alunosError } = await supabase
        .from("profiles")
        .select("id, nome")
        .in("id", alunosconfirmados);

      if (alunosError) {
        throw new Error(
          `Erro ao buscar nomes dos alunos: ${alunosError.message}`
        );
      }

      return alunos; // Retorna a lista de alunos no formato { id, nome }
    } catch (error) {
      console.error("Erro na função fetchAlunosConfirmados:", error);
      return []; // Retorna vazio em caso de erro
    }
  }

  async function fetchAlunosCancelados(aulaId) {
    try {
      // Buscar IDs de alunos cancelados
      const { data: aula, error: fetchError } = await supabase
        .from("aulas")
        .select("alunoscancelados")
        .eq("id", aulaId)
        .single();

      if (fetchError) {
        throw new Error(
          `Erro ao buscar IDs de alunos cancelados: ${fetchError.message}`
        );
      }

      const { alunoscancelados = [] } = aula;

      if (alunoscancelados.length === 0) {
        return []; // Retorna vazio se não houver alunos cancelados
      }

      // Buscar os nomes dos alunos cancelados
      const { data: alunos, error: alunosError } = await supabase
        .from("profiles")
        .select("id, nome")
        .in("id", alunoscancelados);

      if (alunosError) {
        throw new Error(
          `Erro ao buscar nomes dos alunos: ${alunosError.message}`
        );
      }

      return alunos; // Retorna a lista de alunos no formato { id, nome }
    } catch (error) {
      console.error("Erro na função fetchAlunosCancelados:", error);
      return []; // Retorna vazio em caso de erro
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    },[])
  );

  const formattedDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const renderItem = ({ item }) => {
    const fetchProfessor = async (id) => {
      try {
        const { data, error } = await supabase
          .from("profiles") // Nome da tabela que contém os perfis dos professores
          .select("nome") // Seleciona apenas o campo "nome"
          .eq("id", id) // Filtra pelo ID fornecido
          .single(); // Garante que retorna apenas um registro

        if (error || !data) {
          console.error(
            "Erro ao buscar o professor:",
            error || "Professor não encontrado"
          );
          return null; // Retorna `null` em caso de erro
        }

        return data.nome; // Retorna o nome do professor
      } catch (err) {
        console.error("Erro ao buscar o professor:", err);
        return null; // Retorna `null` em caso de erro
      }
    };

    const handlePress = async () => {
      try {
        const professorNome = await fetchProfessor(item.idprofessor);

        const { data: confirmados, error: readError } = await supabase
          .from("aulas")
          .select("alunosconfirmados")
          .eq("id", item.id)
          .single();

        const { alunosconfirmados = [] } = confirmados;

        const confirmado = alunosconfirmados.includes(user.user.id);

        const alunosC = await fetchAlunosConfirmados(item.id);
        const alunosCancelados = await fetchAlunosCancelados(item.id);

        setAula((prevState) => ({
          ...prevState,
          id: item.id,
          dia: formattedDate(item.dia),
          professor: professorNome || "Professor não encontrado",
          disabled: confirmado,
          alunosConfirmados: alunosC,
          alunosCancelados: alunosCancelados,
          status: item.status,
        }));

        setModalVisibility(true);
      } catch (error) {
        console.error("Erro ao processar dados da aula:", error);
      }
    };

    return (
      <View style={{ marginBottom: 4 }}>
        <AnnouncementCard
          title={`Aula do dia: ${formattedDate(item.dia)}`}
          imagem="noImage"
          status={item.status}
          onPress={handlePress}
        />
      </View>
    );
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = allItems.filter((item) =>
        item.dia.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(allItems);
    }
  };

  async function updateAlunosConfirmados(aulaId, userId) {
    try {
      // Passo 1: Leitura dos campos atuais
      const { data, error: readError } = await supabase
        .from("aulas")
        .select("alunosconfirmados, alunoscancelados")
        .eq("id", aulaId)
        .single();

      if (readError) {
        throw new Error(`Erro ao ler os campos: ${readError.message}`);
      }

      let { alunosconfirmados = [], alunoscancelados = [] } = data;

      // Passo 2: Se o campo for null, inicializa com o ID
      if (alunosconfirmados === null) {
        alunosconfirmados = [userId];
      } else if (!alunosconfirmados.includes(userId)) {
        alunosconfirmados.push(userId); // Adiciona o usuário ao "alunosconfirmados"
      }

      // Passo 3: Remove o usuário do campo "alunoscancelados" se ele estiver lá
      alunoscancelados = alunoscancelados.filter((id) => id !== userId);

      // Passo 4: Atualiza os campos no Supabase
      const { error: updateError } = await supabase
        .from("aulas")
        .update({
          alunosconfirmados,
          alunoscancelados,
        })
        .eq("id", aulaId);

      if (updateError) {
        throw new Error(`Erro ao atualizar os campos: ${updateError.message}`);
      }

      Alert.alert("Sucesso!", "presença confirmada.");
      setModalVisibility(false);
    } catch (error) {
      console.error("Erro na atualização do campo 'alunosconfirmados':", error);
    }
  }

  async function updateAlunosCancelados(aulaId, userId) {
    try {
      // Passo 1: Leitura dos campos atuais
      const { data, error: readError } = await supabase
        .from("aulas")
        .select("alunosconfirmados, alunoscancelados")
        .eq("id", aulaId)
        .single();

      if (readError) {
        throw new Error(`Erro ao ler os campos: ${readError.message}`);
      }

      let { alunosconfirmados = [], alunoscancelados = [] } = data;

      // Passo 2: Se o campo for null, inicializa com o ID
      if (alunoscancelados === null) {
        alunoscancelados = [userId];
      } else if (!alunoscancelados.includes(userId)) {
        alunoscancelados.push(userId); // Adiciona o usuário ao "alunoscancelados"
      }

      // Passo 3: Remove o usuário do campo "alunosconfirmados" se ele estiver lá
      alunosconfirmados = alunosconfirmados.filter((id) => id !== userId);

      // Passo 4: Atualiza os campos no Supabase
      const { error: updateError } = await supabase
        .from("aulas")
        .update({
          alunosconfirmados,
          alunoscancelados,
        })
        .eq("id", aulaId);

      if (updateError) {
        throw new Error(`Erro ao atualizar os campos: ${updateError.message}`);
      }

      Alert.alert("Sucesso!", "falta confirmada.");
      setModalVisibility(false);
    } catch (error) {
      console.error("Erro na atualização do campo 'alunoscancelados':", error);
    }
  }

  function openNewModal() {
    return (
      <View style={styles.modal}>
        <Pressable
          style={styles.pressable}
          onPress={() => setModalVisibility(false)}
        />
        <View style={styles.form}>
          <Text style={styles.title}>Aula do dia: {aula.dia}</Text>
          <View
            style={{
              backgroundColor: "#f5f5f5",
              width: "90%",
              alignSelf: "center",
              paddingVertical: 8,
              paddingHorizontal: 8,
              borderRadius: 8,
              flexDirection: "row",
              gap: 8,
            }}
          >
            <Text
              style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold" }}
            >
              Professor:
            </Text>
            <Text style={{ alignSelf: "center" }}>{aula.professor}</Text>
          </View>
          {user?.user?.user_metadata?.role === "admin" ? (
            <View>
              <List.Section>
                {/* Accordion para Alunos Confirmados */}
                <List.Accordion
                  title="Alunos Confirmados"
                  expanded={expandedConfirmados}
                  onPress={() => setExpandedConfirmados(!expandedConfirmados)}
                >
                  <View style={styles.chipsContainer}>
                    {aula.alunosConfirmados.length > 0 ? (
                      aula.alunosConfirmados.map((aluno) => (
                        <Chip key={aluno.id} selected style={styles.chip}>
                          {aluno.nome}
                        </Chip>
                      ))
                    ) : (
                      <Text style={styles.emptyText}>
                        Nenhum aluno com presença cancelada.
                      </Text>
                    )}
                  </View>
                </List.Accordion>

                {/* Accordion para Alunos Cancelados */}
                <List.Accordion
                  title="Alunos Cancelados"
                  expanded={expandedCancelados}
                  onPress={() => setExpandedCancelados(!expandedCancelados)}
                >
                  <View style={styles.chipsContainer}>
                    {aula.alunosCancelados.length > 0 ? (
                      aula.alunosCancelados.map((aluno) => (
                        <Chip
                          key={aluno.id}
                          disabled
                          style={styles.disabledChip}
                        >
                          {aluno.nome}
                        </Chip>
                      ))
                    ) : (
                      <Text style={styles.emptyText}>
                        Nenhum aluno com presença cancelada.
                      </Text>
                    )}
                  </View>
                </List.Accordion>
              </List.Section>
            </View>
          ) : (
            <View style={{ gap: 12 }}>
              <DefButton
                children="Confirmar Presença"
                style={{
                  alignSelf: "center",
                  borderRadius: 12,
                  width: "90%",
                  backgroundColor: "#53C64D",
                  flexDirection: "row-reverse",
                  gap: 5,
                }}
                labelStyle={{ fontSize: 16 }}
                onPress={() => {
                  updateAlunosConfirmados(aula.id, user.user.id);
                }}
                disabled={aula.disabled || aula.status === "cancelada" || aula.status === "finalizada"}
                icon={<Ionicons name="checkmark" size={18} color="#FFFFFF" />}
              />
              <DefButton
                children="Confirmar Falta"
                style={{
                  alignSelf: "center",
                  borderRadius: 12,
                  width: "90%",
                  backgroundColor: "#FF4C4C",
                  flexDirection: "row-reverse",
                  gap: 5,
                }}
                labelStyle={{ fontSize: 16 }}
                onPress={() => {
                  updateAlunosCancelados(aula.id, user.user.id);
                }}
                disabled={!aula.disabled || aula.status === "cancelada" || aula.status === "finalizada"}
                icon={<Ionicons name="close" size={18} color="#FFFFFF" />}
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <SafeAreaView
        style={[
          defaultStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#000000" />
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Searchbar
        placeholder="Pesquise uma data de aula"
        theme={{ colors: { elevation: { level3: "white" } } }}
        style={{ borderWidth: 1, borderRadius: 20 }}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {modalVisibility && openNewModal()}

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
