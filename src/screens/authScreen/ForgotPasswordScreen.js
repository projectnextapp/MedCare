import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import {
  forgotPassword,
  clearError,
} from "../../redux/authSlice";

import styles from "./ForgotPasswordScreen.css";

const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);

      dispatch(clearError());
    }
  }, [error]);

  const validateEmail = () => {
    if (!email) {
      Alert.alert(
        "Validation",
        "Please enter your email."
      );

      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Validation",
        "Please enter a valid email."
      );

      return false;
    }

    return true;
  };

  const handleForgotPassword = async () => {
    if (!validateEmail()) return;

    const result = await dispatch(
      forgotPassword({
        email,
      })
    );

    if (forgotPassword.fulfilled.match(result)) {
      Alert.alert(
        "Success",
        "A password reset verification code has been sent to your email."
      );

      navigation.navigate(
        "ResetPasswordScreen",
        {
          email,
        }
      );
    }

    if (forgotPassword.rejected.match(result)) {
      Alert.alert(
        "Error",
        result.payload?.message ||
          "Unable to send verification code."
      );
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
            Forgot Password
          </Text>

          <Text style={styles.subtitle}>
            Enter your registered email address.
            We will send a verification code
            to reset your password.
          </Text>

          <Text style={styles.label}>
            Email Address
          </Text>

          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleForgotPassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>
                Send Verification Code
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.backText}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;