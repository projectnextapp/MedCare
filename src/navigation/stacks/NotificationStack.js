import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NotificationScreen from "../../screens/mainScreens/notificationScreen/NotificationScreen";

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Notifications"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Notifications" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
