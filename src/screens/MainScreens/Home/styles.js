import { StyleSheet } from "react-native";
import { height, width } from "../../../constants/Dimensions";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "space-between",
    },
    header: {
        height: height*0.1,
        width: width,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    image: {
        width: width*0.7,
        height: height * 0.23,
    },
    titleWhileHasNothing: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        marginVertical: height * 0.02,
        fontWeight: "bold",
    },
    subtitleWhileHasNothing: {
        width: width * 0.9,
        fontSize: 17,
        color: "#999999",
        textAlign: "center",
    },
    modal:{
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        width: width*0.85, 
        paddingVertical: 20, 
        backgroundColor: "#ffffff", 
        paddingHorizontal: width*0.025, 
        paddingTop: height*0.02, 
        zIndex: 10, 
        position: "absolute", 
        borderRadius: 16,
        gap: 16,
    },
    pressable: {
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#00000080",
        zIndex: 5,
    },
});
export default styles;