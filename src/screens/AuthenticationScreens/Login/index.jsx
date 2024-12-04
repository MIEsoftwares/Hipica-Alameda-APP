import { View, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import LightGrayInputText from "../../../components/LightGrayInputText";
import LightGrayInputPasswordText from "../../../components/LightGrayInputPasswordText";
import { Button, Text } from "react-native-paper";
import { height } from "../../../constants/Dimensions.js";
import { useState, useCallback } from "react";
import { signInWithEmail } from "../../../../database/auth/login";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkSession } from "../../../../database/AsyncStorageFunctions/checkSession.js";

export default function Login({ setToken }, { navigation = useNavigation() }) {
  const [loading, setLoading] = useState(true); // Estado para controle do carregamento
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState({
    render: false,
    error: null,
  });

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        setLoading(true); // Ativa o carregamento
        const response = await checkSession();
        if (response !== null) {
          navigation.navigate("HomeTabs");
          return;
        }
        setLoading(false); // Desativa o carregamento
      };
      loadData();
    }, [navigation])
  );

  const closeError = () => {
    setShowError((prevState) => ({
      ...prevState,
      render: false,
    }));
  };

  async function tryLogin(email, password) {
    const { data, error } = await signInWithEmail(email, password);

    if (error) {
      setShowError({
        render: true,
        error: error.message,
      });

      return;
    }

    setToken(data);
    await AsyncStorage.setItem("supabase_session", JSON.stringify(data.session));
    navigation.navigate("HomeTabs");
    return;
  }

  if (loading) {
    // Retorna apenas a imagem durante a verificação da sessão
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Image
            style={styles.loadingImage}
            source={require("../../../assets/images/Logo2.png")} // Substitua pelo caminho da sua imagem
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.allElements}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/Logo2.png")}
        />
        <View style={styles.TextView}>
          <Text
            children="Bem Vindo!"
            style={styles.Title}
            variant="titleMedium"
          />
          <Text
            children="Entre com sua conta Hípica"
            style={styles.SubTitle}
            variant="titleSmall"
          />
          {showError.render && (
            <Text style={{ marginTop: 8, color: "red" }}>
              {showError.error}
            </Text>
          )}
        </View>

        <KeyboardAvoidingView behavior="position" contentContainerStyle={styles.loginBox} style={styles.loginBox}>
          <LightGrayInputText
            value={email}
            action={setEmail}
            placeholder="Email"
            error={showError.render}
            onChange={() => setShowError({ ...showError, render: false })}
            keyboardType="email-address"
          />
          <LightGrayInputPasswordText
            value={password}
            action={setPassword}
            placeholder="Senha"
            error={showError.render}
            onChange={() => setShowError({ ...showError, render: false })}
          />
          <Button
            style={{
              borderRadius: 12,
              height: height * 0.05,
              justifyContent: "center",
            }}
            textColor="#FFFFFF"
            buttonColor="#000000"
            children="Continuar"
            rippleColor="transparent"
            labelStyle={{ fontSize: 16 }}
            onPress={() => tryLogin(email, password)}
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
