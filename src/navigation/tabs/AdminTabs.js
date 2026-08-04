// import React from "react";

// import { Platform } from "react-native";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Ionicons from "@expo/vector-icons/Ionicons";

// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import AddDoctorScreenr from "../../screens/admin/doctors/AddDoctorScreen";

// // import DoctorStack from "../stacks/DoctorStack";

// // import PatientStack from "../stacks/PatientStack";

// // import ReportsScreen from "../../screens/admin/reports/ReportsScreen";

// // import ProfileScreen from "../../screens/admin/profile/ProfileScreen";

// const Tab = createBottomTabNavigator();

// const AdminTabs = () => {
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

//             case "Doctors":
//               return (
//                 <MaterialCommunityIcons name="doctor" size={24} color={color} />
//               );

//             case "Patients":
//               return (
//                 <MaterialCommunityIcons
//                   name="account-group"
//                   size={24}
//                   color={color}
//                 />
//               );

//             case "Reports":
//               return (
//                 <Ionicons
//                   name={focused ? "bar-chart" : "bar-chart-outline"}
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
//       {/* <Tab.Screen name="Dashboard" component={DashboardScreen} /> */}
//       <Tab.Screen name="Dashboard" component={() => "Dashboard" } />

//       {/* <Tab.Screen name="Doctors" component={DoctorStack} /> */}

//       {/* <Tab.Screen name="Patients" component={PatientStack} /> */}

//       {/* <Tab.Screen name="Reports" component={ReportsScreen} /> */}

//       {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
//     </Tab.Navigator>
//   );
// };

// export default AdminTabs;

import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// import AddDoctorScreen from "../../screens/admin/doctors/AddDoctorScreen";
import AdminDoctorStack from "../stacks/AdminDoctorStack";

const Tab = createBottomTabNavigator();

// Placeholder screen component for dummy navigation
const DummyScreen = ({ title }) => (
  <View style={styles.dummyContainer}>
    <Text style={styles.dummyTitle}>{title} Screen</Text>
    <Text style={styles.dummySubtitle}>
      Placeholder view for admin navigation
    </Text>
  </View>
);

const AdminTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#4880D8",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: Platform.OS === "ios" ? 25 : 12,
          minHeight: Platform.OS === "ios" ? 85 : 70,
        },
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Dashboard":
              return (
                <Ionicons
                  name={focused ? "grid" : "grid-outline"}
                  size={24}
                  color={color}
                />
              );

            case "Doctors":
              return (
                <MaterialCommunityIcons name="doctor" size={24} color={color} />
              );

            case "Patients":
              return (
                <MaterialCommunityIcons
                  name="account-group"
                  size={24}
                  color={color}
                />
              );

            case "Reports":
              return (
                <Ionicons
                  name={focused ? "bar-chart" : "bar-chart-outline"}
                  size={24}
                  color={color}
                />
              );

            case "Profile":
              return (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color={color}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="Dashboard">
        {() => <DummyScreen title="Dashboard" />}
      </Tab.Screen>

      {/* <Tab.Screen name="Doctors">
        {() => <DummyScreen title="Doctors Management" />}
      </Tab.Screen> */}

      <Tab.Screen name="Doctors" component={AdminDoctorStack} />

      <Tab.Screen name="Patients">
        {() => <DummyScreen title="Patients Management" />}
      </Tab.Screen>

      <Tab.Screen name="Reports">
        {() => <DummyScreen title="Reports & Analytics" />}
      </Tab.Screen>

      <Tab.Screen name="Profile">
        {() => <DummyScreen title="Admin Profile" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  dummyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  dummyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  dummySubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
});

export default AdminTabs;
