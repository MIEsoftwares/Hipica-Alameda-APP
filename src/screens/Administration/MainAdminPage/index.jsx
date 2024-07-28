import { SafeAreaView } from "react-native-safe-area-context";
import { Card, IconButton } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { height } from "../../../constants/Dimensions";
import styles from "../../../constants/defaultStyles";

export default function MainAdminPage ({navigation}){

    return (
        <SafeAreaView style={styles.container}> 
            <Card onPress={() => navigation.navigate("Register")} elevation={2} style={{marginBottom: height*0.015}}>
                <Card.Title
                    titleStyle={{marginBottom: 0, verticalAlign: "middle"}} 
                    title="Adicionar Usuário"
                    left={(props) => <Ionicons name="person-add" size={32}/>}
                    right={(props) => <IconButton {...props} icon="arrow-right" onPress={() => navigation.navigate("Register")} rippleColor="transparent"/>}
                    style={{backgroundColor:"#ffffff", borderRadius: 14}}
                />
            </Card>

            <Card onPress={() => navigation.navigate("ListUsers")} elevation={2} style={{marginBottom: height*0.015}}>
                <Card.Title
                    titleStyle={{marginBottom: 0, verticalAlign: "middle"}} 
                    title="Listar Usuários"
                    left={(props) => <Ionicons name="id-card-outline" size={40}/>}
                    right={(props) => <IconButton {...props} icon="arrow-right" onPress={() => navigation.navigate("ListUsers")} rippleColor="transparent"/>}
                    style={{backgroundColor:"#ffffff", borderRadius: 14}}
                />
            </Card>

            <Card onPress={() => navigation.navigate("NewAnnouncement")} elevation={2} style={{marginBottom: height*0.015}}>
                <Card.Title
                    titleStyle={{marginBottom: 0, verticalAlign: "middle"}} 
                    title="Adicionar comunicados"
                    left={(props) => <Ionicons name="add" size={40}/>}
                    right={(props) => <IconButton {...props} icon="arrow-right" onPress={() => navigation.navigate("NewAnnouncement")} rippleColor="transparent"/>}
                    style={{backgroundColor:"#ffffff", borderRadius: 14}}
                />
            </Card>
            
        </SafeAreaView>
    )
}