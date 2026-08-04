import React, { useState } from "react";

import { View, Text, Switch, TouchableOpacity, Platform } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "./AvailabilityCard.css";

const AvailabilityCard = ({ item, onChange }) => {
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateField = (field, value) => {
    onChange({
      ...item,
      [field]: value,
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.day}>{item.day}</Text>

        <Switch
          value={item.enabled}
          onValueChange={(value) => updateField("enabled", value)}
        />
      </View>

      {item.enabled && (
        <>
          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowStartPicker(true)}
          >
            <Text style={styles.label}>Start Time</Text>

            <Text style={styles.time}>{item.startTime || "Select Time"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowEndPicker(true)}
          >
            <Text style={styles.label}>End Time</Text>

            <Text style={styles.time}>{item.endTime || "Select Time"}</Text>
          </TouchableOpacity>
        </>
      )}

      {showStartPicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);

            if (selectedDate) {
              updateField("startTime", formatTime(selectedDate));
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          mode="time"
          value={new Date()}
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);

            if (selectedDate) {
              updateField("endTime", formatTime(selectedDate));
            }
          }}
        />
      )}
    </View>
  );
};

export default AvailabilityCard;
