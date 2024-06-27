import { StyleSheet } from "react-native";
import { height, width } from "./Dimensions";

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width*0.025,
        paddingTop: height*0.02
    }
})

export default defaultStyles