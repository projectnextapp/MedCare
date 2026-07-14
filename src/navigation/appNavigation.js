import React from "react";

import { createStackNavigator } from "@react-navigation/stack";


// Onboarding screens
import OnboardingScreen from "../screens/flashScreens/OnboardingScreen";
import FlashScreen1 from "../screens/flashScreens/FlashScreen1";
import FlashScreen2 from "../screens/flashScreens/FlashScreen2";
import FlashScreen3 from "../screens/flashScreens/FlashScreen3";

//authScreens
import LoginScreen from "../screens/authScreen/LoginScreen";
import RegisterScreen from "../screens/authScreen/RegisterScreen";
import ForgotPasswordScreen from "../screens/authScreen/ForgotPasswordScreen";
import VerifyOTPScreen from "../screens/authScreen/VerifyOTPScreen";
import ResetPasswordScreen from "../screens/authScreen/ResetPasswordScreen";

import DashBoardScreens from "../screens/mainScreens/dashboardScreen/Dashboard";



const Stack = createStackNavigator();


function FlashScreenStack() {
  return (
    <Stack.Navigator
           screenOptions={{
        animation: "fade",
        animationDuration: 200,
      }}
    >
       <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlashScreen1"
        component={FlashScreen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlashScreen2"
        component={FlashScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FlashScreen3"
        component={FlashScreen3}
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>
  );
}

function AuthScreenStack() {
  return (
    <Stack.Navigator
           screenOptions={{
        animation: "fade",
        animationDuration: 200,
      }}
    >
       <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="VerifyOTPScreen"
        component={VerifyOTPScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}

//dashboard scren stack
function MainScreenStack() {
  return (
    <Stack.Navigator
           screenOptions={{
        animation: "fade",
        animationDuration: 200,
      }}
    >
       <Stack.Screen
        name="DashBoardScreens"
        component={DashBoardScreens}
        options={{ headerShown: false }}
      />
      
      
    </Stack.Navigator>
  );
}


export default function appNavigation() {
  return (
    <Stack.Navigator 
    //  initialRouteName="OnboardingScreen" 
     screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FlashScreenStack" component={FlashScreenStack} />
      <Stack.Screen name="AuthScreenStack" component={AuthScreenStack} />
      <Stack.Screen name="MainScreenStack" component={MainScreenStack} />
    </Stack.Navigator>

    
  );
}
