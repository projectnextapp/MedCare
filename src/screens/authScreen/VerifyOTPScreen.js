import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { verifyOTP,resendOTP, } from "../../redux/authSlice";
import styles from "./VerifyOTPScreen.css";

const VerifyOTPScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const { email } = route.params;

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [seconds, setSeconds] = useState(60);

  const inputs = useRef([]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleOTPChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOTP = [...otp];

    newOTP[index] = value;

    setOtp(newOTP);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }

    if (!value && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      Alert.alert(
        "Invalid OTP",
        "Please enter all six digits."
      );
      return;
    }

    const result = await dispatch(
      verifyOTP({
        email,
        otp: code,
      })
    );
//  console.log("Verify Result:", result);

    if (verifyOTP.fulfilled.match(result)) {
      Alert.alert(
        "Success",
        "Account verified successfully."
      );

      navigation.reset({
        index: 0,
        routes: [{ 
      name: "MainScreenStack", 
      params: { screen: "DashBoardScreens" } 
    }],
      });
    }

    if (verifyOTP.rejected.match(result)) {
      Alert.alert(
        "Verification Failed",
        result.payload?.message ||
          "Invalid verification code."
      );
    }
  };

 const handleResendOTP = async () => {
  const result = await dispatch(
    resendOTP(email)
  );

  if (resendOTP.fulfilled.match(result)) {
    Alert.alert(
      "Success",
      "A new verification code has been sent."
    );

    setOtp(["", "", "", "", "", ""]);
    setSeconds(60);

    if (inputs.current[0]) {
      inputs.current[0].focus();
    }
  }

  if (resendOTP.rejected.match(result)) {
    Alert.alert(
      "Error",
      result.payload?.message ||
        "Unable to resend OTP."
    );
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Verify Your Email
      </Text>

      <Text style={styles.subtitle}>
        Enter the verification code sent to
      </Text>

      <Text style={styles.email}>
        {email}
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpInput}
            value={digit}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(value) =>
              handleOTPChange(value, index)
            }
          />
        ))}
      </View>

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      {seconds > 0 ? (
        <Text style={styles.timer}>
          Resend code in {seconds}s
        </Text>
      ) : (
        <TouchableOpacity
    disabled={loading}
    onPress={handleResendOTP}
>
    {loading ? (
        <ActivityIndicator color="#4880D8" />
    ) : (
        <Text style={styles.resend}>
            Resend Code
        </Text>
    )}
</TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>
            Verify
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyOTPScreen;