import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Text,
  Button,
  TextInput,
  Card,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import supabase from "../../../../database/SupabaseConfig";
import DropDownPicker from "react-native-dropdown-picker";
import DefButton from "../../../components/DefButton";
import { height, width } from "../../../constants/Dimensions";
import LightGrayInputText from "../../../components/LightGrayInputText";
import AnnouncementCard from "../../../components/AnnouncementCard";
import createReport from "../../../../database/report/createReport";
import defaultStlyes from "../../../constants/defaultStyles";
import updateRelatorio from "../../../../database/report/editReport";
import { useFocusEffect } from "@react-navigation/native";

export default function Relatorios() {
  const [idReport, setIdReport] = useState();
  const [relatorios, setRelatorios] = useState([]);
  const [professor, setProfessor] = useState({
    id: "",
    nome: "",
  });
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [novoRelatorio, setNovoRelatorio] = useState({
    titulo: "",
    professorid: "",
    nomeprofessor: "",
    userid: "",
    equitacao: 0,
    manejo: 0,
    manejopuxado: 0,
    salto04: 0,
    salto06: 0,
    salto08: 0,
    salto09: 0,
    salto1: 0,
    salto11: 0,
    salto12: 0,
  });
  const [open, setOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [indice, setIndice] = useState();

  useFocusEffect(
    useCallback(() => {
      fetchRelatorios();
      fetchClientes();
      fetchProfessor();
    }, [])
  );
   
  const fetchRelatorios = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("relatorios").select("*");
    if (error) {
      console.error("Falha ao buscar relatorios", error);
      Alert.alert("Falha ao buscar relatórios");
      return;
    }
    setRelatorios(data);
    setLoading(false);
  };

  const fetchClientes = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, nome")
      .eq("role", "user");

    if (error) {
      console.error("Erro ao buscar clientes:", error);
      Alert.alert("Erro", "Não foi possível carregar os alunos");
    } else {
      const formattedData = data.map((cliente) => ({
        label: cliente.nome,
        value: { id: cliente.id, nome: cliente.nome },
      }));
      setClientes(formattedData);
    }
  };

  const fetchProfessor = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await setProfessor((prevState) => ({
      ...prevState,
      id: user.id,
      nome: user.user_metadata.nome,
    }));
  };

  const tryCreateRelatorio = async (relatorioAtualizado) => {
    const response = await createReport(relatorioAtualizado);
    if (response) {
      fetchRelatorios();
      setModalVisible(false);
      setNovoRelatorio({
        titulo: "",
        nomeprofessor: "",
        userid: "",
        equitacao: 0,
        manejo: 0,
        manejopuxado: 0,
        salto04: 0,
        salto06: 0,
        salto08: 0,
        salto09: 0,
        salto1: 0,
        salto11: 0,
        salto12: 0,
      });
      setSelectedCliente(null);
    }
  };

  const toggleEditModal = () => {
    setEditVisible(!editVisible);
  };

  const tryEditRelatorio = async (id, relatorio) => {
    const response = await updateRelatorio(id, relatorio);
    if (response) {
      fetchRelatorios();
      setModalVisible(false);
      setNovoRelatorio({
        titulo: "",
        nomeprofessor: "",
        userid: "",
        equitacao: 0,
        manejo: 0,
        manejopuxado: 0,
        salto04: 0,
        salto06: 0,
        salto08: 0,
        salto09: 0,
        salto1: 0,
        salto11: 0,
        salto12: 0,
      });
      setSelectedCliente(null);
    }
  };
  
  const renderRelatorio = ({ item }) => (
    <AnnouncementCard
      imagem="noImage"
      title={item.titulo}
      description={`Professor: ${item.nomeprofessor} \nAluno: ${item.nomealuno}`}
      onPress={() => {
        toggleEditModal();
        setIdReport(item.id);
        setNovoRelatorio({
          titulo: item.titulo.toString(),
          nomeprofessor: item.nomeprofessor.toString(),
          userid: item.userid.toString(),
          equitacao: item.equitacao.toString(),
          manejo: item.manejo.toString(),
          manejopuxado: item.manejopuxado.toString(),
          salto04: item.salto04.toString(),
          salto06: item.salto06.toString(),
          salto08: item.salto08.toString(),
          salto09: item.salto09.toString(),
          salto1: item.salto1.toString(),
          salto11: item.salto11.toString(),
          salto12: item.salto12.toString(),
        });
      }}
    />
  );

  return (
    <Provider>
      <SafeAreaView style={defaultStlyes.container}>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : (
          <FlatList
            data={relatorios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRelatorio}
            style={styles.list}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        )}
        <DefButton
          onPress={() => {
            setModalVisible(true),
              setNovoRelatorio((prevState) => ({
                ...prevState,
                professorid: professor.id,
                nomeprofessor: professor.nome,
              }));
          }}
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

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modal}
          >
            <Text style={styles.modalHeader}>Criar Relatório</Text>

            <View style={{ gap: 12, marginBottom: 12 }}>
              <LightGrayInputText
                label={"Título"}
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    titulo: value,
                  }))
                }
                value={novoRelatorio.titulo}
              />

              <DropDownPicker
                open={open}
                value={selectedCliente}
                items={clientes}
                setOpen={setOpen}
                setValue={(value) => {
                  setSelectedCliente(value);
                }}
                setItems={setClientes}
                placeholder="Selecione um Aluno"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />

              <LightGrayInputText
                label={"Equitação"}
                keyboardType="numeric"
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    equitacao: value,
                  }))
                }
                value={novoRelatorio.equitacao}
              />

              <LightGrayInputText
                label={"Manejo"}
                keyboardType="numeric"
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    manejo: value,
                  }))
                }
                value={novoRelatorio.manejo}
              />

              <LightGrayInputText
                label={"Manejo Puxado"}
                keyboardType="numeric"
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    manejopuxado: value,
                  }))
                }
                value={novoRelatorio.manejopuxado}
              />
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <LightGrayInputText
                  label={"0,40"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto04: value,
                    }))
                  }
                  value={novoRelatorio.salto04}
                />
                <LightGrayInputText
                  label={"0,60"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto06: value,
                    }))
                  }
                  value={novoRelatorio.salto06}
                />

                <LightGrayInputText
                  label={"0,80"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto08: value,
                    }))
                  }
                  value={novoRelatorio.salto08}
                />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <LightGrayInputText
                  label={"0,90"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto09: value,
                    }))
                  }
                  value={novoRelatorio.salto09}
                />
                <LightGrayInputText
                  label={"1,00"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto1: value,
                    }))
                  }
                  value={novoRelatorio.salto1}
                />
                <LightGrayInputText
                  label={"1,10"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto11: value,
                    }))
                  }
                  value={novoRelatorio.salto11}
                />
              </View>
              <LightGrayInputText
                label={"1,20"}
                keyboardType="numeric"  
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    salto12: value,
                  }))
                }
                value={novoRelatorio.salto12}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button
                icon="content-save"
                children="Salvar"
                mode="contained"
                theme={{ colors: { primary: "#53C64D" } }}
                onPress={() => {
                  if (!selectedCliente) {
                    Alert.alert(
                      "Erro",
                      "Selecione um aluno para criar o relatório."
                    );
                    return;
                  }
                  const relatorioCompleto = {
                    ...novoRelatorio,
                    userid: selectedCliente.id,
                    nomealuno: selectedCliente.nome,
                  };
                  tryCreateRelatorio(relatorioCompleto);
                }}
              />

              <Button
                icon="cancel"
                children="Cancelar"
                mode="outlined"
                theme={{ colors: { primary: "#E74848", outline: "#E74848" } }}
                onPress={() => {
                  setNovoRelatorio({
                    titulo: "",
                    nomeprofessor: "",
                    userid: "",
                    equitacao: 0,
                    manejo: 0,
                    manejopuxado: 0,
                    salto04: 0,
                    salto06: 0,
                    salto08: 0,
                    salto09: 0,
                    salto1: 0,
                    salto11: 0,
                    salto12: 0,
                  }),
                    setModalVisible(false);
                }}
              />
            </View>
          </Modal>
        </Portal>

        <Portal>
          <Modal
            visible={editVisible}
            onDismiss={() => setEditVisible(false)}
            contentContainerStyle={styles.modal}
          >
            <Text style={styles.modalHeader}>Editar Relatório</Text>

            <View style={{ gap: 12, marginBottom: 12 }}>
              <LightGrayInputText
                label={"Título"}
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    titulo: value,
                  }))
                }
                value={novoRelatorio.titulo}
              />

              <DropDownPicker
                open={open}
                value={selectedCliente}
                items={clientes}
                setOpen={setOpen}
                setValue={(value) => {
                  setSelectedCliente(value);
                }}
                setItems={setClientes}
                placeholder="Selecione um Aluno"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />

              <LightGrayInputText
                label={"Equitação"}
                keyboardType="numeric"
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    equitacao: value,
                  }))
                }
                value={novoRelatorio.equitacao}
              />

              <LightGrayInputText
                label={"Manejo"}
                keyboardType="numeric"
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    manejo: value,
                  }))
                }
                value={novoRelatorio.manejo}
              />

              <LightGrayInputText
                label={"Manejo Puxado"}
                keyboardType="numeric"
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    manejopuxado: value,
                  }))
                }
                value={novoRelatorio.manejopuxado}
              />
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <LightGrayInputText
                  label={"0,40"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto04: value,
                    }))
                  }
                  value={novoRelatorio.salto04}
                />
                <LightGrayInputText
                  label={"0,60"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto06: value,
                    }))
                  }
                  value={novoRelatorio.salto06}
                />

                <LightGrayInputText
                  label={"0,80"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto08: value,
                    }))
                  }
                  value={novoRelatorio.salto08}
                />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <LightGrayInputText
                  label={"0,90"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto09: value,
                    }))
                  }
                  value={novoRelatorio.salto09}
                />
                <LightGrayInputText
                  label={"1,00"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto1: value,
                    }))
                  }
                  value={novoRelatorio.salto1}
                />
                <LightGrayInputText
                  label={"1,10"}
                  keyboardType="numeric"
                  action={(value) =>
                    setNovoRelatorio((prevState) => ({
                      ...prevState,
                      salto11: value,
                    }))
                  }
                  value={novoRelatorio.salto11}
                />
              </View>
              <LightGrayInputText
                label={"1,20"}
                keyboardType="numeric"
                action={(value) =>
                  setNovoRelatorio((prevState) => ({
                    ...prevState,
                    salto12: value,
                  }))
                }
                value={novoRelatorio.salto12}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button
                icon="content-save"
                children="Salvar"
                mode="contained"
                theme={{ colors: { primary: "#53C64D" } }}
                onPress={() => {
                  if (!selectedCliente) {
                    Alert.alert(
                      "Erro",
                      "Selecione um aluno para editar o relatório."
                    );
                    return;
                  }
                  const relatorioCompleto = {
                    ...novoRelatorio,
                    userid: selectedCliente.id,
                    nomealuno: selectedCliente.nome,
                  };
                  tryEditRelatorio(idReport,relatorioCompleto);
                  toggleEditModal();
                }}
              />

              <Button
                icon="cancel"
                children="Cancelar"
                mode="outlined"
                theme={{ colors: { primary: "#E74848", outline: "#E74848" } }}
                onPress={() => {
                  setNovoRelatorio({
                    titulo: "",
                    nomeprofessor: "",
                    userid: "",
                    equitacao: 0,
                    manejo: 0,
                    manejopuxado: 0,
                    salto04: 0,
                    salto06: 0,
                    salto08: 0,
                    salto09: 0,
                    salto1: 0,
                    salto11: 0,
                    salto12: 0,
                  }),
                    setEditVisible(false);
                    setIdReport();
                }}
              />
            </View>
          </Modal>
        </Portal>
      </SafeAreaView>
    </Provider>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
  },
  list: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
  createButton: {
    marginTop: 16,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 0,
  },
  saveButton: {
    marginTop: 16,
  },
  accordion: {
    backgroundColor: "#f5f5f5",
    marginBottom: 16,
  },
  listItem: {
    paddingVertical: 8,
  },
  selectedItem: {
    backgroundColor: "#e0f7fa",
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
    marginBottom: -6.5,
  },
  dropdownContainer: {
    backgroundColor: "#ffffff",
    borderColor: "#cccccc",
  },
  selected: {
    marginTop: 20,
    fontSize: 16,
    color: "#333333",
  },
});
