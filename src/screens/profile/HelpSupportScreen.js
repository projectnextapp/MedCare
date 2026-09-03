import React from "react";

import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./HelpSupportScreen.css";

const HelpSupportScreen = ({ navigation }) => {
  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "Please contact MedCare support on 08034444055 for assistance with your account, appointments, prescriptions, or medical records.",
      [
        {
          text: "OK",
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={25} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={40}
              color="#fff"
            />
          </View>

          <Text style={styles.headerTitle}>Help & Support</Text>

          <Text style={styles.headerSubtitle}>How can we help you?</Text>
        </View>

        {/* COMMON QUESTIONS */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Common Questions</Text>

          <View style={styles.question}>
            <MaterialCommunityIcons
              name="calendar-question"
              size={24}
              color="#4880D8"
            />

            <View style={styles.questionContent}>
              <Text style={styles.questionTitle}>
                How do I book an appointment?
              </Text>

              <Text style={styles.questionText}>
                Open the doctor directory, select a doctor, choose an available
                date and time, then submit your appointment request.
              </Text>
            </View>
          </View>

          <View style={styles.question}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color="#4880D8"
            />

            <View style={styles.questionContent}>
              <Text style={styles.questionTitle}>
                Where can I see my medical records?
              </Text>

              <Text style={styles.questionText}>
                Your medical records are available from your patient profile
                after they have been created by an authorized healthcare
                professional.
              </Text>
            </View>
          </View>

          <View style={styles.question}>
            <MaterialCommunityIcons
              name="prescription"
              size={24}
              color="#4880D8"
            />

            <View style={styles.questionContent}>
              <Text style={styles.questionTitle}>
                Where can I see my prescription?
              </Text>

              <Text style={styles.questionText}>
                Prescriptions created by your doctor can be viewed from the
                relevant appointment or prescription section.
              </Text>
            </View>
          </View>

          <View style={styles.question}>
            <MaterialCommunityIcons
              name="lock-reset"
              size={24}
              color="#4880D8"
            />

            <View style={styles.questionContent}>
              <Text style={styles.questionTitle}>I forgot my password.</Text>

              <Text style={styles.questionText}>
                Use the Forgot Password option on the login screen to reset your
                password.
              </Text>
            </View>
          </View>
        </View>

        {/* CONTACT */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Need More Help?</Text>

          <Text style={styles.contactText}>
            If you cannot find an answer to your question, contact MedCare
            support.
          </Text>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactSupport}
          >
            <MaterialCommunityIcons name="headset" size={22} color="#fff" />

            <Text style={styles.contactButtonText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <MaterialCommunityIcons
            name="heart-pulse"
            size={22}
            color="#4880D8"
          />

          <Text style={styles.footerText}>MedCare Support</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpSupportScreen;
