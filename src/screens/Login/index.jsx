import { View, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import LightGrayInputText from "../../components/LightGrayInputText";
import LightGrayInputPasswordText from "../../components/LightGrayInputPasswordText";
import { Button, Text } from "react-native-paper";
import { height } from "../../constants/Dimensions";
import { useState } from "react";
import { signInWithEmail } from "../../../database/auth/login";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState({
    render: false,
    error: null,
  });

  const closeError = () => {
    setShowError((prevState) => ({
      ...prevState,
      render: false,
    }));
  };

  async function tryLogin(email, password) {
    const error = await signInWithEmail(email, password);

    if (error) {
      setShowError({
        render: true,
        error: error,
      });

      return;
    }

    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.container}>
      {showError.render && (
        <View>
          <Text style={{ color: "red", marginTop: -height * 0.2 }}>
            {"\t"}
            {showError.error?.message}
          </Text>
        </View>
      )}
      <Image
        style={styles.logo}
        source={require("../../assets/images/Logo2.png")}
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
      </View>
      <View style={styles.loginBox}>
        <LightGrayInputText
          value={email}
          action={setEmail}
          placeholder="Email"
        />
        <LightGrayInputPasswordText
          value={password}
          action={setPassword}
          placeholder="Senha"
        />
        <Button
          style={{
            borderRadius: 6,
            height: height * 0.05,
            alignItems: "center",
            justifyContent: "center",
          }}
          textColor="#FFFFFF"
          buttonColor="#000000"
          children="Continuar"
          rippleColor="transparent"
          onPress={() => tryLogin(email, password)}
        />
      </View>

      <View style={styles.ViewOrContinueWith}>
        <View
          style={styles.line}
          children={<Text children="******************" />}
        />
        <Text
          style={{ color: "#929292", marginHorizontal: 5 }}
          children=" ou continue com "
        />
        <View
          style={styles.line}
          children={<Text children="******************" />}
        />
      </View>

      <View style={styles.footerViews}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ color: "#828282" }}
            children="Não possui uma conta ainda?"
          />
          <Button
            children={
              <Text style={{ textWeight: "bold" }} children="Cadastre-se" />
            }
            style={{ marginHorizontal: -10, marginTop: -8.75 }}
            textColor="#828282"
            rippleColor="transparent"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
        <Button
          children={
            <Text
              style={{ textWeight: "bold" }}
              children="Termos de uso e política de condições"
            />
          }
          style={{ marginHorizontal: -10, marginTop: -8.75 }}
          textColor="#828282"
          rippleColor="transparent"
          // onPress={() => navigation.navigate("")} Linkar para alguma página de termos de uso que mostre
          // que nosso sistema concorde com o termo LGPD
        />
      </View>
    </SafeAreaView>
  );
}
