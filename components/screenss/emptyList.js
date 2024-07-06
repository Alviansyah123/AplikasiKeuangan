import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const EmptyList = ({ message }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/trip2.png")}
      />
      <Text style={styles.text}>{message || "data not found"}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 12,
  },
  image: {
    width: 144,
    height: 144,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontWeight: "bold",
    color: "#8c8c8c",
  },
});

export default EmptyList;
