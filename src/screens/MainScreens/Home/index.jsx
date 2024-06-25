import { useEffect } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import ProfileIcon from "../../../components/ProfileIcon"; 
import SearchBar from "../../../components/SearchBar";
import { Text } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

export default function Home({ navigation }){

    const isFocused = useIsFocused();

    useEffect(
        () => {
            if(isFocused){
                const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
                        e.preventDefault();
                    })

                return beforeRemoveListener
                };
        },[isFocused, navigation]
    );
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <SearchBar/>
                <ProfileIcon source={require('../../../assets/images/Logo1.png')}/>
            </View>
            <View style={{alignItems: "center", justifyContent: "center", flexDirection: "column" , flex: 1}}>
                <Image style={styles.image} source={require('../../../assets/images/home-inicial-photo.png')}/>
                <Text style={styles.titleWhileHasNothing} children="Você encontrará notificações aqui"/>
                <Text style={styles.subtitleWhileHasNothing} children="Fique por dentro de atividades relevantes, como comunicados, agenda e notificações de eventos e aulas."/>
            </View>

        </SafeAreaView>
    ); 
}