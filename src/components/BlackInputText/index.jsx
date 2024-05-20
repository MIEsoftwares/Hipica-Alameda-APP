import React from "react";
import { TextInput } from "react-native-paper";
import styles from "./styles";


export default function BlackInputText(props){
    
    const [email, setEmail] = React.useState("");

    const placeholder = props.placeholder;

    return (
       <TextInput style={styles.background}
        value={email}
        onChange={(text) => setEmail(text)}
        mode="outlined"
        underlineColor="#000000"
        activeUnderlineColor="#000000"
        outlineColor="#000000"
        activeOutlineColor="#000000"
        textColor="#000000"
        placeholder={placeholder}
       />   
    ); 
};
