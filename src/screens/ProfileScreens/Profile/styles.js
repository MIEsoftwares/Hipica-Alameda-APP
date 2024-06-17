import { StyleSheet } from "react-native";
import { height, width } from "../../../constants/Dimensions";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width*0.025,
        justifyContent: "flex-start",
        backgroundColor: "#FFFFFF",
    },
    profileStylePic: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: height*0.05,
        marginBottom: height*0.125,
    },
    image: {
        resizeMode: "stretch",
        width: width*0.25,
        height: height*0.1,
    },
    lineComponents: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: width*0.95,
        height: height*0.05,
    },
    titles: {
        fontWeight: "bold",
    }
});
