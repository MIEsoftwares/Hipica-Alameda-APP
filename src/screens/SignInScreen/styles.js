import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Dimensions";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: width*0.18,
        backgroundColor: "#FFFFFF",
    },
    background: {
        width: width*0.8,
        height: height*0.5,
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 30,
    },
    loginButton: {
        width: width*0.3,
        color: "#FFFFFF",
        fontSize: 60,
    },
    inputTexts: {
        width: width*0.7,
        fontSize: 32,
        gap: height*0.01,
    },
    footerViews: {
        alignItems: "center",
        flexDirection: "row",
        width: width*0.5,
    },
});

export default styles;