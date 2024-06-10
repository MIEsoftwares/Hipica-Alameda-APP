import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from "../../screens/Login";
import Home from "../../screens/Home";
import Register from "../../screens/Register";
import Schedule from "../../screens/Schedule";
import Report from "../../screens/Report";
import Announcements from "../../screens/Announcements/styles";
import TestSearch from "../../screens/TestSearch";

const Stack = createNativeStackNavigator();

export default function Auth(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TestSearch"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="TestSearch" component={TestSearch}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
