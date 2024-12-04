import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Dimensions";


export default styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: width * 0.9,
        height: height * 0.13,
        borderRadius: width*0.06,
        borderTopLeftRadius: width*0.03,
        borderBottomLeftRadius: width*0.03,
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        margin: 10,
    },
    verticalBar: {
        backgroundColor: "black",
        width: "2.5%",
        height: "100%",
        borderTopLeftRadius: width*0.03,
        borderBottomLeftRadius: width*0.03,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    infos: {
        width: "65%",
        height: "95%",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: height*0.01,
        marginLeft: width*0.02,
        gap: 10,
    }
});