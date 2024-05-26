import { useState } from "react";
import { TextInput } from "react-native-paper";
import styles from "./styles";


export default function BlackInputText(props){

    const [text, setText] = useState(props.value)

    return (
       <TextInput style={styles.background}
        value={props.value}
        onChangeText={props.action}
        mode="outlined"
        underlineColor="#000000"
        activeUnderlineColor="#000000"
        outlineColor="#000000"
        activeOutlineColor="#000000"
        textColor="#000000"
        placeholder={props.placeholder}
       />   
    ); 
};
