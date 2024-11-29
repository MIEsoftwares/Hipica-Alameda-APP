import React, { useState } from "react";
import { View, Pressable, Image, Text } from "react-native";
import styles from "./styles";
import DefaultImage from "../../assets/images/logo_default_card.png";
import { IconButton, MD3Colors } from "react-native-paper";
import { height } from "../../constants/Dimensions";
import supabase from "../../../database/SupabaseConfig";

/*ESTE COMPONENTE RECEBE AS SEGUINTES PROPS 
 event_date (string ou Date): Data e hora do evento, usada para exibir a data e hora formatadas.
 bucket (string): Nome do bucket no Supabase para acessar a imagem.
 imagem (string): Nome da imagem armazenada no Supabase (se houver). Exibida no card, caso não haja imagem, exibe um logo padrão, se receber "noImage" não apresentará logo padrão.
 onPress (function): Função chamada ao pressionar o Pressable que envolve o card.
 title (string): Título do anúncio exibido no card.
 description (string): Descrição do anúncio exibida no card.
 admin (boolean): Indica se o usuário é administrador. Se for true, exibe o ícone de lixeira para ações administrativas.
 onIconPress (function): Função chamada ao pressionar o ícone de lixeira quando admin é true.
*/

// Função para formatar a data e o horário
const formatDateTime = (date) => {
  if (!date) return "";
  const eventDate = new Date(date);

  const day = String(eventDate.getDate()).padStart(2, "0");
  const month = String(eventDate.getMonth() + 1).padStart(2, "0"); // Mês começa do 0
  const year = eventDate.getFullYear();

  const hours = String(eventDate.getHours()).padStart(2, "0");
  const minutes = String(eventDate.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
};

export default function AnnouncementCard(props) {
  const { formattedDate, formattedTime } = formatDateTime(props.event_date);

  const getPublicUrl = () => {
    const { data } = supabase.storage
      .from(props.bucket)
      .getPublicUrl(props.imagem);
    return data.publicUrl;
  };

  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      {props.imagem !== "noImage" && (
        <View style={styles.imageView}>
          <Image
            source={props.imagem ? { uri: getPublicUrl() } : DefaultImage}
            style={styles.image}
          />
        </View>
      )}
      <View
        style={
          props.imagem === "noImage"
            ? [styles.infos, { width: "100%" }]
            : styles.infos
        }
      >
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            backgroundColor: "#000",
            alignSelf: "flex-start",
            paddingHorizontal: 16,
            paddingVertical: 4,
            borderRadius: 8,
            fontWeight: "bold",
          }}
          children={props.title || "Titulo"}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#888888",
            maxWidth: "90%",
            maxHeight: height * 0.055,
          }}
          children={props.description}
        />
        <View>
          {props.event_date && (
            <Text
              style={{
                fontSize: 10,
                color: "#888888",
                maxWidth: "90%",
                maxHeight: height * 0.055,
              }}
              children={
                props.event_date ? `Data do evento: ${formattedDate}` : ""
              }
            />
          )}
          {props.event_date && (
            <Text
              style={{
                fontSize: 10,
                color: "#888888",
                maxWidth: "90%",
                maxHeight: height * 0.055,
              }}
              children={props.event_date ? `Horário: ${formattedTime}` : ""}
            />
          )}
        </View>

        {props.admin === true && (
          <IconButton
            icon="trash-can-outline"
            style={{
              position: "absolute",
              right: 7,
              bottom: 7,
              height: 35,
              width: 35,
            }}
            mode="outlined"
            containerColor="red"
            iconColor={MD3Colors.error100}
            size={30}
            onPress={props.onIconPress}
          />
        )}
      </View>
    </Pressable>
  );
}
