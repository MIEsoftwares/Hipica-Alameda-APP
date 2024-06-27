import { StyleSheet } from "react-native";
import { height } from "../../../constants/Dimensions";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginTop: 16,
  },
  cardContent: {
    gap: 12,
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 8,
    height: height * 0.045,
    alignItems: "center",
    borderColor: "#E0E0E0",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
});

export default styles;
