import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#012465", "#006EF1", "#0050B7"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Let's Get Started!</Text>
          <View style={Img.imageContainer}>
            <Image
              source={require("../../assets/images/welcome-img.png")}
              style={Img.image}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SingUp")}
            style={Already.button}
          >
            <Text style={Already.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={Already.textContainer}>
            <Text style={Already.text}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.text, { color: "#FFD700" }]}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 80,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

const Img = StyleSheet.create({
  imageContainer: {
    marginTop: 40,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 60,
  },
});

const Already = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 12,
  },

  button: {
    paddingVertical: 10,
    backgroundColor: "#FFD700",
    marginHorizontal: 7,
    borderRadius: 20,
    width: 250,
    marginTop: 100,
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

export default Welcome;
