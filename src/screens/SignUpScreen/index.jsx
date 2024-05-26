import { View, Text, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import BlackInputText from "../../components/BlackInputText";
import BlackInputPassword from "../../components/BlackInputPassword";
import { Button } from "react-native-paper";
import { height, width } from "../../constants/Dimensions";
import { useState } from "react";
import { signUpWithEmail } from "../../../database/auth/register";

export default function SignUpScreen({ navigation }){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showError, setShowError] = useState({
        render: false,
        error: null
      });

    const tryRegister = async (email, password, name) => {

        const error = await signUpWithEmail(email, password, name);

        if(error.error){
            setShowError({
              render: true,
              error: error.error?.message
            });

            return;
            
          }

        navigation.navigate("SignIn");
    };
    


    return (
        <SafeAreaView style={styles.container}>

                <KeyboardAvoidingView style={styles.background} behaivor='position' enabled>

                    {showError.render &&
                        <View>
                          <Text style={{color: "red", marginTop: -height*0.2}}>{'\t'}{showError.error}</Text>
                        </View>
                    }

                    <Image style={styles.logo} source={require('../../assets/Logo2.png')}/>
                    <View style={styles.inputTexts}>
                        <BlackInputText
                            value={name}
                            action={setName}
                            placeholder="Insira seu nome completo"
                        />
                        <BlackInputText
                            value={email}
                            action={setEmail}
                            placeholder="Insira seu email"
                        />
                        <BlackInputPassword
                            value={password}
                            action={setPassword}
                            placeholder="Insira sua senha"
                        />
                        <BlackInputPassword
                            value={confirmPassword}
                            action={setConfirmPassword}
                            placeholder="Confirme sua senha"
                        />
                    </View>

                    <View style={{marginVertical: height*0.03}}>
                        <Button style={styles.loginButton}
                            disabled={name === "" || email === "" || password === "" || confirmPassword === "" || password !== confirmPassword ? true : false}
                            textColor="#FFFFFF"
                            buttonColor="#0000CD"
                            onPress={() => tryRegister(email, password, name)}

                        >Cadastrar
                        </Button>
                    </View>

                    <View>
                        <View style={styles.footerViews}>
                            <Text>Já possui cadastro?</Text>
                            <Button style={{marginHorizontal: -10, padding: 0}}textColor="#0000CD" rippleColor="transparent"
                                onPress={() => navigation.navigate("SignIn")}
                            >Clique aqui</Button>
                        </View>
                    </View>   

                </KeyboardAvoidingView>


        </SafeAreaView>
    );
};