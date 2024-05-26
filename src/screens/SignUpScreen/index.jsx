import { View, Text, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import BlackInputText from "../../components/BlackInputText";
import BlackInputPassword from "../../components/BlackInputPassword";
import { Button } from "react-native-paper";
import { height, width } from "../../constants/Dimensions";

export default function SignUpScreen({ navigation }){
    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView style={styles.background} behaivor='position' enabled>

                <Image style={styles.logo} source={require('../../assets/Logo2.png')}/>
                <View style={styles.inputTexts}>
                    <BlackInputText
                        placeholder="Insira seu nome completo"
                    />
                    <BlackInputText
                        placeholder="Insira seu email"
                    />
                    <BlackInputPassword
                        placeholder="Insira sua senha"
                    />
                    <BlackInputPassword
                        placeholder="Confirme sua senha"
                    />
                </View>

                <View style={{marginVertical: height*0.03}}>
                    <Button style={styles.loginButton}
                        textColor="#FFFFFF"
                        buttonColor="#0000CD"
                        
                    >Cadastrar
                    </Button>
                </View>

                <View name='authbox'>
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