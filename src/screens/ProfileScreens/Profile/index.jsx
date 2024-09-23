import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
import { Button, Icon, ActivityIndicator } from "react-native-paper"; // Adicionando o ActivityIndicator
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import supabase from "../../../../database/SupabaseConfig";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import uploadImage from "../../../../database/bucket/uploadImage";
import updateProfilePic from "../../../../database/actions/Profile/updateProfilePic";

export default function Profile({ navigation }) {
  const [profileInfo, setProfileInfo] = useState({
    nome: "",
    email: "",
    id: "",
    imagem: "",
  });
  const [photoMethodModal, setPhotoMethodModal] = useState(false);
  const [photoUri, setPhotoUri] = useState("");
  const [loading, setLoading] = useState(true); // Variável de estado para controlar o carregamento

  useEffect(() => {
    const getPublicUrl = (url) => {
      const { data } = supabase.storage.from("Profile-Images").getPublicUrl(url);
      return data.publicUrl;
    };

    const fetchImage = async (id) => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("imagem")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar a imagem:", error.message);
        return null;
      }

      return data.imagem;
    };

    const fetchMetadata = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const userImage = await fetchImage(user.id);

        setProfileInfo({
          nome: user.user_metadata.nome,
          email: user.email,
          id: user.id,
          imagem: getPublicUrl(userImage) || "none",
        });
        setLoading(false);
      } catch (e) {
        console.error("Erro ao buscar metadados do usuário:", e);
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("supabase_session");
    navigation.navigate("Login");
  };

  const togglePhotoMethodModal = () => {
    setPhotoMethodModal(!photoMethodModal);
  };

  const uploadImageCamera = async (mode) => {
    try {
      let result = {};

      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      alert("Erro ao salvar a imagem: " + error);
    }
  };

  const setImage = (uri) => {
    try {
      setPhotoUri(uri);
    } catch (error) {
      console.log(error);
    }
  };

  const tryUpdateProfilePic = () => {
    try {
      uploadImage(photoUri, "Profile-Images").then(async (path) =>
        updateProfilePic(profileInfo.id, path).then(setPhotoMethodModal(togglePhotoMethodModal))
      );
    } catch (error) {
      alert(`Error ao tentar selecionar imagem ${error}`);
      return null;
    }
  };

  function openPhotoMethodModal() {
    return (
      <View style={styles.modal}>
        <Pressable style={styles.pressable} onPress={togglePhotoMethodModal} />
        <View style={styles.form}>
          {photoUri && (
            <Image source={{ uri: photoUri }} style={styles.imagePreview} />
          )}
          <Text style={{ fontSize: 26, textAlign: "center" }}>
            Selecione a foto
          </Text>
          <View style={styles.photoMethodForm}>
            <Pressable
              style={styles.photoMethodButton}
              onPress={() => uploadImageCamera()}
            >
              <Icon source="camera" size={45} color="#999999" />
              <Text style={{ color: "#999999" }}>Camera</Text>
            </Pressable>
            <Pressable
              style={styles.photoMethodButton}
              onPress={() => uploadImageCamera("gallery")}
            >
              <Icon source="folder" size={45} color="#999999" />
              <Text style={{ color: "#999999" }}>Galeria</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 25,
            }}
          >
            <Button
              children="Cancelar"
              icon="cancel"
              mode="contained"
              style={{ alignSelf: "flex-end" }}
              onPress={togglePhotoMethodModal}
              theme={{ colors: { primary: "red" } }}
            />
            <Button
              children="Salvar"
              icon="content-save"
              mode="contained"
              style={{ alignSelf: "flex-end" }}
              onPress={tryUpdateProfilePic}
              theme={{ colors: { primary: "green" } }}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
       
        <>
          <View style={styles.profileStylePic}>
            {profileInfo.imagem !== "none" ? (
              <Image style={styles.profilePic} source={{ uri: profileInfo.imagem }} />
            ) : (
              <Ionicons name="person-circle" size={126} />
            )}
            <Button
              mode="text"
              children={<Text style={{ color: "#2BA6FF" }}>Trocar Foto</Text>}
              onPress={togglePhotoMethodModal}
            />
          </View>

          {photoMethodModal && openPhotoMethodModal()}

          <View>
            <Pressable
              onPress={() => navigation.navigate("EmBreve")}
              style={styles.lineComponents}
            >
              <Text style={styles.titles}>Nome</Text>
              <Text>{profileInfo.nome}</Text>
              <Icon source={"menu-right"} size={25} />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("EmBreve")}
              style={styles.lineComponents}
            >
              <Text style={styles.titles}>Senha</Text>
              <Text children="*******" />
              <Icon source={"menu-right"} size={25} />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("EmBreve")}
              style={styles.lineComponents}
            >
              <Text style={styles.titles}>Email</Text>
              <Text>{profileInfo.email}</Text>
              <Icon source={"menu-right"} size={25} />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("EmBreve")}
              style={styles.lineComponents}
            >
              <Text style={styles.titles}>Proprietário</Text>
              <Icon source={"menu-right"} size={25} />
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Planos")}
              style={styles.lineComponents}
            >
              <Text style={styles.titles}>Planos</Text>
              <Icon source={"menu-right"} size={25} />
            </Pressable>
          </View>

          <View style={{ marginTop: 64 }}>
            <Pressable style={{ alignSelf: "center" }} onPress={logout}>
              <Text
                children="Desconectar"
                style={{ color: "#ff0000", fontSize: 16 }}
              />
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
