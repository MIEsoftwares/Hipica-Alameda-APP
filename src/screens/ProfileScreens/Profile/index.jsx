import { Pressable } from "react-native";
import { Text, View } from "react-native";
import { Button, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import supabase from "../../../../database/SupabaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { width } from "../../../constants/Dimensions";

export default function Profile({ navigation }) {
  const [profileInfo, setProfileInfo] = useState({ nome: "", email: "" });
  const metadata = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setProfileInfo({
        nome: user.user_metadata.nome,
        email: user.email,
      });
      return;
    } catch (e) {
      return e;
    }
  };

  if (profileInfo.nome === "" || profileInfo.email === "") {
    metadata();
  }

  const logout = async () => {
    await AsyncStorage.removeItem("supabase_session")
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileStylePic}>
        <Ionicons name="person-circle" size={126} />

        <Button
          mode="text"
          children={
            <Text children="Trocar Foto" style={{ color: "#2BA6FF" }} />
          }
        />
      </View>

      <View>
        <View>
          <Pressable
            onPress={() => navigation.navigate("EmBreve")}
            style={styles.lineComponents}
          >
            <Text children="Nome" style={styles.titles} />
            <Text>{profileInfo.nome}</Text>
            <Icon source={"menu-right"} size={25} />
          </Pressable>
        </View>

        <View>
          <Pressable
            onPress={() => navigation.navigate("EmBreve")}
            style={styles.lineComponents}
          >
            <Text children="Senha" style={styles.titles} />
            <Text children="*******" />
            <Icon source={"menu-right"} size={25} />
          </Pressable>
        </View>

        <View>
          <Pressable
            onPress={() => navigation.navigate("EmBreve")}
            style={styles.lineComponents}
          >
            <Text children="Email" style={styles.titles} />
            <Text children={profileInfo.email} />
            <Icon source={"menu-right"} size={25} />
          </Pressable>
        </View>

        <View>
          <Pressable
            onPress={() => navigation.navigate("EmBreve")}
            style={styles.lineComponents}
          >
            <Text children="Proprietário" style={styles.titles} />

            <Icon source={"menu-right"} size={25} />
          </Pressable>
        </View>

        <View>
          <Pressable
            onPress={() => navigation.navigate("EmBreve")}
            style={styles.lineComponents}
          >
            <Text children="Financeiro" style={styles.titles} />
            <Text children="AAA" />
            <Icon source={"menu-right"} size={25} />
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 64}}>
        <Pressable
          style={{ alignSelf: "center"}}
          onPress={logout}
        >
          <Text children="Desconectar" style={{color: "#ff0000", fontSize: 16}}/>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
