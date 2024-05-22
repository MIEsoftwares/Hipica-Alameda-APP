import { View, Text, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import BlackInputText from "../../components/BlackInputText";
import BlackInputPassword from "../../components/BlackInputPassword";
import { Button } from "react-native-paper";
import { height, width } from "../../constants/Dimensions";

export default function SignInScreen({ navigation }){
    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView style={styles.background} behaivor='position' enabled>

                <View style={styles.inputTexts}>
                    <BlackInputText
                        placeholder="Insira seu Email"
                    />
                    <BlackInputPassword
                        placeholder="Insira sua senha"
                    />
                </View>

                <View style={{marginVertical: height*0.03}}>
                    <Button style={styles.loginButton}
                        textColor="#FFFFFF"
                        buttonColor="#0000CD"
                        
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