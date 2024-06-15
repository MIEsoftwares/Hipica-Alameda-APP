import { View, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import LightGrayInputText from "../../../components/LightGrayInputText";
import LightGrayInputPasswordText from "../../../components/LightGrayInputPasswordText";
import { Button, Text } from "react-native-paper";
import { height } from "../../../constants/Dimensions";
import { useState } from "react";
import { signInWithEmail } from "../../../../database/auth/login";

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
        error: error.message,
      });
      
      return;
    }

    navigation.navigate("HomeTabs");
    return;
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
            <Text style={{marginTop: 8, color: "red"}}>
              {showError.error}
            </Text>
        )}
        </View>

        <View style={styles.loginBox}>
          <LightGrayInputText
            value={email}
            action={setEmail}
            placeholder="Email"
            error={showError.render}
            onChange={() => setShowError({...showError, render: false})}
          />
          <LightGrayInputPasswordText
            value={password}
            action={setPassword}
            placeholder="Senha"
            error={showError.render}
            onChange={() => setShowError({...showError, render: false})}
          />
          <Button
            style={{
              borderRadius: 12,
              height: height * 0.05,
              alignItems: "center",
              justifyContent: "center",
            }}
            textColor="#FFFFFF"
            buttonColor="#000000"
            children="Continuar"
            rippleColor="transparent"
            labelStyle={{fontSize: 16}}
            onPress={() => tryLogin(email, password)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
