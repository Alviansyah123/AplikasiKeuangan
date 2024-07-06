import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../button/backButton";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../config/firebase";
import Loading from "../loading/loading";
import { useDispatch, useSelector } from "react-redux";
import { tanggalRef } from "../../config/firebase";

const AddList = () => {
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [pengeluaran, setPengeluaran] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, isLoadingUser } = useSelector((state) => state.user);

  const handleDeleteItem = (id) => {
    const updatedPengeluaran = pengeluaran.filter((item) => item.id !== id);

    setPengeluaran(updatedPengeluaran);
  };

  // const handlePengeluaran = async () => {
  //   if (tanggal) {
  //     setLoading(true);
  //     let doc = await addDoc(tanggalRef, {
  //       tanggal,
  //       userId: user.uid,
  //     });
  //     setLoading(false);
  //     if (doc && doc.id) {
  //       navigation.goBack();
  //     }
  //   } else {
  //     Alert.alert("Tanggal atau pengguna tidak valid");
  //   }
  // };

  const handlePengeluaran = async () => {
    if (!tanggal) {
      console.error("Tanggal tidak valid.");
      return;
    }

    setLoading(true);

    try {
      const userId = auth.currentUser.uid; // Ambil userId dari pengguna yang sedang masuk

      await addDoc(tanggalRef, {
        pengeluaran: tanggal.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        userId: userId, // Masukkan userId ke dalam data yang dikirim ke database
      });
      setPengeluaran([]);
      navigation.goBack({ tanggal: tanggal });
    } catch (error) {
      console.error("Error menambahkan pengeluaran: ", error);
    } finally {
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#012465", "#006EF1", "#0050B7"]}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.row}>
            <BackButton />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Tambah Pengeluaran</Text>
            </View>
          </View>
          <View>
            <Image
              style={styles.Image}
              source={require("../../assets/images/welcome-img.png")}
            />
          </View>
        </View>
        <View style={input.Container}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={tripContent.tripContainer}
          >
            <Text style={input.label}>Masukkan Tanggal Pengeluaran</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={tanggal ? new Date(tanggal) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || tanggal;
                setShowDatePicker(false);
                setTanggal(currentDate);

                const updatedPengeluaran = [...pengeluaran];

                const newItem = {
                  id: pengeluaran.length + 1,
                  tanggal: currentDate,
                };
                updatedPengeluaran.push(newItem);
                setPengeluaran(updatedPengeluaran);
              }}
            />
          )}
        </View>
        <View style={{ height: 400 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={pengeluaran}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ListCard", { ...item })}
                    style={tripContentt.tripContainer}
                  >
                    <Text style={tripContent.date}>Data Pengeluaran :</Text>
                    <Text style={tripContent.date}>
                      {item.tanggal.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                    <View style={tripContent.itemContent}>
                      <TouchableOpacity
                        onPress={() => handleDeleteItem(item.id)}
                        style={styles.date}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                  <View style={BtnTambah.container}>
                    {loading ? (
                      <Loading />
                    ) : (
                      <TouchableOpacity
                        onPress={handlePengeluaran}
                        style={BtnTambah.button}
                      >
                        <Text style={BtnTambah.buttonText}>
                          Tambah Tanggal Pengeluaran
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    marginTop: 20,
    alignItems: "center",
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
  Image: {
    marginTop: 30,
    width: 200,
    height: 200,
  },
});

const input = StyleSheet.create({
  Container: {
    marginTop: 30,
    marginLeft: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
    width: "92%",
    marginTop: 5,
  },
});

const BtnTambah = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    borderRadius: 999,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: "#007BFF",
    width: "92%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

const tripContent = StyleSheet.create({
  tripContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(1, 165, 228, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 15,
    marginTop: 2,
    marginRight: 25,
  },
  date: {
    color: "white",
    fontWeight: "bold",
  },
});

const tripContentt = StyleSheet.create({
  tripContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(1, 165, 228, 0.8)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
    borderRadius: 15,
    marginTop: 2,
    marginRight: 25,
    marginLeft: 20,
  },
});
export default AddList;
