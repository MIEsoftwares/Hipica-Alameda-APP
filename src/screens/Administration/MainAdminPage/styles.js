import { StyleSheet } from "react-native";
import { height, width } from "../../../constants/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height*0.02,
        paddingHorizontal: width*0.025,
        gap: height*0.015,
    }
})

export default styles;