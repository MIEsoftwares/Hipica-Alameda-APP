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
import Profile from "../../screens/Profile";
import TestSearch from "../../screens/TestSearch";
import supabase from "../../../database/SupabaseConfig";
import { useState } from "react";
import { checkSession } from "../../../database/AsyncStorageFunctions/checkSession";



const Stack = createNativeStackNavigator();

export default function Auth() {

  const [token, setToken] = useState(false);


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
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  const [userRole, setUserRole] = useState()

  async function getRole(){
    const {data: profile, error} = await supabase
      .from("profiles")
      .select("role").single()
      
      setUserRole(profile.role)
    return 
  }

  if (userRole === "" || userRole === null || userRole === undefined) {
    getRole();
  }

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
              : "home-outline";
          } else if (route.name === "Agenda") {
            iconName = focused? "calendar-clear" : "calendar-clear-outline";
          } else if(route.name === "Relatórios"){
            iconName = focused ? "book" : "book-outline";
          } else if(route.name === "Comunicados"){
            iconName = focused? "mail" : "mail-outline"
          }  else if(route.name === "Administração"){
            iconName = focused ? "settings-sharp" : "settings-outline"
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
      {userRole === "admin" && <Tab.Screen name="Administração" component={Announcements} />}

    </Tab.Navigator>
  );
}
