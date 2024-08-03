import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screenss/home";
import Welcome from "../screenss/welcome";
import Login from "../screenss/login";
import SingUp from "../screenss/singup";
import AddList from "../screenss/AddList";
import AddBiaya from "../screenss/AddBiaya";
import ListCard from "../screenss/ListCard";
import { auth } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../../redux/slices/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Prediksi from "../screenss/prediksi";
import FormPemasukan from "../screenss/FormPemasukan";
import RiwayatPemasukan from "../screenss/RiwayatPemasukan";

const Stack = createNativeStackNavigator();

export default function Navigasi() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  auth.onAuthStateChanged((u) => {
    console.log("got user : ", u);
    dispatch(setUser(u ? JSON.stringify(u) : null));
  });

  // onAuthStateChanged(auth, (u) => {
  //   console.log("got user : ", u);
  //   dispatch(setUser(u));
  // });

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Prediksi"
            component={Prediksi}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="FormPemasukan"
            component={FormPemasukan}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="RiwayatPemasukan"
            component={RiwayatPemasukan}
          />
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SingUp"
            component={SingUp}
          /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddList"
            component={AddList}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddBiaya"
            component={AddBiaya}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ListCard"
            component={ListCard}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          /> */}
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SingUp"
            component={SingUp}
          />
          {/* <Stack.Screen
            options={{ headerShown: false }}
            name="AddList"
            component={AddList}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddBiaya"
            component={AddBiaya}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ListCard"
            component={ListCard}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
