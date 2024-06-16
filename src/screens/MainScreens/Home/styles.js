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
        marginTop: height*-0.02
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
    }
});
export default styles;
