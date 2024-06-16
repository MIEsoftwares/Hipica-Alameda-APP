import { TouchableRipple } from "react-native-paper";
import { Avatar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function ProfileIcon({navigation = useNavigation()}) {

    return (
        <TouchableRipple 
            onPress={() => navigation.navigate("Profile")}
            rippleColor="transparent"
            children={<Ionicons name="person-circle" size={48}/>}
        />
    );
}

