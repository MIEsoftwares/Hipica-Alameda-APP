import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
import { Button, Icon, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import supabase from "../../../../database/SupabaseConfig"
import { useState } from "react";

export default function Profile({ navigation }) {
    
  const [ userData, setUserData ] = useState({});

  const getData = async () => {
    const {data: profile } = await supabase
    .from("profiles")
    .select("*")
    .single()
    
    setUserData({
      nome: profile.nome,
      email: profile.email,
    })
    return 
  }
  getData();



  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.profileStylePic}>

        <Image
          source={require("../../../assets/images/Logo2.png")}
          style={styles.image}
        />
        <Button
          mode="text"
          children={
            <Text children="Trocar Foto" style={{ color: "#2BA6FF" }} />
          }
        />
      </View>

      <View>

        <View>
            <Pressable onPress={() => navigation.navigate("EmBreve")} style={styles.lineComponents}>
                <Text children="Nome" style={styles.titles} />
                <Text>{userData.nome}</Text>
                <Icon source={"menu-right"} size={25} />
            </Pressable>
        </View>

        <View>
            <Pressable onPress={() => navigation.navigate("EmBreve")} style={styles.lineComponents}>
                <Text children="Senha" style={styles.titles} />
                <Text children="*******" />
                <Icon source={"menu-right"} size={25} />
            </Pressable>
        </View>

        <View>
            <Pressable onPress={() => navigation.navigate("EmBreve")} style={styles.lineComponents}>
                <Text children="Email" style={styles.titles} />
                <Text children={userData.email} />
                <Icon source={"menu-right"} size={25} />
            </Pressable>
        </View>

        <View>
            <Pressable onPress={() => navigation.navigate("EmBreve")} style={styles.lineComponents}>
                <Text children="Proprietário" style={styles.titles} />

                <Icon source={"menu-right"} size={25} />
            </Pressable>
        </View>

        <View>
            <Pressable onPress={() => navigation.navigate("EmBreve")} style={styles.lineComponents}>
                <Text children="Financeiro" style={styles.titles} />
                <Text children="AAA" />
                <Icon source={"menu-right"} size={25} />
            </Pressable>
        </View>

      </View>

    </SafeAreaView>
  );
}
