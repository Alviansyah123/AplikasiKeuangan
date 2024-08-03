import React, { Component, useEffect, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import EmptyList from "./emptyList";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import BackButton from "../button/backButton";
import PengeluaranCard from "../card/pengeluaranCard";
import { expensesRef } from "../../config/firebase";

const items = [
  {
    id: 1,
    Nama: "Internet",
    Biaya: "300000 ",
    Kategori: "Pengeluaran Tetap",
  },
  {
    id: 2,
    Nama: "Makanan dan Minuman",
    Biaya: "100000 ",
    Kategori: "Pengeluaran Pribadi",
  },
  {
    id: 3,
    Nama: "Bensin",
    Biaya: "20000 ",
    Kategori: "Pengeluaran Transportasi",
  },
  {
    id: 4,
    Nama: "Biaya Obat",
    Biaya: "50000 ",
    Kategori: "Pengeluaran Kesehatan",
  },

  {
    id: 5,
    Nama: "Buku",
    Biaya: "75000 ",
    Kategori: "Pengeluaran Pendidikan",
  },
  {
    id: 6,
    Nama: "Donasi",
    Biaya: "100000 ",
    Kategori: "Pengeluaran sosial",
  },
  {
    id: 7,
    Nama: "Tol",
    Biaya: "75000 ",
    Kategori: "Pengeluaran Tranportasi",
  },
];

const ListCard = (props) => {
  const { id, Tempat, Provinsi, pengeluaran } = props.route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (isFocused) fetchExpenses();
  }, [isFocused]);

  const fetchExpenses = async () => {
    const q = query(expensesRef, where("tripId", "==", id));
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setExpenses(data);
  };

  return (
    <LinearGradient
      colors={["#012465", "#006EF1", "#0050B7"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.containerr}>
          <View style={styles.row}>
            <BackButton />
            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.title}>{pengeluaran}</Text>
                {/* <Text style={styles.titless}>{Provinsi}</Text> */}
              </View>
            </View>
          </View>
        </View>
        <View style={Img.wrapper}>
          <Text style={{ color: "white", fontSize: 24 }}>
            List of Your Expenses
          </Text>
          <View style={Img.separator} />
          <View style={Img.buttonContainer}>
            {/* <View style={Img.buttonText}>
              <TouchableOpacity style={Img.button}>
                <Ionicons name="wallet-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text style={Img.buttonText}> Tertinggi</Text>
            </View>
            <View style={Img.buttonText}>
              <TouchableOpacity style={Img.button}>
                <Ionicons name="warning" size={24} color="black" />
              </TouchableOpacity>
              <Text style={Img.buttonText}> Urgent</Text>
            </View> */}
          </View>
        </View>
        <View style={RecentTrip.container}>
          <View style={RecentTrip.wrapp}>
            <Text style={RecentTrip.title}>Pengeluaran</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddBiaya")}
              style={RecentTrip.addButton}
            >
              <Text>Tambahkan</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 400 }}>
            <FlatList
              data={items}
              numColumns={1}
              ListEmptyComponent={
                <EmptyList message={"mendapatkan data Pengeluaran"} />
              }
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return <PengeluaranCard item={item} />;
              }}
            />
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
  containerr: {
    flex: 1,
    marginTop: 40,
  },
  Headers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 55,
  },
  titless: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginRight: 55,
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
    marginBottom: 60,
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
    fontSize: 10,
    alignItems: "center",
    paddingTop: 4,
  },
});

const RecentTrip = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 6,
  },
  wrapp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 25,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  addButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "white",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
});

export default ListCard;
