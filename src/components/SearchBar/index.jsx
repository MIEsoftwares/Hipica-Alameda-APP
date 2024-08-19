import { TextInput } from "react-native-paper";
import { height } from "../../constants/Dimensions";
import styles from "./styles";

export default function SearchBar() {
  return (
    <TextInput
      style={styles.container}
      mode="outlined"
      placeholder="Pesquisar"
      activeOutlineColor="#999999"
      outlineColor="#999999"
      textColor="#000000"
      outlineStyle={{height: 50, borderRadius: 10,}}
      contentStyle={{height: 56}}
      left={<TextInput.Icon icon="magnify" rippleColor="transparent"/>}
    />
  );
}
