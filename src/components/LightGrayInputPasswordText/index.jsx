import { useState } from "react";
import { TextInput } from "react-native-paper";
import styles from "./styles";
import TextInputIcon from "react-native-paper";


export default function BlackInputPassword(props){
    
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false)

    return (
       <TextInput style={styles.background}
        value={props.value}
        onChangeText={props.action}
        mode="outlined"
        outlineStyle={{borderRadius: 12}}
        contentStyle={{flex: 1, textAlignVertical: "center"}}
        underlineColor="#E0E0E0"
        activeUnderlineColor="#E0E0E0"
        outlineColor="#E0E0E0"
        activeOutlineColor="#E0E0E0"
        textColor="#000000"
        placeholder={props.placeholder}
        placeholderTextColor={props.error ? "red" : "#B0B0B0"}
        secureTextEntry={!showPassword}
        right={props.error? <TextInput.Icon icon="alert" color="red" rippleColor="transparent"/> : <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} color="#B0B0B0" onPress={() => setShowPassword(!showPassword)}/>}
        onChange={props.onChange}
       />   
    ); 
};
