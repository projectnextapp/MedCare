import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileScreen from "../../screens/profile/ProfileScreen";
import LoginScreen from "./authScreen/LoginScreen";
import PatientMedicalRecordsScreen from "../../screens/patient/medicalrecord/PatientMedicalRecordsScreen";


import PrivacyPolicyScreen from "../../screens/profile/PrivacyPolicyScreen";
import HelpSupportScreen from "../../screens/profile/HelpSupportScreen";
import AboutScreen from "../../screens/profile/AboutScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="PatientMedicalRecordsScreen"
        component={PatientMedicalRecordsScreen}
      />

      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
      />

      <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />

      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
