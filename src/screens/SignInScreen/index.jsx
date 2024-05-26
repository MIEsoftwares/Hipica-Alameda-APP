import { View, Text, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import BlackInputText from "../../components/BlackInputText";
import BlackInputPassword from "../../components/BlackInputPassword";
import { Button } from "react-native-paper";
import { height, width } from "../../constants/Dimensions";
import { useState } from "react";
import { signInWithEmail } from "../../../database/auth/login";

export default function SignInScreen({ navigation }){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const updateEmail = () => {
        setEmail(email)
    }

    const updatePassword = () => {
        setPassword(password)
    }

    const [showError, setShowError] = useState({
        render: false,
        error: null
      })
    
      const closeError = () => {
        setShowError(prevState => ({
            ...prevState,
            render: false
        }))
      }
    
      async function tryLogin(email, password){
        const error = await signInWithEmail(email, password);
    
        if(error){
          setShowError({
            render: true,
            error: error
          });
    
          return;
        }
    
        navigation.navigate("Home");
      };


    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView style={styles.background} behaivor='position' enabled>

            {showError.render &&
                <View>
                  <Text style={{color: "red", marginTop: -height*0.2}}>{'\t'}{showError.error?.message}</Text>
                </View>
            }

                <Image style={styles.logo} source={require('../../assets/Logo2.png')}/>
                <View style={styles.inputTexts}>
                    <BlackInputText
                        value={email}
                        action={setEmail}
                        placeholder="Insira seu Email"
                    />
                    <BlackInputPassword
                        value={password}
                        action={setPassword}
                        placeholder="Insira sua senha"
                    />
                </View>

                <View style={{marginVertical: height*0.03}}>
                    <Button style={styles.loginButton}
                        textColor="#FFFFFF"
                        buttonColor="#0000CD"
                        onPress={() => tryLogin(email, password)}
                    >Entrar
                    </Button>
                </View>

                <View name='authbox'>
                </View>

                <View>
                    <View style={styles.footerViews}>
                        <Text>Esqueceu sua senha?</Text>
                        <Button style={{marginHorizontal: -10, padding: 0}} textColor="#0000CD" rippleColor="transparent"
                            onPress={() => console.log("botão de esqueceu a senha foi pressionado")}
                        >Clique aqui</Button>
                    </View>
                    <View style={styles.footerViews}>
                        <Text>Não possui cadastro?</Text>
                        <Button style={{marginHorizontal: -10, padding: 0}}textColor="#0000CD" rippleColor="transparent"
                            onPress={() => navigation.navigate("SignUp")}
                        >Clique aqui</Button>
                    </View>
                </View>   
                
            </KeyboardAvoidingView>

        </SafeAreaView>
    ); 
};