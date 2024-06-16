import { TouchableRipple } from "react-native-paper";
import defaultIcon from "../../assets/images/Logo2.png";
import { Avatar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";


export default function ProfileIcon({source}, {navigation = useNavigation()}) {

    return (
        <TouchableRipple 
            onPress={() => navigation.navigate("Profile")}
            rippleColor="transparent"
            children={<Avatar.Image source={defaultIcon}/>}
        />
    );
}

