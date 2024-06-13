import { StyleSheet } from "react-native";
import { height, width } from "../../constants/Dimensions";
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen'

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: width * 0.18,
    backgroundColor: "#FFFFFF",
  },
  allElements: {
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: height*-0.2,
  },
  background: {
    width: width,
    height: height,
    backgroundColor: "green",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  TextView: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.025,
  },
  Title: {
    fontSize: 18,
    // fontFamily: "Exo2-ExtraLight",
    fontWeight: "bold",
    marginBottom: 8,
  },
  SubTitle: {
    fontSize: 16,
  },
  loginBox: {
    width: width * 0.83,
    fontSize: 32,
    gap: height * 0.015,
    marginBottom: height * 0.03,
  },
  footerViews: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: "stretch",
    margin: 32,
  },
  ViewOrContinueWith: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.03,
  },
  line: {
    height: 1,
    backgroundColor: "#929292",
    marginTop: 5,
  },
});

export default styles;
