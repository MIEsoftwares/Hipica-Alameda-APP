import React from "react";
import { TextInput } from "react-native-paper";
import styles from "./styles";


export default function BlackInputPassword(props){
    
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const placeholder = props.placeholder;
    
    return (
       <TextInput style={styles.background}
        value={password}
        onChange={(text) => setPassword(text)}
        mode="outlined"
        underlineColor="#000000"
        activeUnderlineColor="#000000"
        outlineColor="#000000"
        activeOutlineColor="#000000"
        textColor="#000000"
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)}/>}
       />   
    ); 
};
