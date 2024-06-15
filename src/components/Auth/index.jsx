import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from "../../screens/Login";
import Home from "../../screens/Home";
import Register from "../../screens/Register";
import Schedule from "../../screens/Schedule";
import Report from "../../screens/Report";
import Announcements from "../../screens/Announcements/styles";
import TestSearch from "../../screens/TestSearch";
import { sessionStorage } from "../../../database/classes/Storage";


const Stack = createNativeStackNavigator();

export default function Auth() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  },[])


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login">
          {(props) => <Login {...props} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={Register} />
        {token && <Stack.Screen name="HomeTabs" component={HomeTabs}/>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Início"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Início") {
            iconName = focused
              ? "home"
              : "home";
          } else if (route.name === "Agenda") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if(route.name === "Relatórios"){
            iconName = focused ? "mail-open" : "mail";
          } else if(route.name === "Comunicados"){
            iconName = "chatbubbles"
          }  

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#999999",
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Agenda" component={Schedule} />
      <Tab.Screen name="Relatórios" component={Report} />
      <Tab.Screen name="Comunicados" component={Announcements} />
    </Tab.Navigator>
  );
}
