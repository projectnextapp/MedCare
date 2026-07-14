  import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  Keyboard,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import {
  resetPassword,
  resendOTP,
  clearError,
} from "../../redux/authSlice";

import styles from "./ResetPasswordScreen.css";

const OTP_LENGTH = 6;

const ResetPasswordScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const email = route?.params?.email || "";

  // =============================
  // OTP STATE
  // =============================

  const [otp, setOtp] = useState(
    new Array(OTP_LENGTH).fill("")
  );

  const inputRefs = useRef([]);

  // =============================
  // PASSWORD STATE
  // =============================

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =============================
  // TIMER
  // =============================

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  // =============================
  // DISPLAY REDUX ERRORS
  // =============================

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);

      dispatch(clearError());
    }
  }, [error]);

  // =============================
  // OTP INPUT
  // =============================

  const handleOTPChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const otpArray = [...otp];

    otpArray[index] = value;

    setOtp(otpArray);

    if (
      value &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =============================
  // BACKSPACE
  // =============================

  const handleKeyPress = (
    e,
    index
  ) => {
    if (
      e.nativeEvent.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // =============================
  // PASTE SUPPORT
  // =============================

  const handlePaste = (text) => {
    if (text.length !== OTP_LENGTH)
      return;

    const numbers = text
      .split("")
      .slice(0, OTP_LENGTH);

    setOtp(numbers);

    Keyboard.dismiss();
  };

  // =============================
  // VALIDATION
  // =============================

  const validateForm = () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      Alert.alert(
        "Validation",
        "Enter the complete verification code."
      );

      return false;
    }

    if (!password) {
      Alert.alert(
        "Validation",
        "Password is required."
      );

      return false;
    }

    if (password.length < 8) {
      Alert.alert(
        "Validation",
        "Password must be at least 8 characters."
      );

      return false;
    }

    if (!/[A-Z]/.test(password)) {
      Alert.alert(
        "Validation",
        "Password must contain at least one uppercase letter."
      );

      return false;
    }

    if (!/[0-9]/.test(password)) {
      Alert.alert(
        "Validation",
        "Password must contain at least one number."
      );

      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Validation",
        "Passwords do not match."
      );

      return false;
    }

    return true;
  };

  // =============================
  // RESET PASSWORD
  // =============================

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    const code = otp.join("");

    const result = await dispatch(
      resetPassword({
        email,
        otp: code,
        password,
      })
    );

    if (
      resetPassword.fulfilled.match(
        result
      )
    ) {
      Alert.alert(
        "Success",
        "Password reset successful.",
        [
          {
            text: "Login",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "LoginScreen",
                  },
                ],
              }),
          },
        ]
      );
    }
  };

  // =============================
  // RESEND OTP
  // =============================

  const handleResendOTP = async () => {
    if (seconds > 0) return;

    const result = await dispatch(
      resendOTP(email)
    );

    if (
      resendOTP.fulfilled.match(result)
    ) {
      Alert.alert(
        "Success",
        "A new verification code has been sent."
      );

      setSeconds(60);

      setOtp(
        new Array(OTP_LENGTH).fill("")
      );

      inputRefs.current[0]?.focus();
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContainer}
      >
        {/* ================= HEADER ================= */}

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

        {/* ================= FORM ================= */}

        <View style={styles.formContainer}>

          <Text style={styles.title}>
            Reset Password
          </Text>

          <Text style={styles.subtitle}>
            Enter the verification code sent to
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>

          {/* ================= OTP ================= */}

          <Text style={styles.label}>
            Verification Code
          </Text>

          <View style={styles.otpContainer}>

            {otp.map((digit, index) => (

              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => {

                  if (value.length > 1) {
                    handlePaste(value);
                  } else {
                    handleOTPChange(value, index);
                  }

                }}
                onKeyPress={(e) =>
                  handleKeyPress(e, index)
                }
              />

            ))}

          </View>

          {/* ================= TIMER ================= */}

          <View style={styles.timerContainer}>

            <Text style={styles.timerText}>

              {seconds > 0
                ? `Resend code in ${seconds}s`
                : "Didn't receive the code?"}

            </Text>

            <TouchableOpacity
              disabled={seconds > 0}
              onPress={handleResendOTP}
            >

              <Text
                style={[
                  styles.resendText,
                  seconds > 0 &&
                    styles.disabledResend,
                ]}
              >
                Resend Code
              </Text>

            </TouchableOpacity>

          </View>

          {/* ================= PASSWORD ================= */}

          <Text style={styles.label}>
            New Password
          </Text>

          <View style={styles.passwordContainer}>

            <TextInput
              placeholder="Enter new password"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
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

          {/* ================= CONFIRM PASSWORD ================= */}

          <Text style={styles.label}>
            Confirm Password
          </Text>

          <View style={styles.passwordContainer}>

            <TextInput
              placeholder="Confirm password"
              secureTextEntry={!showConfirmPassword}
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
              onPress={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >

              <MaterialCommunityIcons
                name={
                  showConfirmPassword
                    ? "eye"
                    : "eye-off"
                }
                size={22}
                color="#4880D8"
              />

            </TouchableOpacity>

          </View>

          {/* ================= PASSWORD REQUIREMENTS ================= */}

          <View style={styles.passwordTips}>

            <Text style={styles.tip}>
              • Minimum 8 characters
            </Text>

            <Text style={styles.tip}>
              • At least one uppercase letter
            </Text>

            <Text style={styles.tip}>
              • At least one number
            </Text>

          </View>

          {/* ================= BUTTON ================= */}

          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={handleResetPassword}
          >

            {loading ? (

              <ActivityIndicator color="#FFF" />

            ) : (

              <Text style={styles.buttonText}>
                Reset Password
              </Text>

            )}

          </TouchableOpacity>

          {/* ================= LOGIN ================= */}

          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() =>
              navigation.navigate("Login")
            }
          >

            <Text style={styles.loginText}>
              Back to Login
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView>
  );

};

export default ResetPasswordScreen;