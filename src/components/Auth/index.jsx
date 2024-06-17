import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from "../../screens/AuthenticationScreens/Login";
import Home from "../../screens/MainScreens/Home";
import Register from "../../screens/AuthenticationScreens/Register";
import Schedule from "../../screens/MainScreens/Schedule";
import Report from "../../screens/MainScreens/Report";
import Announcements from "../../screens/MainScreens/Announcements/styles";
import Profile from "../../screens/ProfileScreens/Profile";
import EmBreve from "../../screens/ProfileScreens/EmBreve";

const Stack = createNativeStackNavigator();

export default function Auth(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EmBreve" component={EmBreve} />
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
            iconName = focused ? "home" : "home";
          } else if (route.name === "Agenda") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Relatórios") {
            iconName = focused ? "mail-open" : "mail";
          } else if (route.name === "Comunicados") {
            iconName = "chatbubbles";
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
