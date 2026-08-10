import React, { useEffect } from "react";

import { View, ActivityIndicator } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FlashScreensStack from "./stacks/FlashScreenStack";
import AuthStack from "./stacks/AuthStack";

import PatientTabs from "./tabs/PatientTabs";
import DoctorTabs from "./tabs/DoctorTabs";
import AdminTabs from "./tabs/AdminTabs";
import SuperAdminTabs from "./tabs/SuperAdminTabs";

import { loadStoredUser } from "../redux/authSlice";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();

  const {
    user,

    // loading,

    isAuthenticated,

    isInitialized,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadStoredUser());
  }, [dispatch]);

  // Wait while checking stored login
  // if (!isInitialized || loading) {
    if (!isInitialized ) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#4880D8" />
      </View>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="FlashScreensStack" component={FlashScreensStack} />

        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    );
  }

  // Logged in
  switch (user?.role) {
    case "patient":
      return <PatientTabs />;

    case "doctor":
      return <DoctorTabs />;

    // case "admin":
    //   return <AdminTabs />;

    case "superadmin":
      return <SuperAdminTabs />;

    default:
      return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </Stack.Navigator>
      );
  }
};

export default RootNavigator;
