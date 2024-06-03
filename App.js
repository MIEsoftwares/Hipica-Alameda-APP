import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Home from "./src/screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./src/components/Auth";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Auth/>
  );
};
