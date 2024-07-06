import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/loading";
import { setUserLoading } from "../../redux/slices/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLoading } = useSelector((state) => state.user);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        dispatch(setUserLoading(false));
        Alert.alert(e.message);
      }
    } else {
      Alert.alert("Email and Password are required");
    }
  };

  return (
    <LinearGradient
      colors={["#012465", "#006EF1", "#0050B7"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.bgarrow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Image
            source={require("../../assets/images/welcome-img.png")}
            style={Img.image}
          />
        </View>
      </SafeAreaView>
      <View style={Form.container}>
        <View style={InputForm.form}>
          <Text style={InputForm.text}>Email Address</Text>
          <TextInput
            style={InputForm.input}
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Enter Email"
          />
          <Text style={InputForm.text}>Password</Text>
          <TextInput
            style={InputForm.input}
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Enter Password"
          />
          <View style={Forgot.container}>
            <TouchableOpacity style={Forgot.touchableOpacity}>
              <Text style={Forgot.text}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={Loginbtn.button}>
              <Text style={Loginbtn.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={Already.textContainer}>
          <Text style={Already.text}>Dont't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SingUp")}>
            <Text style={[styles.text, { color: "#FFD700" }]}> Sing Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  bgarrow: {
    marginTop: 40,
    padding: 2,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 15,
    backgroundColor: "#FFD700",
    width: 40,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const Img = StyleSheet.create({
  imageContainer: {
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

const Form = StyleSheet.create({
  container: {
    flex: 1.5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
  },
});

const InputForm = StyleSheet.create({
  form: {
    marginTop: 40,
    marginBottom: 8,
    marginLeft: 25,
  },
  text: {
    color: "black",
    marginTop: 10,
    marginLeft: 16,
  },
  input: {
    marginTop: 10,
    padding: 16,
    backgroundColor: "#ADD8E6",
    color: "#808080",
    width: "92%",
    borderRadius: 10,
    marginBottom: 8,
  },
});

const Forgot = StyleSheet.create({
  container: {
    marginRight: 25,
    marginBottom: 5,
  },
  touchableOpacity: {
    alignItems: "flex-end",
  },
  text: {
    color: "#333333",
  },
});

const Loginbtn = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 12,
  },

  button: {
    paddingVertical: 10,
    backgroundColor: "#FFD700",
    marginRight: 26,
    borderRadius: 20,
    width: 250,
    alignSelf: "center",
    marginTop: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
  },

  text: {
    color: "white",
    marginRight: 5,
  },
});

const Already = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    paddingTop: 12,
  },
  text: {
    textAlign: "center",
    color: "black",
    marginRight: 5,
  },
});

export default Login;
