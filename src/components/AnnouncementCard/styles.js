import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Dimensions";


export default styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: width * 0.9,
        height: height * 0.15,
        borderRadius: 20,
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 }, // Aumentado para maior profundidade
        shadowOpacity: 0.15, // Reduzido para sombra mais suave
        shadowRadius: 12, // Aumentado para um efeito de desfoque mais amplo
        elevation: 6, // Aumentado para uma sombra mais pronunciada em dispositivos Android
        padding: 10, // Adicionado padding para melhorar a disposição do conteúdo
        margin: 10, // Adicionado margin para separar do conteúdo ao redor
    },
    imageView: {
        width: "35%",
        height: "100%",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
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
        height: "100%",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: height*0.01,
        marginLeft: width*0.02,
        gap: 10,
    }
});