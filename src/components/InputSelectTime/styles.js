import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Dimensions";

export default styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    input: {
        width: width*0.8,
    },
});