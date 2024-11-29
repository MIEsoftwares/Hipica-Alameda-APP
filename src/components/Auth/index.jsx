import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from "../../screens/AuthenticationScreens/Login";
import Home from "../../screens/MainScreens/Home";
import Register from "../../screens/AuthenticationScreens/Register";
import AdminReport from "../../screens/Administration/AdminReport";
import Profile from "../../screens/ProfileScreens/Profile";
import MainAdminPage from "../../screens/Administration/MainAdminPage";
import EditUsers from "../../screens/Administration/EditUsers";
import supabase from "../../../database/SupabaseConfig";
import EmBreve from "../../screens/ProfileScreens/EmBreve";
import ListUsers from "../../screens/Administration/ListUsers";
import NewAnnouncement from "../../screens/Administration/NewAnnouncement";
import { en, pt, registerTranslation } from 'react-native-paper-dates'
import Planos from "../../screens/ProfileScreens/Planos";
import RealizarPagamento from "../../screens/ProfileScreens/RealizarPagamento";
import NewPlan from "../../screens/Administration/NewPlans";
import 'react-native-get-random-values';
import RegisterBySheet from "../../screens/Administration/RegisterBySheet";
import ClientReport from "../../screens/MainScreens/ClientReport";
import ScheduleClass from "../../screens/Administration/ScheduleClass";

registerTranslation('en', en)
registerTranslation('pt', pt)

const Stack = createNativeStackNavigator();

export default function Auth() {
  const [token, setToken] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
      >
        <Stack.Group></Stack.Group>
        <Stack.Screen name="Login" options={{headerShown: false, }}>
          {(props) => <Login {...props} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={Register} options={{title: "Adicionar Usuário", headerTitleAlign: "center", }} />
        <Stack.Screen name="HomeTabs" options={{headerShown: false}} component={HomeTabs} />
        <Stack.Screen name="Profile" component={Profile} options={{title: "Perfil", headerTitleAlign: "center", }}/>
        <Stack.Screen name="Planos" component={Planos} options={{headerTitleAlign: "center", }}/>
        <Stack.Screen name="RealizarPagamento" component={RealizarPagamento} options={{title: "Realizar Pagamento", headerTitleAlign: "center", }}/>
        <Stack.Screen name="EmBreve" component={EmBreve} />
        <Stack.Screen name="RegisterBySheet" component={RegisterBySheet} options={{title: "Adicionar Usuário Por CSV", headerTitleAlign: "center", }} />
        <Stack.Screen name="ListUsers" component={ListUsers} options={{title: "Listar Usuários", headerTitleAlign: "center",  }}/>
        <Stack.Screen name="EditUsers" component={EditUsers} options={{title: "Editar Usuário", headerTitleAlign: "center", }}/>
        <Stack.Screen name="NewAnnouncement" component={NewAnnouncement} options={{title: "Comunicados", headerTitleAlign: "center", }}/>
        <Stack.Screen name="NewPlan" component={NewPlan} options={{title: "Planos", headerTitleAlign: "center", }}/>
        <Stack.Screen name="ScheduleClass" component={ScheduleClass} options={{title: "Marcar Aula", headerTitleAlign: "center", }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  const [userRole, setUserRole] = useState("");

  async function getRole() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUserRole(user.user_metadata.role);
  }

  if (userRole === "") {
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
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Relatórios") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Administração") {
            iconName = focused ? "settings-sharp" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#999999",
      })}
    >
      <Tab.Screen name="Início" component={Home} />
      <Tab.Screen name="Relatórios" component={userRole === "admin" ? AdminReport : ClientReport} />
      {userRole === "admin" && (
        <Tab.Screen name="Administração" component={MainAdminPage} />
      )}
    </Tab.Navigator>
  );
}
