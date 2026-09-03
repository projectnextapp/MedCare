import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import PatientMyAppointmentsScreen from "../../screens/mainScreens/appointmentScreen/MyAppointmentsScreen";

// import DoctorAppointmentsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentsScreen";
// import DoctorAppointmentDetailsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentDetailsScreen";

import MyAppointmentsScreen from "../../screens/mainScreens/appointmentScreen/MyAppointmentsScreen";
import AppointmentDetailsScreen from "../../screens/mainScreens/appointmentScreen/AppointmentDetailsScreen";
// import PatientPrescriptionDetails from "../../"

import PatientMedicalRecord from "../../screens/patient/medicalrecord/PatientMedicalRecordsScreen";
import DoctorListScreen from "../../screens/mainScreens/doctorsScreen/DoctorListScreen";
import DoctorDetailsScreen from "../../screens/mainScreens/doctorsScreen/DoctorDetailsScreen";
import BookAppointmentScreen from "../../screens/mainScreens/appointmentScreen/BookAppointmentScreen";
import RescheduleAppointmentScreen from "../../screens/mainScreens/appointmentScreen/RescheduleAppointmentScreen";

import PatientPrescriptions from "../../screens/patient/prescription/PatientPrescriptions";

import PatientPrescriptionDetailsScreen from "../../screens/patient/prescription/PatientPrescriptionDetailsScreen";
import PrescriptionDetailsScreen from "../../screens/doctorScreens/appointments/PrescriptionDetailsScreen";

import DashBoard from "../../screens/mainScreens/dashboardScreen/Dashboard";

import UpcomingAppointmentsScreen from "../../screens/patient/upcomingappointments/UpcomingAppointmentsScreen";

const Stack = createNativeStackNavigator();

const DashBoardScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DashBoard"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DashBoard" component={DashBoard} />
      <Stack.Screen
        name="PatientMedicalRecord"
        component={PatientMedicalRecord}
      />
      <Stack.Screen
        name="MyAppointmentsScreen"
        component={MyAppointmentsScreen}
      />

      <Stack.Screen
        name="AppointmentDetailsScreen"
        component={AppointmentDetailsScreen}
      />

      <Stack.Screen
        name="PatientPrescriptionDetails"
        component={PatientPrescriptionDetailsScreen}
      />
      <Stack.Screen name="DoctorListScreen" component={DoctorListScreen} />
      <Stack.Screen
        name="DoctorDetailsScreen"
        component={DoctorDetailsScreen}
      />
      <Stack.Screen
        name="BookAppointmentScreen"
        component={BookAppointmentScreen}
      />
      <Stack.Screen
        name="RescheduleAppointmentScreen"
        component={RescheduleAppointmentScreen}
      />

      {/* 
      <Stack.Screen
        name="DoctorAppointmentsScreen.js"
        component={DoctorAppointmentsScreen}
      />
      <Stack.Screen
        name="DoctorAppointmentDetailsScreen"
        component={DoctorAppointmentDetailsScreen}
      />
*/}

      <Stack.Screen
        name="PatientPrescriptions"
        component={PatientPrescriptions}
      />

      <Stack.Screen
        name="PrescriptionDetailsScreen"
        component={PrescriptionDetailsScreen}
      />

      <Stack.Screen
        name="UpcomingAppointmentsScreen"
        component={UpcomingAppointmentsScreen}
      />
    </Stack.Navigator>
  );
};

export default DashBoardScreenStack;
