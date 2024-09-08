import React from "react";
import { View, Pressable, Image, Text } from "react-native";
import styles from "./styles";
import Teste from "../../assets/images/home-inicial-photo.png";
import { IconButton, MD3Colors } from "react-native-paper";
import { height } from "../../constants/Dimensions";

// import { Container } from './styles';

export default function PlanCard(props) {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View style={styles.verticalBar}/>
      <View style={styles.infos}>
        <Text
          style={{ fontSize: 20, color: "#545454", fontWeight: "bold"}}
          children={ props.title || "Titulo" }
        />
        <Text style={{ fontSize: 18, color: "#888888", maxWidth: "90%", maxHeight: height*0.055 }} children={ props.description || "Descrição" } />
      </View>
    </Pressable>
  );
}
