import { Image } from "react-native";
import styles from "./styles";


export default function ProfileIcon({source}) {
    return (
        <Image style={styles.profileIcon} source={source}/>
    );
}