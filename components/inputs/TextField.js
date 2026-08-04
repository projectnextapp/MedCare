import React, { useState } from "react";

import { View, Text, TextInput, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./TextField.css";

const TextField = ({
  label,

  value,

  onChangeText,

  placeholder,

  keyboardType = "default",

  secureTextEntry = false,

  multiline = false,

  numberOfLines = 1,

  editable = true,

  error,
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={hidePassword}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          style={styles.input}
          placeholderTextColor="#999"
        />

        {secureTextEntry ? (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <MaterialCommunityIcons
              name={hidePassword ? "eye-off" : "eye"}
              size={22}
              color="#4880D8"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default TextField;
