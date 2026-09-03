import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PatientMyAppointmentsScreen from "../../screens/mainScreens/appointmentScreen/MyAppointmentsScreen";
// import MyAppointmentsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentsScreen";
// import AppointmentDetailsScreen from "../../screens/mainScreens/appointmentScreen/AppointmentDetailsScreen";
// import RescheduleAppointmentScreen from "../../screens/mainScreens/appointmentScreen/RescheduleAppointmentScreen";

import DoctorAppointmentsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentsScreen";
import DoctorAppointmentDetailsScreen from "../../screens/doctorScreens/appointments/DoctorAppointmentDetailsScreen";
import AddConsultationNoteScreen from "../../screens/doctorScreens/appointments/AddConsultationNoteScreen";
import WritePrescriptionScreen from "../../screens/doctorScreens/appointments/WritePrescriptionScreen";
import PrescriptionDetailsScreen from "../../screens/doctorScreens/appointments/PrescriptionDetailsScreen";
// import DoctorAppointmentsScreen from "../../screens/mainScreens/appointmentScreen/MyAppointmentsScreen";

// delete import CreateMedicalRecordScreen from "../screens/Doctor/MedicalRecords/CreateMedicalRecordScreen/CreateMedicalRecordScreen";
import CreateMedicalRecordScreen from "../../screens/doctorScreens/MedicalRecords/CreateMedicalRecordScreen/CreateMedicalRecordScreen";
import PatientMedicalRecordScreen from "../../screens/doctorScreens/MedicalRecords/PatientMedicalRecord/PatientMedicalRecordScreen";

const Stack = createNativeStackNavigator();

const DoctorAppointmentsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorAppointmentsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DoctorAppointmentsScreen"
        component={DoctorAppointmentsScreen}
      />

      <Stack.Screen
        name="DoctorAppointmentDetailsScreen"
        component={DoctorAppointmentDetailsScreen}
      />
      <Stack.Screen
        name="AddConsultationNoteScreen"
        component={AddConsultationNoteScreen}
      />

      <Stack.Screen
        name="WritePrescriptionScreen"
        component={WritePrescriptionScreen}
      />

      <Stack.Screen
        name="PrescriptionDetails"
        component={PrescriptionDetailsScreen}
        options={{
          title: "Prescription",
        }}
      />

      <Stack.Screen
        name="CreateMedicalRecordScreen"
        component={CreateMedicalRecordScreen}
      />

      <Stack.Screen
        name="PatientMedicalRecord"
        component={PatientMedicalRecordScreen}
      />
      {/* <Stack.Screen
        name="PatientMyAppointmentsScreen"
        component={PatientMyAppointmentsScreen}
      /> */}

      {/* <Stack.Screen
        name="AppointmentDetailsScreen"
        component={AppointmentDetailsScreen}
      /> */}
      {/* <Stack.Screen
        name="RescheduleAppointmentScreen"
        component={RescheduleAppointmentScreen}
      />
      <Stack.Screen
        name="DoctorAppointmentsScreen"
        component={DoctorAppointmentsScreen}
      />
      <Stack.Screen
        name="DoctorAppointmentDetailsScreen"
        component={DoctorAppointmentDetailsScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default DoctorAppointmentsStack;
