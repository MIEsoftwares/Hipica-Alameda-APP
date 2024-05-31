import { View, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import LightGrayInputText from "../../components/LightGrayInputText";
import LightGrayInputPasswordText from "../../components/LightGrayInputPasswordText";
import { Button, Checkbox, Text } from "react-native-paper";
import { useState } from "react";
import { signUpWithEmail } from "../../../database/auth/register";
import { height } from "../../constants/Dimensions";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState();
  const [hasHorse, setHasHorse] = useState(false);
  const [horseName, setHorseName] = useState("");
  const [lgpdTerm, setLgpdTerm] = useState()
  const [page, setPage] = useState(1);


  const [showError, setShowError] = useState({
    render: false,
    error: null,
  });

  const tryRegister = async (email, password, name) => {
    const error = await signUpWithEmail(email, password, name);

    if (error.error) {
      setShowError({
        render: true,
        error: error.error?.message,
      });

      return;
    }

    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>

      <Image style={styles.logo} source={require("../../assets/images/Logo1.png")}/>

      <Text style={styles.title}>Cadastro</Text>

      
      {page === 0 ?
        <View> 
          <KeyboardAvoidingView behavior="position" enabled >
            <View style={styles.inputs}>
              <LightGrayInputText
                value={name}
                action={setName}
                placeholder="Nome Completo"
              />
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
              <LightGrayInputPasswordText
                value={confirmPassword}
                action={setConfirmPassword}
                placeholder="Confirme sua senha"
              />
            </View>
          </KeyboardAvoidingView>
          <Button
            disabled={ name === "" || email === "" || password === "" || confirmPassword === "" || password !== confirmPassword? true : false}
            textColor="#FFFFFF"
            buttonColor="#000000"
            labelStyle={{fontSize: 16}}
            style={styles.buttonProceed}
            onPress={() => setPage(1)}
          >
            Prosseguir
          </Button> 
        </View> 
      : 
        <View>
          <KeyboardAvoidingView behavior="position" enabled>
            <View style={styles.inputs}>
              <LightGrayInputText
                value={phone}
                action={setPhone}
                placeholder="Telefone"
              />
              <LightGrayInputText
                value={cpf}
                action={setCpf}
                placeholder="CPF"
              />
              <Text style={styles.text}>É proprietário de cavalo?</Text>
              <View style={styles.checkboxContainer}>
                 <View style={{flexDirection: "row", alignItems: "center", height: "100%"}}> 
                    <Checkbox status={hasHorse ? "checked" : "unchecked"} onPress={() => setHasHorse(!hasHorse)} color="#000000"/>
                    <Text children="Sim" style={styles.text}/>
                 </View>
                 <View style={{flexDirection: "row", alignItems: "center", height: "100%"}}> 
                    <Checkbox status={!hasHorse ? "checked" : "unchecked"} onPress={() => setHasHorse(!hasHorse)} color="#000000"/>
                    <Text children="Não" style={styles.text}/>
                 </View>
              </View>
              <LightGrayInputText
                value={horseName}
                action={setHorseName}
                placeholder="Nome do cavalo"
                disabled={!hasHorse}
              />
              <Text style={{fontSize: 16, textAlign: "center",}}>Termo de uso e política de privacidade</Text>
              <View style={styles.checkboxContainer}>
                <View style={{flexDirection: "row", alignItems: "center", height: "100%"}}> 
                  <Checkbox status={lgpdTerm ? "checked" : "unchecked"} onPress={() => setLgpdTerm(!lgpdTerm)} color="#000000"/>
                  <Text children="Li e concordo" style={styles.text}/>
                </View>
              </View>
            </View>
            <Button
              disabled={ phone === "" || cpf === "" || horseName === "" || lgpdTerm === false}
              textColor="#FFFFFF"
              buttonColor="#000000"
              labelStyle={{fontSize: 16}}
              style={styles.buttonProceed}
              onPress={() => setPage(1)}
            >
              Cadastrar
            </Button>
          </KeyboardAvoidingView>          
        </View>
      }
      
      
      
      <View style={styles.footer}>
        <Text children="Já possui uma conta?" style={{color: "#828282"}}/>
        <Button style={{marginHorizontal: -8, }} children={<Text style={{ textWeight: "bold", textDecorationLine: "underline", color: "#0000CD" }} children="Clique aqui" onPress={() => navigation.navigate("Login")}/>}>
        </Button>
      </View>
      
    </SafeAreaView>
  );
}
