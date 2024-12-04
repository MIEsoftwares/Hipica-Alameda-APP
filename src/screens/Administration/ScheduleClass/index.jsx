import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AnnouncementCard from "../../../components/AnnouncementCard";
import { useEffect, useState } from "react";
import { Button, Searchbar } from "react-native-paper";
import supabase from "../../../../database/SupabaseConfig";
import defaultStyles from "../../../constants/defaultStyles";
import styles from "./styles";
import DefButton from "../../../components/DefButton";
import InputSelectDateTime from "../../../components/InputSelectDateTime";
import { height, width } from "../../../constants/Dimensions";
import DropDownPicker from "react-native-dropdown-picker";
import createSchedule from "../../../../database/actions/ScheduleClass/insertSchedule";
import updateSchedule from "../../../../database/actions/ScheduleClass/updateSchedule";

export default function ScheduleClass({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [data, setData] = useState();
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [id, setId] = useState("");
  const [alunos, setAlunos] = useState([]); // Lista de alunos para o dropdown
  const [selectedAlunos, setSelectedAlunos] = useState([]); // Alunos selecionados
  const [open, setOpen] = useState(false); // Controla a abertura do dropdown
  const [professores, setProfessores] = useState([]); // Lista de professores
  const [selectedProfessor, setSelectedProfessor] = useState(null); // Professor selecionado
  const [openProfessores, setOpenProfessores] = useState(false); // Controla a abertura do dropdown de professores
  const [aula, setAula] = useState({
    dia: "",
    alunos: [],
    idprofessor: "",
    status: "",
  });
  const [openStatus, setOpenStatus] = useState(false)
  const [status, setStatus] = useState()
  const [items, setItems] = useState([
    { label: "Cancelada", value: "cancelada" },
    { label: "Finalizada", value: "finalizada" },
    { label: "Pendente", value: "pendente" },
  ]);

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

  useEffect(() => {
    fetchItems();
    fetchAlunos();
    fetchProfessores();
  }, []);

  const tryCreateSchedule = async (schedule) => {
    await createSchedule(schedule);
    fetchItems();
  };

  const tryUpdateSchedule = async (id, newSchedule) => {
    const response = await updateSchedule(id, newSchedule);
    if (response) {
      fetchItems();
      setUpdateModalVisibility(false);
      setAula({ dia: "", alunos: [], idprofessor: "", status: "" });
      setSelectedAlunos(null);
      setSelectedProfessor(null);
    }
  };

  const fetchItems = async () => {
    const { data, error } = await supabase.from("aulas").select("*");

    if (error) {
      console.error("Erro ao buscar dados:", error);
    } else {
      setAllItems(data);
      setFilteredItems(data);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 4 }}>
      <AnnouncementCard
        title={`Aula do dia: ${formattedDate(item.dia)}`}
        imagem="noImage"
        status={item.status}
        onPress={() => {
          setAula((prevState) => ({
            ...prevState,
            dia: item.dia,
            alunos: item.alunos,
            idprofessor: item.idprofessor,
            status: item.status,
          }));
          setId(item.id);
          setSelectedAlunos(item.alunos);
          setSelectedProfessor(item.idprofessor);
          setStatus(item.status);
          setUpdateModalVisibility(true);
        }}
        icon="close-circle-outline"
        onIconPress={() =>{
          const updatedSchedule = {
          ...aula,
          dia: data,
          alunos: selectedAlunos,
          idprofessor: selectedProfessor,
          status: "cancelada",
        };
        tryUpdateSchedule(id, updatedSchedule);}}
      />
    </View>
  );

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

  const fetchAlunos = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, nome")
      .eq("role", "user"); // Filtra apenas alunos com role="user"

    if (error) {
      console.error("Erro ao buscar alunos:", error);
      Alert.alert("Erro", "Não foi possível carregar os alunos");
    } else {
      // Formata os dados para o DropdownPicker
      const formattedData = data.map((aluno) => ({
        label: aluno.nome,
        value: aluno.id, // Apenas o ID será armazenado no estado
      }));
      setAlunos(formattedData);
    }
  };

  const fetchProfessores = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, nome")
      .eq("role", "admin"); // Filtra apenas professores com role="admin"

    if (error) {
      console.error("Erro ao buscar professores:", error);
      Alert.alert("Erro", "Não foi possível carregar os professores");
    } else {
      // Formata os dados para o DropdownPicker
      const formattedData = data.map((professor) => ({
        label: professor.nome,
        value: professor.id,
      }));
      setProfessores(formattedData);
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
          <Text style={{ fontSize: 26, textAlign: "center" }}>Marcar Aula</Text>

          <View style={{ zIndex: open ? 1000 : 1 }}>
            <DropDownPicker
              open={open}
              value={selectedAlunos} // IDs dos alunos selecionados
              items={alunos} // Dados para o dropdown
              setOpen={setOpen}
              setValue={setSelectedAlunos}
              setItems={setAlunos}
              multiple={true} // Permitir múltiplas seleções
              mode="BADGE" // Mostra os selecionados como badges
              placeholder="Selecione os alunos"
              searchable={true} // Adiciona um campo de busca
              badgeColors={["#E57373", "#81C784"]} // Cores dos badges
              badgeDotColors={["#E53935", "#388E3C"]}
            />
          </View>

          <InputSelectDateTime setDate2={(test) => setData(test)} />

          <View style={{ zIndex: openProfessores ? 1000 : 1 }}>
            <DropDownPicker
              open={openProfessores}
              value={selectedProfessor} // ID do professor selecionado
              items={professores} // Dados para o dropdown
              setOpen={setOpenProfessores}
              setValue={setSelectedProfessor}
              setItems={setProfessores}
              multiple={false} // Permite apenas uma seleção
              placeholder="Selecione o professor"
              searchable={true} // Adiciona um campo de busca
            />
          </View>

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
              onPress={() => {
                const schedule = {
                  ...aula,
                  dia: data,
                  alunos: selectedAlunos,
                  idprofessor: selectedProfessor,
                  status: "pendente",
                };
                tryCreateSchedule(schedule);
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

  function updateModal() {
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

    return (
      <View style={styles.modal}>
        <Pressable
          style={styles.pressable}
          onPress={() => setUpdateModalVisibility(false)}
        />
        <View style={styles.form}>
          <Text style={{ fontSize: 26, textAlign: "center" }}>Editar Aula</Text>

          <View style={{ zIndex: open ? 1000 : 1 }}>
            <DropDownPicker
              open={open}
              value={selectedAlunos} // IDs dos alunos selecionados
              items={alunos} // Dados para o dropdown
              setOpen={setOpen}
              setValue={setSelectedAlunos}
              setItems={setAlunos}
              multiple={true} // Permitir múltiplas seleções
              mode="BADGE" // Mostra os selecionados como badges
              placeholder="Selecione os alunos"
              searchable={true} // Adiciona um campo de busca
              badgeColors={["#E57373", "#81C784"]} // Cores dos badges
              badgeDotColors={["#E53935", "#388E3C"]}
            />
          </View>

          <InputSelectDateTime
            label={formattedDate(aula.dia)}
            setDate2={(test) => setData(test)}
          />

          <View style={{ zIndex: openProfessores ? 1000 : 1 }}>
            <DropDownPicker
              open={openProfessores}
              value={selectedProfessor} // ID do professor selecionado
              items={professores} // Dados para o dropdown
              setOpen={setOpenProfessores}
              setValue={setSelectedProfessor}
              setItems={setProfessores}
              multiple={false} // Permite apenas uma seleção
              placeholder="Selecione o professor"
              searchable={true} // Adiciona um campo de busca
            />
          </View>
          <View style={{ zIndex: openStatus ? 1000 : 1 }}>
          <DropDownPicker
            open={openStatus}
            value={status}
            items={items}
            setOpen={setOpenStatus}
            setValue={setStatus}
            setItems={setItems}
            placeholder="Escolha o status"
          />
          </View>

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
              disabled={selectedAlunos.length === 0 || aula.status === ""}
              theme={{ colors: { primary: "#53C64D" } }}
              onPress={() => {
                const updatedSchedule = {
                  ...aula,
                  dia: data,
                  alunos: selectedAlunos,
                  idprofessor: selectedProfessor,
                  status: status,
                };
                tryUpdateSchedule(id, updatedSchedule);
              }}
            />
            <Button
              icon="cancel"
              children="Cancelar"
              mode="outlined"
              theme={{ colors: { primary: "#E74848", outline: "#E74848" } }}
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
        placeholder="Pesquise a data de uma aula"
        theme={{ colors: { elevation: { level3: "white" } } }}
        style={{ borderWidth: 1, borderRadius: 20 }}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <DefButton
        onPress={() => {
          setModalVisibility(true);
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

      {modalVisibility && openNewModal()}
      {updateModalVisibility && updateModal()}

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
