import { TouchableRipple } from "react-native-paper";
import defaultIcon from "../../assets/images/Logo2.png";
import { Avatar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";


export default function ProfileIcon({source}, {navigation = useNavigation()}) {

    const goToProfile = () => {
        navigation.navigate("Profile");
    }

    return (
        <TouchableRipple 
            onPress={() => goToProfile()}
            rippleColor="transparent"
            children={<Avatar.Image source={defaultIcon}/>}
        />
    );
}