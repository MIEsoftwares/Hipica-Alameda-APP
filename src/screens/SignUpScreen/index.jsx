import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { goTo, goToSignInScreen } from "../../constants/NavigationFunctions/MovingBetweenScreens";


export default function SignUpScreen({ navigation }){
    return (
        <SafeAreaView>
            <Text>Cadastro</Text>
            <Button
                title="Ir para o Login"
                onPress={() => navigation.navigate("SignIn")}
            />
        </SafeAreaView>
    ); 
};