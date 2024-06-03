import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Dimensions";



export default styles = StyleSheet.create({
    profileIcon: {
        width: width*0.13,
        height: height*0.06,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#000', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: "green"
    }
});