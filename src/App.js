import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";

import { Provider } from 'react-redux';
import store from "./redux/store";

import AppNavigation from "./navigation/appNavigation";


enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

