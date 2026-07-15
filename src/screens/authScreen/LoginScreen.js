import React, {useState, useEffect} from "react";
import { View, Text, BackHandler, TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView, } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "expo-checkbox";


import { loginUser, clearError } from "../../redux/authSlice";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LoginScreen.css";


const LoginScreen = () => {
  const navigation = useNavigation();
   const dispatch = useDispatch();
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



 const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("Login Failed", error);

      dispatch(clearError());
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "MainScreenStack", 
      params: { screen: "DashBoardScreens" } }],
      });
    }
  }, [isAuthenticated]);

  const validateForm = () => {
    if (!email || !password) {
      Alert.alert(
        "Validation",
        "Please enter your email and password."
      );

      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Validation",
        "Enter a valid email."
      );

      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    const result = await dispatch(
      loginUser({
        email,
        password,
      })
    );


    if (loginUser.rejected.match(result)) {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Header */}

        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/logo1.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.logoText}>
            MEDCARE
          </Text>
        </View>

        {/* Form */}

        <View style={styles.formContainer}>
          <Text style={styles.title}>
            Welcome Back
          </Text>

          <Text style={styles.subtitle}>
            Login to continue
          </Text>

          {/* Email */}

          {/* <Text style={styles.label}>
            Email
          </Text> */}

          <TextInput
            placeholder="Enter your email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          {/* Password */}

          {/* <Text style={styles.label}>
            Password
          </Text> */}

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(!showPassword)
              }
            >
              <MaterialCommunityIcons
                name={
                  showPassword
                    ? "eye"
                    : "eye-off"
                }
                size={22}
                color="#4880D8"
              />
            </TouchableOpacity>
          </View>

          {/* Remember */}

          <View style={styles.row}>
            <View style={styles.checkboxRow}>
              <CheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                color={
                  rememberMe
                    ? "#4880D8"
                    : undefined
                }
              />

              <Text style={styles.remember}>
                Remember Me
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "ForgotPasswordScreen"
                )
              }
            >
              <Text style={styles.forgot}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login */}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>
                Login
              </Text>
            )}
          </TouchableOpacity>

          {/* Register */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "RegisterScreen"
              )
            }
          >
            <Text style={styles.register}>
              Don't have an account?
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;