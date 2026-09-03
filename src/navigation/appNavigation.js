import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Feather } from "@react-native-vector-icons/feather";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


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

import DoctorListScreen from "../screens/mainScreens/doctorsScreen/DoctorListScreen";

import AppointmentScreen from "../screens/mainScreens/appointmentScreen/AppointmentScreen";

import NotificationScreen from "../screens/mainScreens/notificationScreen/NotificationScreen";

import ProfileScreen from "../screens/mainScreens/profileScreen/ProfileScreen";


const Stack = createStackNavigator();
const TabNavigator = createBottomTabNavigator();


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
function DashBoardScreenStack() {
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

function MainScreenStack() {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            );
          }

          if (route.name === "Doctors") {
            return (
              <MaterialCommunityIcons
                name={
                  focused
                    ? "doctor"
                    : "doctor"
                }
                size={24}
                color={color}
              />
            );
          }

          if (route.name === "Appointments") {
            return (
              <MaterialCommunityIcons
                name={
                  focused
                    ? "calendar-check"
                    : "calendar-check-outline"
                }
                size={24}
                color={color}
              />
            );
          }

          if (route.name === "Notifications") {
            return (
              <Ionicons
                name={
                  focused
                    ? "notifications"
                    : "notifications-outline"
                }
                size={24}
                color={color}
              />
            );
          }

          if (route.name === "Profile") {
            return (
              <Ionicons
                name={
                  focused
                    ? "person"
                    : "person-outline"
                }
                size={24}
                color={color}
              />
            );
          }
        },

        tabBarActiveTintColor: "#4880D8",

        tabBarInactiveTintColor: "#8E8E93",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          minHeight: Platform.OS === "ios" ? 85 : 70,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5E5",
        },
      })}
    >
      <TabNavigator.Screen
        name="Home"
        component={DashBoardScreenStack}
      />

      <TabNavigator.Screen
        name="Doctors"
        component={DoctorListScreen}
      />

      <TabNavigator.Screen
        name="Appointments"
        component={AppointmentScreen}
      />

      <TabNavigator.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      <TabNavigator.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </TabNavigator.Navigator>
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
