import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AnnouncementCard from "../../../components/AnnouncementCard";
import { useEffect, useState } from "react";
import { Button, Icon, Searchbar } from "react-native-paper";
import supabase from "../../../../database/SupabaseConfig";
import defaultStyles from "../../../constants/defaultStyles";
import styles from "./styles";
import { insertAnnouncement } from "../../../../database/actions/Announcement/insertAnnouncement";
import { updateAnnouncement } from "../../../../database/actions/Announcement/updateAnnouncement";
import { deleteAnnouncement } from "../../../../database/actions/Announcement/deleteAnnouncement";
import DefButton from "../../../components/DefButton";
import LightGrayInputText from "../../../components/LightGrayInputText";
import InputSelectDateTime from "../../../components/InputSelectDateTime";
import { height, width } from "../../../constants/Dimensions";
import * as ImagePicker from "expo-image-picker";
import uploadImage from "../../../../database/bucket/uploadImage";
import getPublicUrl from "../../../../database/bucket/getPublicUrl";

export default function NewAnnouncement({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [link, setLink] = useState();
  const [data, setData] = useState();
  const [id, setId] = useState();
  const [updateModalVisibility, setUpdateModalVisibility] = useState(false);
  const [photoMethodModal, setPhotoMethodModal] = useState(false);
  const [photoUri, setPhotoUri] = useState("");

  const update = async (id, titulo, desc, data, link, uri) => {
    await updateAnnouncement(id, titulo, desc, data, link, uri);
    fetchItems();
  };

  const tryUptadeAnnouncement = async () => {
    try {
      await uploadImage(photoUri, "Announcement-Images").then(async (path) => {
        await update(id, title, description, data, link, path);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const togglePhotoMethodModal = () => {
    setPhotoMethodModal(!photoMethodModal);
  };

  const setImage = (uri) => {
    try {
      setPhotoUri(uri);
    } catch (error) {
      console.log(error);
    }
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
      alert("erro ao salvar a imagem: " + error);
    }
  };

  const newAnnouncement = async (titulo, desc, created, data, link, imagem) => {
    imagem = await uploadImage(imagem, "Announcement-Images");
    await insertAnnouncement(titulo, desc, created, data, link, imagem);
    fetchItems();
  };

  const deleteAnn = async (id) => {
    await deleteAnnouncement(id);
    fetchItems();
  };

  const fetchItems = async () => {
    const { data, error } = await supabase.from("comunicados").select("*");

    if (error) {
      console.error("Erro ao buscar dados:", error);
    } else {
      setAllItems(data);
      setFilteredItems(data);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 4 }}>
      <AnnouncementCard
        title={item.titulo}
        admin={true}
        description={item.descricao}
        event_date={item.data_evento}
        imagem={item.imagem}
        bucket="Announcement-Images"
        onPress={() => {
          setTitle(item.titulo);
          setDescription(item.descricao);
          setData(item.data_evento);
          setLink(item.link_externo);
          setUpdateModalVisibility(true);
          setId(item.id);
          setImage(item.imagem);
        }}
        onIconPress={() => deleteAnn(item.id)}
      />
    </View>
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = allItems.filter((item) =>
        item.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(allItems);
    }
  };

  function openNewModal() {
    return (
      <View style={styles.modal}>
        <Pressable
          style={styles.pressable}
          onPress={() => setModalVisibility(false)}
        />
        <View style={styles.form}>
          <Text style={{ fontSize: 26, textAlign: "center" }}>
            Novo Comunicado
          </Text>
          {photoUri !== undefined && (
            <View style={styles.selectedPhotoContainer}>
              <Image
                style={{ resizeMode: "contain", width: "100%", height: "100%" }}
                source={{ uri: photoUri }}
              />
            </View>
          )}
          <DefButton
            style={{ alignSelf: "center" }}
            children="Selecione sua imagem"
            onPress={togglePhotoMethodModal}
          />
          <LightGrayInputText
            label={"Título:"}
            action={setTitle}
            value={title}
          />

          <LightGrayInputText
            label={"Descrição:"}
            action={setDescription}
            value={description}
          />

          <LightGrayInputText
            label={"Link:"}
            style={{ marginBottom: 8 }}
            action={setLink}
            value={link}
          />

          <InputSelectDateTime setDate2={(test) => setData(test)} />

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              icon="content-save"
              children="Salvar"
              mode="contained"
              theme={{ colors: { primary: "#53C64D" } }}
              disabled={title === undefined || description === undefined}
              onPress={() => {
                newAnnouncement(
                  title,
                  description,
                  new Date().toISOString(),
                  data,
                  link,
                  photoUri
                );
                fetchItems();
                setModalVisibility(false);
              }}
            />
            <Button
              icon="cancel"
              children="Cancelar"
              mode="contained"
              theme={{ colors: { primary: "#ff0000" } }}
              onPress={() => setModalVisibility(false)}
            />
          </View>
        </View>
      </View>
    );
  }
  function openPhotoMethodModal() {
    return (
      <View style={[styles.modal, { zIndex: 10 }]}>
        <Pressable
          style={[styles.pressable]}
          onPress={togglePhotoMethodModal}
        />
        <View style={styles.form}>
          <Text style={{ fontSize: 26, textAlign: "center" }}>
            Selecione a foto
          </Text>
          <View style={styles.photoMethodForm}>
            <Pressable
              style={styles.photoMethodButton}
              onPress={() => uploadImageCamera()}
            >
              <Icon source="camera" size={45} color="#999999" />
              <Text children="Camera" style={{ color: "#999999" }} />
            </Pressable>
            <Pressable
              style={styles.photoMethodButton}
              onPress={() => uploadImageCamera("gallery")}
            >
              <Icon source="folder" size={45} color="#999999" />
              <Text children="Galeria" style={{ color: "#999999" }} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  function updateModal() {
    const formattedDate = (date) => {
      if (!date) return "";
      const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedTime = new Date(date).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${formattedDate} ${formattedTime}`;
    };

    return (
      <View style={styles.modal}>
        <Pressable
          style={styles.pressable}
          onPress={() => setUpdateModalVisibility(false)}
        />
        <View style={styles.form}>
          <Text style={{ fontSize: 26, textAlign: "center" }}>
            Editar Anúncio
          </Text>
          {photoUri !== null && (
            <View style={styles.selectedPhotoContainer}>
              <Image
                style={{ resizeMode: "contain", width: "100%", height: "100%" }}
                source={{
                  uri:
                    photoUri[0] === "f" &&
                    photoUri[1] === "i" &&
                    photoUri[2] === "l" &&
                    photoUri[3] === "e"
                      ? photoUri
                      : getPublicUrl("Announcement-Images", photoUri),
                }}
              />
            </View>
          )}
          <DefButton
            children="Selecione sua imagem"
            labelStyle={{ fontSize: 18 }}
            style={{ alignSelf: "center", marginTop: 4 }}
            onPress={togglePhotoMethodModal}
          />

          <LightGrayInputText
            label={"Título:"}
            action={setTitle}
            value={title}
          />

          <LightGrayInputText
            label={"Descrição:"}
            action={setDescription}
            value={description}
          />

          <LightGrayInputText
            label={"Link:"}
            style={{ marginBottom: 8 }}
            action={setLink}
            value={link}
          />

          <InputSelectDateTime
            label={formattedDate(data)}
            setDate2={(test) => setData(test)}
          />

          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              icon="content-save"
              children="Salvar"
              mode="contained"
              theme={{ colors: { primary: "#53C64D" } }}
              onPress={() => {
                tryUptadeAnnouncement();
                setUpdateModalVisibility(false);
              }}
            />
            <Button
              icon="cancel"
              children="Cancelar"
              mode="contained"
              theme={{ colors: { primary: "#ff0000" } }}
              onPress={() => setUpdateModalVisibility(false)}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={defaultStyles.containerWHeader}>
      {photoMethodModal && openPhotoMethodModal()}
      <Searchbar
        placeholder="Pesquise um comunicado"
        theme={{ colors: { elevation: { level3: "white" } } }}
        style={{ borderWidth: 1, borderRadius: 20 }}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <DefButton
        onPress={() => {
          setModalVisibility(true);
          setTitle(undefined);
          setDescription(undefined);
          setData(undefined);
          setLink(undefined);
          setImage(undefined);
        }}
        icon={<Ionicons name="add" size={48} color="#FFFFFF" />}
        style={{
          alignSelf: "flex-end",
          marginTop: 12,
          position: "absolute",
          bottom: height * 0.01,
          right: width * 0.025,
          zIndex: 5,
          minWidth: 1,
          minHeight: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        labelStyle={{ fontSize: 20 }}
      />

      {modalVisibility && openNewModal()}
      {updateModalVisibility && updateModal()}

      <View style={styles.cardView}>
        <FlatList
          style={{ flexGrow: 1, height: height * 0.76 }}
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}
