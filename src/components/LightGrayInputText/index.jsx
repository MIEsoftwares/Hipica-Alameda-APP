import { TextInput } from "react-native-paper";
import styles from "./styles";

export default function LightGrayInputText(props) {

  return (
    <TextInput
      label={props.label}
      style={[styles.background, props.style]}
      value={props.value}
      onChangeText={props.action}
      outlineStyle={{borderRadius: 12}}
      mode="outlined"
      underlineColor="#E0E0E0"
      activeUnderlineColor="#E0E0E0"
      outlineColor="#E0E0E0"
      activeOutlineColor="#E0E0E0"
      textColor="#000000"
      placeholder={props.placeholder}
      placeholderTextColor={props.error ? "red" : "#B0B0B0"}
      right={(props.error && <TextInput.Icon icon="alert" color="red" rippleColor="transparent" />)}
      onChange={props.onChange}
      disabled={props.disabled}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
    />
  );
}
