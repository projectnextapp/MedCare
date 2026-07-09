import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";

import AppNavigation from "./navigation/appNavigation";


enableScreens();

const App = () => {
  return (
    <>
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
    
</>
  );
};

export default App;
