import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import DoctorListScreen from "../../screens/mainScreens/doctorsScreen/DoctorListScreen";
import DoctorListScreen from "../../screens/admin/doctors/DoctorListScreen";
import DoctorDetailsScreen from "../../screens/mainScreens/doctorsScreen/DoctorDetailsScreen";
// import DoctorDetailsScreen from "../../screens/admin/doctors/DoctorDetailsScreen"; delete the file later

import AddDoctorScreen from "../../screens/admin/doctors/AddDoctorScreen";

import EditDoctorScreen from "../../screens/admin/doctors/EditDoctorScreen";

import DoctorAvailabilityScreen from "../../screens/mainScreens/doctorsScreen/DoctorAvailabilityScreen";

const Stack = createNativeStackNavigator();

const AdminDoctorStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorListScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DoctorListScreen" component={DoctorListScreen} />

      <Stack.Screen
        name="DoctorDetailsScreen"
        component={DoctorDetailsScreen}
        options={{
          title: "Doctor Details",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#4880D8",
          },
        }}
      />

      <Stack.Screen
        name="AddDoctorScreen"
        component={AddDoctorScreen}
        options={{
          title: "Add Doctorrrrr",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#4880D8",
          },
        }}
      />

      <Stack.Screen
        name="EditDoctorScreen"
        component={EditDoctorScreen}
        options={{
          title: "Edit Doctor",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#4880D8",
          },
        }}
      />

      <Stack.Screen
        name="DoctorAvailabilityScreen"
        component={DoctorAvailabilityScreen}
        options={{
          title: "Doctor Availability",
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminDoctorStack;
