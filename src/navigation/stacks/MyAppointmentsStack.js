import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PatientMyAppointmentsScreen from "../../screens/mainScreens/appointmentScreen/MyAppointmentsScreen";
// import PatientMyAppointmentsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentsScreen";


import DoctorAppointmentsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentsScreen";
import DoctorAppointmentDetailsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentDetailsScreen";

import AppointmentDetailsScreen from "../../screens/mainScreens/appointmentScreen/AppointmentDetailsScreen";
import RescheduleAppointmentScreen from "../../screens/mainScreens/appointmentScreen/RescheduleAppointmentScreen";


const Stack = createNativeStackNavigator();

const MyAppointmentsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PatientMyAppointmentsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PatientMyAppointmentsScreen"
        component={PatientMyAppointmentsScreen}
      />
      <Stack.Screen
        name="AppointmentDetailsScreen"
        component={AppointmentDetailsScreen}
      />
      <Stack.Screen
        name="RescheduleAppointmentScreen"
        component={RescheduleAppointmentScreen}
      />
      <Stack.Screen
        name="DoctorAppointmentsScreen.js"
        component={DoctorAppointmentsScreen}
      />
      <Stack.Screen
        name="DoctorAppointmentDetailsScreen"
        component={DoctorAppointmentDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MyAppointmentsStack;
