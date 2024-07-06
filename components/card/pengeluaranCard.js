import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { colorList } from "../../theme/Style";

const randomColor = () => {
  const Keys = Object.keys(colorList);
  const randomKey = Keys[Math.floor(Math.random() * Keys.length)];
  return colorList[randomKey];
};

export default function PengeluaranCard({ item }) {
  const colorCard = randomColor();

  return (
    <View style={[styles.content, { backgroundColor: colorCard }]}>
      <View>
        <Text style={styles.nama}>{item.Nama}</Text>
        <Text style={styles.Kategori}>{item.Kategori}</Text>
      </View>
      <View>
        <Text style={styles.Biaya}>Rp{item.Biaya}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 15,
    marginTop: 2,
  },
  nama: {
    color: "white",
    fontWeight: "bold",
  },
  Kategori: {
    color: "white",
  },
  Biaya: {
    color: "white",
  },
});
