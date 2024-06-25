import { StyleSheet } from "react-native";
import { height, width } from "../../../constants/Dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: width*0.1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: "stretch",
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: height*0.02,
  },
  inputs: {
    backgroundColor: "#ffffff",
    gap: height*0.02,
    width: width * 0.83,
    marginBottom: width * 0.04,
  },
  buttonProceed: {
    borderRadius: 12,
    height: height * 0.05,
    justifyContent: "center",
    width: width * 0.83,
    marginTop: height*0.03
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: height*0.045,
    gap: width*0.23,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E0E0E0",
  }

});

export default styles;
