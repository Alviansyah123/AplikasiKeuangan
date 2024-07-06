import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../button/backButton";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
import { Ionicons } from "@expo/vector-icons";

// Komponen Dropdown Kustom
const Dropdown = ({ label, data, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  return (
    <View>
      <TouchableOpacity
        style={dropdownStyles.button}
        onPress={() => setOpen(!open)}
      >
        <Text style={dropdownStyles.buttonText}>{selected}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {open && (
        <FlatList
          style={dropdownStyles.list}
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={dropdownStyles.listItem}
              onPress={() => {
                setSelected(item);
                setOpen(false);
                onSelect(item);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default function RiwayatPemasukan() {
  const [tableData, setTableData] = useState({
    tableHead: ["No", "Keterangan", "Jumlah", "Tanggal", "Action"],
    tableData: [
      [
        "1",
        "Gaji Bulanan",
        "Rp 5.000.000",
        "01-06-2024",
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ textAlign: "center" }}
        />,
      ],
      [
        "2",
        "Bonus Proyek",
        "Rp 2.000.000",
        "15-06-2024",
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ textAlign: "center" }}
        />,
      ],
      [
        "3",
        "Penjualan Barang",
        "Rp 1.500.000",
        "20-06-2024",
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ textAlign: "center" }}
        />,
      ],
      [
        "4",
        "Pendapatan Lainnya",
        "Rp 750.000",
        "25-06-2024",
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ textAlign: "center" }}
        />,
      ],
      [
        "5",
        "Gaji Bulanan",
        "Rp 5.000.000",
        "01-06-2024",
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ textAlign: "center" }}
        />,
      ],
      [
        "6",
        "Bonus Proyek",
        "Rp 2.000.000",
        "15-06-2024",
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ textAlign: "center" }}
        />,
      ],
      [
        "7",
        "Penjualan Barang",
        "Rp 1.500.000",
        "20-06-2024",
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ textAlign: "center" }}
        />,
      ],
      [
        "8",
        "Pendapatan Lainnya",
        "Rp 750.000",
        "25-06-2024",
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ textAlign: "center" }}
        />,
      ],
    ],
  });

  const handleDelete = (rowID) => {
    Alert.alert(`Delete row ${rowID}`);
  };

  const periods = ["Hari", "Minggu", "Bulan"];
  const orders = ["Terbesar", "Terkecil"];

  return (
    <LinearGradient
      colors={["#0F4BEF", "#1492DC", "#51CAD6"]}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <BackButton />
        </View>
        <View style={Img.wrapper}>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
            Riwayat Pemasukan
          </Text>
          <View style={Img.separator} />
          <View style={Img.buttonContainer}>
            <View style={Img.buttonText}>
              <Text style={Img.buttonTextSaldo}>Saldo: Rp 5.000.000</Text>
            </View>
          </View>
        </View>
        <View style={dropdownStyles.container}>
          <Dropdown
            label="Pilih Periode"
            data={periods}
            onSelect={(selectedItem) => {
              console.log("Selected Period:", selectedItem);
            }}
          />
          <Dropdown
            label="Urutkan"
            data={orders}
            onSelect={(selectedItem) => {
              console.log("Selected Order:", selectedItem);
            }}
          />
        </View>
        <View style={tableStyles.container}>
          <ScrollView horizontal={true}>
            <View style={{ width: 1000 }}>
              <Table borderStyle={{ borderWidth: 1 }}>
                <Row
                  data={tableData.tableHead}
                  flexArr={[0.5, 4, 3, 3, 0.8]}
                  style={tableStyles.head}
                  textStyle={tableStyles.text}
                />
              </Table>
              <ScrollView style={tableStyles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1 }}>
                  <Rows
                    data={tableData.tableData}
                    flexArr={[0.5, 4, 3, 3, 0.8]}
                    style={tableStyles.row}
                    textStyle={tableStyles.text}
                  />
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
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
    marginTop: 40,
    alignItems: "flex-start",
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

const tableStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: -20,
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
  head: { height: 40, backgroundColor: "#82d8d8" },
  dataWrapper: { marginTop: -1, maxHeight: 200 },
  row: { height: 44, backgroundColor: "rgba(255, 255, 255, 0.7)" },
  text: { textAlign: "center" },
});

const dropdownStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 50,
    marginTop: -30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    width: 150,
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  list: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 5,
    padding: 5,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
