import React from "react";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./PrivacyPolicyScreen.css";

const PrivacyPolicyScreen = ({ navigation }) => {
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
              name="shield-lock-outline"
              size={32}
              color="#fff"
            />
          </View>

          <Text style={styles.headerTitle}>Privacy Policy</Text>

          <Text style={styles.headerSubtitle}>
            Your privacy and data protection
          </Text>
        </View>

        {/* INTRODUCTION */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Introduction</Text>

          <Text style={styles.text}>
            MedCare is committed to protecting your privacy and keeping your
            personal and medical information secure.
          </Text>

          <Text style={styles.text}>
            This Privacy Policy explains how information provided through the
            MedCare application may be collected, used, stored, and protected.
          </Text>
        </View>

        {/* INFORMATION */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Information We Collect</Text>

          <Text style={styles.text}>
            Depending on how you use MedCare, the application may store
            information such as:
          </Text>

          <Text style={styles.bullet}>
            • Your full name and contact information
          </Text>

          <Text style={styles.bullet}>
            • Date of birth and profile information
          </Text>

          <Text style={styles.bullet}>• Appointment information</Text>

          <Text style={styles.bullet}>• Medical records</Text>

          <Text style={styles.bullet}>
            • Prescriptions and treatment information
          </Text>

          <Text style={styles.bullet}>
            • Information necessary to provide healthcare services
          </Text>
        </View>

        {/* MEDICAL DATA */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Medical Information</Text>

          <Text style={styles.text}>
            Medical information is sensitive information. Access to medical
            records and prescriptions should only be available to authorized
            users according to their role and permissions.
          </Text>
        </View>

        {/* SECURITY */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Data Security</Text>

          <Text style={styles.text}>
            MedCare uses appropriate security measures to help protect user
            information from unauthorized access, alteration, disclosure, or
            destruction.
          </Text>
        </View>

        {/* USER RESPONSIBILITY */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Responsibility</Text>

          <Text style={styles.text}>
            Keep your login credentials private and do not share your password
            or verification information with other people.
          </Text>
        </View>

        {/* CONTACT */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Questions About Privacy?</Text>

          <Text style={styles.text}>
            If you have questions or concerns about privacy or your personal
            information, please contact MedCare support.
          </Text>
        </View>

        <View style={styles.footer}>
          <MaterialCommunityIcons
            name="shield-check"
            size={22}
            color="#10B981"
          />

          <Text style={styles.footerText}>Your privacy matters to us.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;
