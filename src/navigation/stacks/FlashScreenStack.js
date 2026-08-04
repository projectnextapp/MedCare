import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashScreen1 from "./flashScreens/FlashScreen1";
import FlashScreen2 from "./flashScreens/FlashScreen2";
import FlashScreen3 from "./flashScreens/FlashScreen3";
import OnboardingScreen from "./flashScreens/OnboardingScreen";

const Stack = createNativeStackNavigator();

const FlashScreensStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Flash1" component={FlashScreen1} />
      <Stack.Screen name="Flash2" component={FlashScreen2} />
      <Stack.Screen name="Flash3" component={FlashScreen3} />
    </Stack.Navigator>
  );
};

export default FlashScreensStack;
