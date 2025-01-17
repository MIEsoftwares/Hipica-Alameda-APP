import { View, KeyboardAvoidingView, Image, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import LightGrayInputText from "../../../components/LightGrayInputText";
import LightGrayInputPasswordText from "../../../components/LightGrayInputPasswordText";
import { Button, Checkbox, SegmentedButtons, Text } from "react-native-paper";
import { useState } from "react";
import { signUpWithEmail } from "../../../../database/auth/register";
import Ionicons from "react-native-vector-icons/Ionicons";
import { height } from "../../../constants/Dimensions";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [hasHorse, setHasHorse] = useState(false);
  const [horseName, setHorseName] = useState("");
  const [lgpdTerm, setLgpdTerm] = useState(false);
  const [role, setRole] = useState("");
  const [page, setPage] = useState(0);
  const [tipoDeAula, setTipoDeAula] = useState("abaco");

  const [showError, setShowError] = useState({
    render: false,
    error: null,
  });

  const tryRegister = async (
    email,
    password,
    name,
    cpf,
    phone,
    hasHorse,
    horseName,
    role,
    tipoDeAula
  ) => {
    const error = await signUpWithEmail(
      email,
      password,
      name,
      cpf,
      phone,
      hasHorse,
      horseName,
      role,
      tipoDeAula
    );

    if (error.error) {
      setShowError({
        render: true,
        error: error.error?.message,
      });

      return;
    }
    Alert.alert("Sucesso!", "Novo usuário criado")
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {page === 1 && (
          <Pressable
            style={{ position: "absolute", left: 16 }}
            onPress={() => setPage(0)}
          >
            <Ionicons name="chevron-back" size={32} />
          </Pressable>
        )}
        <Image
          style={styles.logo}
          source={require("../../../assets/images/Logo1.png")}
        />
      </View>
      <Text style={styles.title}>Cadastro</Text>

      {page === 0 ? (
        <KeyboardAvoidingView
          behavior="position"
          enabled
          contentContainerStyle={styles.inputs}
        >
          <LightGrayInputText
            value={name}
            action={setName}
            placeholder="Nome Completo"
          />
          <LightGrayInputText
            value={email}
            action={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          <LightGrayInputPasswordText
            value={password}
            action={setPassword}
            placeholder="Senha"
          />
          <LightGrayInputPasswordText
            value={confirmPassword}
            action={setConfirmPassword}
            placeholder="Confirme sua senha"
          />

          <LightGrayInputText
            value={phone}
            action={setPhone}
            placeholder="Telefone"
            keyboardType="phone-pad"
            maxLength={11}
          />

          <Button
            disabled={
              name === "" ||
              email === "" ||
              password === "" ||
              confirmPassword === "" ||
              password !== confirmPassword ||
              JSON.stringify(phone).length - 2 < 11 ||
              phone === ""
                ? true
                : false
            }
            textColor="#FFFFFF"
            buttonColor="#000000"
            labelStyle={{ fontSize: 16 }}
            style={styles.buttonProceed}
            onPress={() => setPage(1)}
            children="Prosseguir"
          />
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView
          behavior="position"
          enabled
          contentContainerStyle={[styles.inputs, {marginBottom: 0}]}
        >
          <View style={styles.inputs}>
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
            <LightGrayInputText
              value={cpf}
              action={setCpf}
              placeholder="CPF"
              keyboardType="numeric"
              maxLength={11}
            />
            <Text style={styles.text}>É proprietário de cavalo?</Text>
            <View style={styles.checkboxContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Checkbox
                  status={hasHorse ? "checked" : "unchecked"}
                  onPress={() => setHasHorse(!hasHorse)}
                  color="#000000"
                />
                <Text children="Sim" style={styles.text} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Checkbox
                  status={!hasHorse ? "checked" : "unchecked"}
                  onPress={() => setHasHorse(!hasHorse)}
                  color="#000000"
                />
                <Text children="Não" style={styles.text} />
              </View>
            </View>
            <LightGrayInputText
              value={horseName}
              action={setHorseName}
              placeholder="Nome do cavalo"
              disabled={!hasHorse}
            />
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              Termo de uso e política de privacidade
            </Text>
            <View style={styles.checkboxContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Checkbox
                  status={lgpdTerm ? "checked" : "unchecked"}
                  onPress={() => setLgpdTerm(!lgpdTerm)}
                  color="#000000"
                />
                <Text children="Li e concordo" style={styles.text} />
              </View>
            </View>

            <Button
              disabled={
                cpf === "" ||
                role === "" ||
                lgpdTerm === false ||
                JSON.stringify(cpf).length - 2 < 11
              }
              textColor="#FFFFFF"
              buttonColor="#000000"
              labelStyle={{ fontSize: 16 }}
              style={styles.buttonProceed}
              onPress={() =>
                tryRegister(
                  email,
                  password,
                  name,
                  cpf,
                  phone,
                  hasHorse,
                  horseName,
                  role
                )
              }
              children="Cadastrar"
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}
