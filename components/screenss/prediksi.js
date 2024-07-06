import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../button/backButton";
import { BarChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";

export default function Prediksi() {
  const data = [
    {
      value: 4900,
      frontColor: "#006DFF",
      gradientColor: "#009FFF",
      spacing: 42,
      label: "Saat Ini",
    },

    {
      value: 4600,
      frontColor: "#93FCF8",
      gradientColor: "#3BE9DE",
      spacing: 42,
      label: "Masa Depan",
    },
  ];

  return (
    <LinearGradient
      colors={["#0F4BEF", "#1492DC", "#51CAD6"]}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.row}>
            <BackButton />
          </View>
          <View style={Img.wrapper}>
            <Text style={{ color: "white", fontSize: 24 }}>
              Monitor Your Expenses
            </Text>
            <View style={Img.separator} />
            <View style={Img.buttonContainer}>
              <View style={Img.buttonText}>
                {/* <TouchableOpacity
                  style={Img.button}
                  onPress={() => navigation.navigate("Prediksi")}
                >
                  <Ionicons name="wallet-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={Img.buttonText}>Lihat Prediksi Pengeluaran</Text> */}
              </View>
            </View>
          </View>
          <View
            style={{
              margin: 10,
              padding: 16,
              borderRadius: 20,
              backgroundColor: "rgba(35, 43, 93, 0.8)",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Overview Pengeluaran
            </Text>
            <View style={{ padding: 10, alignItems: "center" }}>
              <BarChart
                data={data}
                barWidth={106}
                initialSpacing={10}
                spacing={14}
                barBorderRadius={4}
                showGradient
                yAxisThickness={0}
                xAxisType={"dashed"}
                xAxisColor={"lightgray"}
                yAxisTextStyle={{ color: "lightgray" }}
                stepValue={1000}
                maxValue={6000}
                noOfSections={6}
                yAxisLabelTexts={["0", "5", "10", "15", "20", "30", "35"]}
                labelWidth={120}
                xAxisLabelTextStyle={{
                  color: "lightgray",
                  textAlign: "center",
                  paddingHorizontal: 16,
                }}
                showLine
                lineConfig={{
                  color: "#F29C6E",
                  thickness: 3,
                  curved: true,
                  hideDataPoints: true,
                  shiftY: 0,
                  initialSpacing: 0,
                }}
              />
            </View>
          </View>
          <View style={Pengeluaran.wrapper}>
            <Text style={{ color: "white", fontSize: 14 }}>
              Pengeluaran saat ini: Rp29.592.000.00
            </Text>
          </View>
          <View style={Pengeluaran.wrapper}>
            <Text style={{ color: "white", fontSize: 14 }}>
              Pengeluaran masa depan: Rp26.632.800.00
            </Text>
          </View>
          <View style={Pengeluaran.wrapper}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginLeft: 19,
                marginRight: 15,
              }}
            >
              Keterangan Efisiensi: Total Pengeluaran masa depan perlu dikurangi
              sebesar Rp2.959.200.00 agar lebih efisien.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    alignItems: "start",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  Headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginTop: 20,
  },
  buttonLogout: {
    fontWeight: "bold",
    backgroundColor: "white",
    borderColor: "#CCCCCC",
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginTop: 25,
  },
});
const Img = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.18)",
    shadowColor: "rgba(0, 0, 0, 0.37)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 32,
    paddingVertical: 10,
    marginHorizontal: 20,
  },

  image: {
    width: 130,
    height: 130,
  },
  separator: {
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
    width: "100%",
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    fontWeight: "bold",
    backgroundColor: "white",
    borderColor: "#CCCCCC",
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 18,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    alignItems: "center",
    paddingTop: 4,
  },
});

const Pengeluaran = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "rgba(35, 43, 93, 0.8)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(98,121,241, 0.5)",
    borderLeftWidth: 20,
    shadowColor: "rgba(0, 0, 0, 0.37)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 32,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
});
