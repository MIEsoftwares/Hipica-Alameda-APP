import React from "react";
import { View, Pressable, Image, Text } from "react-native";
import styles from "./styles";
import Teste from "../../assets/images/home-inicial-photo.png";

// import { Container } from './styles';

export default function AnnouncementCard({ props }) {
  return (
    <Pressable style={styles.container}>
      <View style={styles.imageView}>
        <Image source={Teste} style={styles.image} />
      </View>
      <View style={styles.infos}>
        <Text
          style={{ fontSize: 20, color: "#545454" }}
          children={`Torneio da Hípica Alameda`}
        />
        <Text style={{ fontSize: 18, color: "#888888" }}>
          {" "}
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          cupiditate pariatur quam, ut corporis maiores...
        </Text>
      </View>
    </Pressable>
  );
}
