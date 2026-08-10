import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Import your screen components
import DashBoardScreenStack from "../../screens/mainScreens/dashboardScreen/Dashboard";
import DoctorListScreen from "../../screens/mainScreens/doctorsScreen/DoctorListScreen";
// import DoctorDetailsScreen from "../../screens/mainScreens/doctorsScreen/DoctorDetailsScreen";
import DoctorDetailsScreen from "../../screens/mainScreens/doctorsScreen/DoctorDetailsScreen";
import BookAppointmentScreen from "../../screens/mainScreens/appointmentScreen/BookAppointmentScreen";
import NotificationScreen from "../../screens/mainScreens/notificationScreen/NotificationScreen";
// import ProfileScreen from "../../screens/profile/ProfileScreen";
import ProfileStack from "../stacks/ProfileStack";

import MyAppointmentsStack from "../stacks/MyAppointmentsStack";


const TabNavigator = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1. Create a Stack Navigator specifically for the Doctors flow
const DoctorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DoctorListScreen" component={DoctorListScreen} />
      <Stack.Screen
        name="DoctorDetailsScreen"
        component={DoctorDetailsScreen}
      />
      <Stack.Screen
        name="BookAppointmentScreen"
        component={BookAppointmentScreen}
      />
    </Stack.Navigator>
  );
};



  

const PatientTabs = () => {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused, color }) => {
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
                name={focused ? "doctor" : "doctor"}
                size={24}
                color={color}
              />
            );
          }

          if (route.name === "Appointments") {
            return (
              <MaterialCommunityIcons
                name={focused ? "calendar-check" : "calendar-check-outline"}
                size={24}
                color={color}
              />
            );
          }

          if (route.name === "Notifications") {
            return (
              <Ionicons
                name={focused ? "notifications" : "notifications-outline"}
                size={24}
                color={color}
              />
            );
          }

          if (route.name === "Profile") {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
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
      <TabNavigator.Screen name="Home" component={DashBoardScreenStack} />

      {/* 2. Use DoctorStack instead of DoctorListScreen */}
      <TabNavigator.Screen name="Doctors" component={DoctorStack} />

      <TabNavigator.Screen
        name="Appointments"
        component={MyAppointmentsStack}
        options={{
          title: "Appointment",
        }}
      />
      <TabNavigator.Screen
        name="Notifications"
        component={NotificationScreen}
      />
      <TabNavigator.Screen name="Profile" component={ProfileStack} />
    </TabNavigator.Navigator>
  );
};

export default PatientTabs;
