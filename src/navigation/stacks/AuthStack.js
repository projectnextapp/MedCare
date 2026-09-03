import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./authScreen/LoginScreen";
import RegisterScreen from "./authScreen/RegisterScreen";
import ForgotPasswordScreen from "./authScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./authScreen/ResetPasswordScreen";
import VerifyOTPScreen from "./authScreen/VerifyOTPScreen";
// import MainScreenStack from "../MainScreenStack"; 
// import MainScreenStack from "../stacks/DashBoardScreenStack"


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Stack.Screen name="VerifyOTPScreen" component={VerifyOTPScreen} />
      {/* <Stack.Screen name="MainScreenStack" component={MainScreenStack} /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
