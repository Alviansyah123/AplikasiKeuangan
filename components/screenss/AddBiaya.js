import React, { useState } from "react";
import {
  Alert,
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../button/backButton";
import { kategoriPengeluaran } from "../../assets/kategori/kategoriPengeluaran";
import { addDoc } from "firebase/firestore";
import { expensesRef } from "../../config/firebase";
import Loading from "../loading/loading";

const AddList = (props) => {
  let id = props.route.params ? props.route.params.id : "";

  // let { id } = props.route.params;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [kategori, setKategori] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleListPengeluaran = async () => {
    if (title && amount && kategori) {
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        kategori,
        tripId: id,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Alert.alert("Masukan Data Terlebih Dahulu");
    }
  };

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
          <Text style={input.label}>Nama Pengeluaran</Text>
          <TextInput
            value={title}
            onChangeText={(value) => setTitle(value)}
            style={input.input}
          />
          <Text style={input.label}>Jumlah Biaya</Text>
          <TextInput
            value={amount}
            onChangeText={(value) => setAmount(value)}
            style={input.input}
          />
          <Text style={input.label}> Kategori</Text>
          <View style={kategoris.container}>
            {kategoriPengeluaran.map((kat) => {
              let buttonStyle = [kategoris.button, kategoris.bgWhite];
              if (kat.value === kategori) buttonStyle.push(kategoris.bgBlue);
              return (
                <TouchableOpacity
                  onPress={() => setKategori(kat.value)}
                  key={kat.value}
                  style={buttonStyle}
                >
                  <Text style={kategoris.buttonText}>{kat.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* <View>
          <Text>Kategori</Text>
          <View></View>
        </View> */}
        <View style={BtnTambah.container}>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleListPengeluaran}
              style={BtnTambah.button}
            >
              <Text style={BtnTambah.buttonText}>Tambahkan</Text>
            </TouchableOpacity>
          )}
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

const kategoris = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 6,
    marginRight: 6,
  },
  buttonText: {
    fontSize: 14,
  },
  bgBlue: {
    backgroundColor: "rgb(137,596, 244)",
  },
  bgWhite: {
    backgroundColor: "white",
  },
});
export default AddList;
