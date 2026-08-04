import React from "react";

import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

import styles from "./LoadingButton.css";

const LoadingButton = ({
  title,
  loading = false,
  disabled = false,
  onPress,
  backgroundColor = "#4880D8",
  textColor = "#FFFFFF",
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={loading || disabled}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor,
          opacity: loading || disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: textColor,
            },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;
