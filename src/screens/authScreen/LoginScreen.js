import React from "react";
import { View, Text, BackHandler } from "react-native";


import { useFocusEffect, useNavigation } from "@react-navigation/native";


const LoginScreen = () => {
  const navigation = useNavigation();
  // Intercept the Android hardware back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          // Navigates safely out of the secondary flash sub-stack
          navigation.navigate("FlashScreenStack"); 
        }
        return true; 
      };

      // 1. Store the event listener registration sequence into a variable
      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      // 2. Clear out the reference safely using the modern subscription object
      return () => subscription.remove();
    }, [navigation])
  );

  return (
    <View>
      <Text>Login Screen</Text>
    </View>
  );
};

export default LoginScreen;