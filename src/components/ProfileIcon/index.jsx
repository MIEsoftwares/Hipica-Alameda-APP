import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { Image } from "react-native";

export default function ProfileIcon(props, { navigation = useNavigation() }) {

  return (
    <TouchableRipple
      style={styles.profileIcon}
      onPress={() => {
        navigation.navigate("Profile");
      }}
      rippleColor="transparent"
    >
      {props.profile === "none" ? (
        <Ionicons name="person-circle" size={48} />
      ) : (
        <Image style={styles.profileRenderIcon} source={{ uri: props.profile }} />
      )}
    </TouchableRipple>
  );
}
