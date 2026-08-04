import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { enableScreens } from "react-native-screens";

import { Provider } from "react-redux";

import store from "./redux/store";

import RootNavigator from "./navigation/RootNavigator";

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
