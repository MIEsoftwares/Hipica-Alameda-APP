import { StyleSheet } from "react-native";
import { height, width } from "../../../constants/Dimensions";

export default styles = StyleSheet.create({
  profileStylePic: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
  },
  image: {
    resizeMode: "stretch",
    width: width * 0.25,
    height: height * 0.1,
  },
  lineComponents: {
    flexDirection: "row",
    width: width * 0.95,
    height: height * 0.05,
    justifyContent: "space-between"
  },
  titles: {
    fontWeight: "bold",
  },
  photoMethodButton: {
    width: width * 0.25,
    height: height * 0.12,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  photoMethodForm: {
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
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
  form: {
    width: width * 0.85,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    paddingHorizontal: width * 0.025,
    paddingTop: height * 0.02,
    zIndex: 10,
    position: "absolute",
    borderRadius: 16,
    gap: 16,
  },
  profilePic: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 100,
  },
  row: {
    flexDirection: "row", // Coloca os itens na mesma linha
    alignItems: "center", // Alinha os itens verticalmente no centro
    marginBottom: 20,
  },
  leftText: {
    flex: 0, // Não permite que o texto "Nome" ocupe mais espaço que seu conteúdo
    textAlign: "left", // Alinha o texto à esquerda
    fontWeight: "bold"
  },
  centeredText: {
    flex: 1, // Ocupa o restante do espaço disponível
    textAlign: "center", // Centraliza o texto no espaço restante
  },
});
