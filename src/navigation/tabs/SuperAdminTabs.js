import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

// Placeholder screen component for dummy navigation
const DummyScreen = ({ title }) => (
  <View style={styles.dummyContainer}>
    <Text style={styles.dummyTitle}>{title} Screen</Text>
    <Text style={styles.dummySubtitle}>
      Placeholder view for super admin navigation
    </Text>
  </View>
);

const SuperAdminTabs = () => {
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
            case "Hospitals":
              return (
                <MaterialCommunityIcons
                  name={focused ? "hospital-building" : "hospital-building"}
                  size={24}
                  color={color}
                />
              );

            case "Admins":
              return (
                <Ionicons
                  name={focused ? "people" : "people-outline"}
                  size={24}
                  color={color}
                />
              );

            case "Analytics":
              return (
                <Ionicons
                  name={focused ? "stats-chart" : "stats-chart-outline"}
                  size={24}
                  color={color}
                />
              );

            case "Logs":
              return (
                <Ionicons
                  name={
                    focused ? "shield-checkmark" : "shield-checkmark-outline"
                  }
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
      <Tab.Screen name="Hospitals">
        {() => <DummyScreen title="Hospital Management" />}
      </Tab.Screen>

      <Tab.Screen name="Admins">
        {() => <DummyScreen title="Admin Accounts" />}
      </Tab.Screen>

      <Tab.Screen name="Analytics">
        {() => <DummyScreen title="System Analytics" />}
      </Tab.Screen>

      <Tab.Screen name="Logs">
        {() => <DummyScreen title="Audit & Security Logs" />}
      </Tab.Screen>

      <Tab.Screen name="Profile">
        {() => <DummyScreen title="Super Admin Profile" />}
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

export default SuperAdminTabs;
