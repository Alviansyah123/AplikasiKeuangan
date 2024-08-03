import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import EmptyList from "./emptyList";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth, tanggalRef, tripsRef } from "../../config/firebase";
import {
  getDocs,
  getDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const item = [
  {
    id: 1,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "13 Mei 2024",
  },
  {
    id: 2,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "14 Mei 2024",
  },
  {
    id: 3,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "15 Mei 2024",
  },
  {
    id: 4,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "16 Mei 2024",
  },
  {
    id: 5,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "17 Mei 2024",
  },
  {
    id: 6,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "18 Mei 2024",
  },
  {
    id: 7,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "19 Mei 2024",
  },
  {
    id: 8,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "20 Mei 2024",
  },
  {
    id: 9,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "21 Mei 2024",
  },
  {
    id: 10,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "22 Mei 2024",
  },
  {
    id: 11,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "23 Mei 2024",
  },
  {
    id: 12,
    Tempat: "Kategori : ",
    Provinsi: "Jumlah :",
    pengeluaran: "24 Mei 2024",
  },
];

export default function Home() {
  const navigation = useNavigation();
  const [tanggal, setTanggal] = useState("");
  const [tanggall, setTanggall] = useState([]);
  const [formattedTanggall, setFormattedTanggall] = useState([]);

  const { user } = useSelector((state) => state.user);
  const isFocused = useIsFocused();
  const [trips, setTrips] = useState([]);

  const fetchTanggal = async () => {
    if (!user || !user.uid) {
      // console.error("UserID tidak valid.");
      return;
    }

    const q = query(tanggalRef, where("userId", "==", user.uid));

    try {
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        // Tambahkan data dari dokumen ke dalam array data
        console.log("data tanggal: ", doc.data());
        data.push(doc.data());
      });
      // Set state tanggall dengan data dari database
      setTanggall(data);
      console.log("Data dari database:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   if (isFocused) fetchTanggal();
  // }, [isFocused]);

  useEffect(() => {
    fetchTanggal();
  }, []);

  const navigateToAddList = () => {
    // Meneruskan id sebagai bagian dari params saat navigasi
    navigation.navigate("AddList", { id: "nilai_id_di_sini" });
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <LinearGradient
      colors={["#0F4BEF", "#1492DC", "#51CAD6"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.Headers}>
          <Text style={styles.title}>welcome</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={Img.wrapper}>
          <Text style={{ color: "white", fontSize: 24 }}>
            Monitor Your Expenses
          </Text>
          <View style={Img.separator} />
          <View style={Img.buttonContainer}>
            <View style={Img.buttonText}>
              <TouchableOpacity
                style={Img.button}
                onPress={() => navigation.navigate("Prediksi")}
              >
                <Ionicons name="wallet-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text style={Img.buttonText}>Lihat Prediksi Pengeluaran</Text>
              <Text style={Img.buttonTextSaldo}>Saldo: Rp 5.000.000</Text>
            </View>

            {/* <View style={Img.buttonText}>
              <TouchableOpacity style={Img.button}>
                <Ionicons name="warning" size={24} color="black" />
              </TouchableOpacity>
              <Text style={Img.buttonText}> Kategori</Text>
            </View> */}
            {/* <View>
              <TouchableOpacity onPress={navigateToAddList}>
                <Text>Buka AddList</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        <View style={RecentTrip.container}>
          <View style={RecentTrip.wrapp}>
            <Text style={RecentTrip.title}>Pengeluaran</Text>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("AddList")}
                style={RecentTrip.addButton}
              >
                <Text>Input Tanggal Pengeluaran</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("FormPemasukan")}
                style={RecentTrip.addButton}
              >
                <Text>Input Pemasukan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("RiwayatPemasukan")}
                style={RecentTrip.addButton}
              >
                <Text>Riwayat Pemasukan</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{ height: 400 }}>
            <FlatList
              data={item}
              numColumns={1}
              // ListEmptyComponent={<EmptyList message={"mendapatkan data"} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ListCard", { ...item })}
                    style={tripContent.tripContainer}
                  >
                    <View>
                      <Text style={tripContent.place}>
                        Tanggal Pengeluaran :
                      </Text>
                      <Text style={tripContent.place}>{item.pengeluaran}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 60,
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
  buttonTextSaldo: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    paddingTop: 4,
    fontWeight: "bold",
  },
});

const RecentTrip = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: -40,
  },
  wrapp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 25,
    overflow: "hidden",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginEnd: 8,
  },
  addButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "white",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginLeft: 8,
    marginRight: 10,
  },
});

const tripContent = StyleSheet.create({
  tripContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(72,83,195,0.8)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 15,
    marginTop: 0,
  },
  image: {
    width: "100%",
    height: "70%",
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  place: {
    color: "white",
    fontWeight: "bold",
  },
  province: {
    color: "white",
    fontWeight: "bold",
  },
  date: {
    color: "white",
    fontWeight: "bold",
  },
});
