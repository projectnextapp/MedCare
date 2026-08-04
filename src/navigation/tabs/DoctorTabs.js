// import React from "react";
// import { Platform, View, Text, StyleSheet } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// const Tab = createBottomTabNavigator();

// // Placeholder screen component for dummy navigation
// const DummyScreen = ({ title }) => (
//   <View style={styles.dummyContainer}>
//     <Text style={styles.dummyTitle}>{title} Screen</Text>
//     <Text style={styles.dummySubtitle}>
//       Placeholder view for doctor navigation
//     </Text>
//   </View>
// );

// const DoctorTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarActiveTintColor: "#4880D8",
//         tabBarInactiveTintColor: "#999",
//         tabBarStyle: {
//           paddingTop: 8,
//           paddingBottom: Platform.OS === "ios" ? 25 : 12,
//           minHeight: Platform.OS === "ios" ? 85 : 70,
//         },
//         tabBarIcon: ({ focused, color, size }) => {
//           switch (route.name) {
//             case "Dashboard":
//               return (
//                 <Ionicons
//                   name={focused ? "grid" : "grid-outline"}
//                   size={24}
//                   color={color}
//                 />
//               );

//             case "Appointments":
//               return (
//                 <Ionicons
//                   name={focused ? "calendar" : "calendar-outline"}
//                   size={24}
//                   color={color}
//                 />
//               );

//             case "Patients":
//               return (
//                 <MaterialCommunityIcons
//                   name="account-group"
//                   size={24}
//                   color={color}
//                 />
//               );

//             case "Schedule":
//               return (
//                 <Ionicons
//                   name={focused ? "time" : "time-outline"}
//                   size={24}
//                   color={color}
//                 />
//               );

//             case "Profile":
//               return (
//                 <Ionicons
//                   name={focused ? "person" : "person-outline"}
//                   size={24}
//                   color={color}
//                 />
//               );
//           }
//         },
//       })}
//     >
//       <Tab.Screen name="Dashboard">
//         {() => <DummyScreen title="Doctor Dashboard" />}
//       </Tab.Screen>

//       <Tab.Screen name="Appointments">
//         {() => <DummyScreen title="Appointments Management" />}
//       </Tab.Screen>

//       <Tab.Screen name="Patients">
//         {() => <DummyScreen title="My Patients" />}
//       </Tab.Screen>

//       <Tab.Screen name="Schedule">
//         {() => <DummyScreen title="Schedule & Availability" />}
//       </Tab.Screen>

//       <Tab.Screen name="Profile">
//         {() => <DummyScreen title="Doctor Profile" />}
//       </Tab.Screen>
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   dummyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F8F9FA",
//   },
//   dummyTitle: {
//     fontSize: 22,
//     fontWeight: "600",
//     color: "#1F2937",
//     marginBottom: 8,
//   },
//   dummySubtitle: {
//     fontSize: 14,
//     color: "#6B7280",
//   },
// });

// export default DoctorTabs;


import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import DoctorStack from "../stacks/DoctorStack";
import AdminDoctorStack from "../stacks/AdminDoctorStack";

// import AppointmentStack from "../stacks/AppointmentStack";
// import PatientStack from "../stacks/PatientStack";
// import ProfileStack from "../stacks/ProfileStack";

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

      {/* <Tab.Screen
        name="Appointments"
        component={AppointmentStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-check"
              color={color}
              size={size}
            />
          ),
        }}
      /> */}

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

      {/* <Tab.Screen
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
      /> */}
    </Tab.Navigator>
  );
};

export default DoctorTabs;
