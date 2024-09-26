import { TouchableRipple } from "react-native-paper";
import { Avatar } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./styles";
import supabase from "../../../database/SupabaseConfig";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";


export default function ProfileIcon({navigation = useNavigation()}) {
    const [profile, setProfile] = useState("none");
    
    const getPublicUrl = (id) => {
        const { data } = supabase.storage.from("Profile-Images").getPublicUrl(id);
        return data.publicUrl;
    };
    
    AsyncStorage.getItem("profile-icon").then((data) => data !== "none" && getPublicUrl(data)).then((data) => setProfile(data))
    
    return (
        <TouchableRipple style={styles.profileIcon}
            onPress={() => {
                navigation.navigate("Profile")
            }}
            rippleColor="transparent"
            children={profile === "none" ? <Ionicons name="person-circle" size={48}/> : <Image style={styles.profileRenderIcon} source={ { uri: profile}}/>}
        />
    );
}

