import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bgarrow}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={28} color="black" />
      </TouchableOpacity>
    </View>
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

export default BackButton;
