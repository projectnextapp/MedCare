import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PatientMyAppointmentsScreen from "../../screens/mainScreens/appointmentScreen/MyAppointmentsScreen";
// import PatientMyAppointmentsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentsScreen";

import DoctorAppointmentsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentsScreen";
import DoctorAppointmentDetailsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentDetailsScreen";

import AppointmentDetailsScreen from "../../screens/mainScreens/appointmentScreen/AppointmentDetailsScreen";
import RescheduleAppointmentScreen from "../../screens/mainScreens/appointmentScreen/RescheduleAppointmentScreen";

import PatientPrescriptionDetailsScreen from "../../screens/patient/prescription/PatientPrescriptionDetailsScreen";
import PrescriptionDetailsScreen from "../../screens/doctorScreens/appointments/PrescriptionDetailsScreen";
// import PatientPrescriptionsScreen from "../../screens/patient/prescription/PatientPrescriptionsScreen";

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

      <Stack.Screen
        name="PatientPrescriptionDetails"
        component={PatientPrescriptionDetailsScreen}
      />

      {/* <Stack.Screen
        name="PatientPrescriptions"
        component={PatientPrescriptionsScreen}
      /> */}

      <Stack.Screen
        name="PatientPrescriptions"
        component={PrescriptionDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MyAppointmentsStack;
