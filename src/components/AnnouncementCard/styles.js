import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Dimensions";


export default styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: width * 0.9,
        paddingBottom: 10,
        borderRadius: 20,
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        padding: 10,
        margin: 10,
    },
    imageView: {
        width: width*0.3,
        height: height*0.15,
        alignSelf: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
        borderRadius: 8
    },
    infos: {
        width: "65%",
        height: "100%",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: height*0.01,
        marginLeft: width*0.02,
        gap: 10,
    }
});