import { useState } from "react";
import { TextInput } from "react-native-paper";
import styles from "./styles";


export default function BlackInputPassword(props){
    
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const placeholder = props.placeholder;
    
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
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)}/>}
       />   
    ); 
};
