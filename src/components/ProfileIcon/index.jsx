import { ImageBackground } from "react-native";
import styles from "./styles";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


export default function ProfileIcon({source}, {navigation = useNavigation()}) {

    const goToProfile = () => {
        navigation.navigate("Profile");
    }

    return (
        <TouchableRipple onPress={() => goToProfile()} style={styles.profileIcon}
            children={<ImageBackground source={source}/>}
            rippleColor="transparent"
        />
    );
}