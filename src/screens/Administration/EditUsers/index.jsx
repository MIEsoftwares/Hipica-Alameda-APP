import { SafeAreaView } from "react-native-safe-area-context";
import {
  Card,
  Text,
  Title,
  Checkbox,
  SegmentedButtons,
  Button,
} from "react-native-paper";
import { useState } from "react";
import { Alert, View } from "react-native";
import { deleteUser } from "../../../../database/auth/delete";
import { updateUser } from "../../../../database/auth/update"
import styles from "./styles";
import defaultStyles from "../../../constants/defaultStyles";
import LightGrayInputText from "../../../components/LightGrayInputText";
import supabase from "../../../../database/SupabaseConfig";

export default function EditUsers({ route, navigation }) {
  const { item } = route.params;
  const [nome, setNome] = useState(item.nome);
  const [email, setEmail] = useState(item.email);
  const [cpf, setCpf] = useState(item.cpf);
  const [telefone, setTelefone] = useState(item.telefone);
  const [hasHorse, setHasHorse] = useState(item.proprietariodecavalo);
  const [horseName, setHorseName] = useState(item.nomedocavalo);
  const [role, setRole] = useState(item.role);
  const [id, setId] = useState("");

  async function tryDelete(id) {
    const error = await deleteUser(id);
    navigation.goBack();
    Alert.alert("Sucesso!", "Usuário excluído");

    return error;
  }

  async function tryUpdate(id) {
    const error = await updateUser(id, email, nome, cpf, telefone, hasHorse, horseName, role,)
    navigation.goBack();
    Alert.alert("Sucesso!", "Usuário atualizado");

    return error
  }

  async function getId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setId(user.id);
  }

  if (id === "") {
    getId();
  }

  return (
    <SafeAreaView
      style={[defaultStyles.containerWHeader, { backgroundColor: "white" }]}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <LightGrayInputText value={nome} action={setNome} label="Nome" />

          <LightGrayInputText value={email} action={setEmail} label="Email" />

          <LightGrayInputText
            value={telefone}
            action={setTelefone}
            label="Telefone"
            maxLength={11}
          />

          <LightGrayInputText
            value={cpf}
            action={setCpf}
            label="CPF"
            maxLength={11}
          />

          <Text variant="titleSmall">Nível de Acesso</Text>
          <SegmentedButtons
            value={role}
            onValueChange={setRole}
            theme={{
              colors: {
                secondaryContainer: "#000000",
                onSecondaryContainer: "#ffffff",
              },
            }}
            buttons={[
              {
                value: "cliente",
                label: "Cliente",
                style: { borderRadius: 8 },
              },
              {
                value: "professor",
                label: "Professor",
                style: { minWidth: 90 },
              },
              {
                value: "staff",
                label: "Staff",
              },
              {
                value: "admin",
                label: "Admin",
                style: { borderRadius: 8 },
              },
            ]}
          />

          <Text variant="titleSmall">É proprietário de cavalo?</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox.Item
              label="Sim"
              status={hasHorse ? "checked" : "uncheked"}
              onPress={() => setHasHorse(!hasHorse)}
              rippleColor="transparent"
              color="#000000"
            />
            <Checkbox.Item
              label="Não"
              status={!hasHorse ? "checked" : "uncheked"}
              onPress={() => setHasHorse(!hasHorse)}
              rippleColor="transparent"
              color="#000000"
            />
          </View>

          <LightGrayInputText
            value={horseName}
            action={setHorseName}
            label="Nome do Cavalo"
            disabled={!hasHorse}
          />
          <Card.Actions style={{ padding: 0, marginTop: 12 }}>
            <View style={styles.actionsContainer}>
              <Button
                disabled={
                  nome === "" ||
                  email === "" ||
                  telefone === "" ||
                  cpf === "" ||
                  role === "" ||
                  JSON.stringify(telefone).length - 2 < 11 ||
                  JSON.stringify(cpf).length - 2 < 11
                }
                icon="content-save"
                children="Salvar"
                mode="contained"
                theme={{ colors: { primary: "#53C64D" } }}
                onPress={() => {tryUpdate(item.id, email,  nome, cpf, telefone, hasHorse, horseName, role);
                }}
              />
              <Button
                icon="cancel"
                children="Cancelar"
                mode="outlined"
                theme={{ colors: { primary: "#000" } }}
                onPress={() => navigation.goBack()}
              />
              <Button
                disabled={item.id === id}
                icon="delete"
                children="Excluir"
                mode="outlined"
                theme={{ colors: { primary: "#E74848", outline: "#E74848" } }}
                onPress={() => tryDelete(item.id)}
              />
            </View>
          </Card.Actions>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}
