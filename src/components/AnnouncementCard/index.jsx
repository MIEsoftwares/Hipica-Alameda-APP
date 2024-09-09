import React from "react";
import { View, Pressable, Image, Text } from "react-native";
import styles from "./styles";
import Teste from "../../assets/images/logo_default_card.png";
import { IconButton, MD3Colors } from "react-native-paper";
import { height } from "../../constants/Dimensions";

// import { Container } from './styles';

export default function AnnouncementCard(props) {
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View style={styles.imageView}>
        <Image source={Teste} style={styles.image} />
      </View>
      <View style={styles.infos}>
        <Text
          style={{ fontSize: 20, color: "#545454" }}
          children={ props.title || "Titulo" }
        />
        <Text style={{ fontSize: 18, color: "#888888", maxWidth: "90%", maxHeight: height*0.055 }} children={ props.description || "Descrição" } />
        { props.admin === true ?
          <IconButton icon="trash-can-outline" style={{position:"absolute", right: 7, bottom: 7, height: 35, width: 35}} mode="outlined" containerColor="red" iconColor={MD3Colors.error100} size={30} onPress={props.onIconPress}/>
        : null}
      </View>
      {/* <View>
        <IconButton icon="delete"/>
      </View> */}
    </Pressable>
  );
}
