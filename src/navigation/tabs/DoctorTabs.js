

import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import DoctorStack from "../stacks/DoctorStack";
import AdminDoctorStack from "../stacks/AdminDoctorStack";

// import MyAppointmentsStack from "../stacks/MyAppointmentsStack";
import DoctorAppointmentsStack from "../stacks/DoctorAppointmentsStack";

// import PatientStack from "../stacks/PatientStack";
import ProfileStack from "../stacks/ProfileStack";

const Tab = createBottomTabNavigator();

const DoctorTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#4880D8",

        tabBarInactiveTintColor: "#8E8E93",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminDoctorStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Appointments"
        component={DoctorAppointmentsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-check"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Patients"
        component={PatientStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DoctorTabs;
