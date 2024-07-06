import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigasi from "./components/navigasi/navigasi";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Navigasi />
    </Provider>
  );
}

export default App;
