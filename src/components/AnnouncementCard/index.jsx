import React from "react";
import { View, Pressable, Image, Text } from "react-native";
import styles from "./styles";
import Teste from "../../assets/images/logo_default_card.png";
import { IconButton, MD3Colors } from "react-native-paper";
import { height } from "../../constants/Dimensions";

// Função para formatar a data e o horário
const formatDateTime = (date) => {
  if (!date) return "";
  const eventDate = new Date(date);
  
  const day = String(eventDate.getDate()).padStart(2, '0');
  const month = String(eventDate.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
  const year = eventDate.getFullYear();
  
  const hours = String(eventDate.getHours()).padStart(2, '0');
  const minutes = String(eventDate.getMinutes()).padStart(2, '0');
  
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;
  
  return { formattedDate, formattedTime };
};

export default function AnnouncementCard(props) {
  const { formattedDate, formattedTime } = formatDateTime(props.event_date);

  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View style={styles.imageView}>
        <Image source={Teste} style={styles.image} />
      </View>
      <View style={styles.infos}>
        <Text
          style={{ fontSize: 20, color: "#545454" }}
          children={props.title || "Titulo"}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#888888",
            maxWidth: "90%",
            maxHeight: height * 0.055,
          }}
          children={props.description || "Descrição"}
        />
        <View>
          <Text
            style={{
              fontSize: 10,
              color: "#888888",
              maxWidth: "90%",
              maxHeight: height * 0.055,
            }}
            children={props.event_date ? `Data do evento: ${formattedDate}` : ""}
          />
          <Text
            style={{
              fontSize: 10,
              color: "#888888",
              maxWidth: "90%",
              maxHeight: height * 0.055,
            }}
            children={props.event_date ? `Horário: ${formattedTime}` : ""}
          />
        </View>

        {props.admin === true ? (
          <IconButton
            icon="trash-can-outline"
            style={{ position: "absolute", right: 7, bottom: 7, height: 35, width: 35 }}
            mode="outlined"
            containerColor="red"
            iconColor={MD3Colors.error100}
            size={30}
            onPress={props.onIconPress}
          />
        ) : null}
      </View>
    </Pressable>
  );
}
