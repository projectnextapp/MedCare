import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DoctorListScreen from "../../screens/admin/doctors/DoctorListScreen";
import DoctorDetailsScreen from "../../screens/mainScreens/doctorsScreen/DoctorDetailsScreen";
// import DoctorDetailsScreen from "../../screens/admin/doctors/DoctorDetailsScreen";
// import AddDoctorScreen from "../../screens/admin/doctors/AddDoctorScreen";
// import EditDoctorScreen from "../../screens/admin/doctors/EditDoctorScreen";
import DoctorAvailabilityScreen from "../../screens/admin/doctors/DoctorAvailabilityScreen";

// import BookAppointmentScreen from "../../screens/mainScreens/appointmentScreen/BookAppointmentScreen";

const Stack = createNativeStackNavigator();

const DoctorStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorList"
      screenOptions={{
        headerShown: false,

        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="DoctorList" component={DoctorListScreen} />

      <Stack.Screen name="DoctorDetails" component={DoctorDetailsScreen} />

      <Stack.Screen name="AddDoctor" component={AddDoctorScreen} />

      <Stack.Screen name="EditDoctor" component={EditDoctorScreen} />

      {/* <Stack.Screen
        name="BookAppointmentScreen"
        component={BookAppointmentScreen}
      /> */}
      <Stack.Screen
        name="DoctorAvailabilityScreen"
        component={DoctorAvailabilityScreen}
        options={{
          title: "Availability",
        }}
      />
    </Stack.Navigator>
  );
};

export default DoctorStack;
