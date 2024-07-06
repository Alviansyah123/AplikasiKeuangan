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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoading } from "../../redux/slices/user";
import Loading from "../loading/loading";

const SingUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
      // navigation.goBack();
      // navigation.navigate("Home");
      try {
        dispatch(setUserLoading(true));
        await createUserWithEmailAndPassword(auth, email, password);
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
            style={styles.image}
          />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.inputForm}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Enter Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.alreadyContainer}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.text, { color: "#FFD700" }]}> Login</Text>
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
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  formContainer: {
    flex: 2.4,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
  },
  inputForm: {
    marginTop: 40,
    marginBottom: 8,
    marginLeft: 25,
  },
  label: {
    color: "black",
    marginTop: 10,
    marginLeft: 16,
  },
  input: {
    marginTop: 10,
    padding: 16,
    backgroundColor: "#ADD8E6",
    width: "92%",
    borderRadius: 10,
    marginBottom: 8,
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
  alreadyContainer: {
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

export default SingUp;
