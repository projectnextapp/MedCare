import React from "react";

import { View, Text, ScrollView, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import styles from "./AboutScreen.css";

const AboutScreen = ({ navigation }) => {
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

          <View style={styles.logo}>
            <MaterialCommunityIcons
              name="hospital-box-outline"
              size={55}
              color="#fff"
            />
          </View>

          <Text style={styles.title}>MedCare</Text>

          <Text style={styles.subtitle}>Smart Healthcare Management</Text>

          <View style={styles.versionBadge}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>

        {/* ABOUT */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About MedCare</Text>

          <Text style={styles.text}>
            MedCare is a healthcare management application designed to make
            healthcare services easier and more accessible for patients and
            healthcare professionals.
          </Text>

          <Text style={styles.text}>
            Patients can manage appointments, communicate with healthcare
            professionals, view prescriptions, and access their medical
            information from one place.
          </Text>
        </View>

        {/* FEATURES */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What You Can Do</Text>

          <View style={styles.featureRow}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={25}
              color="#4880D8"
            />

            <Text style={styles.featureText}>Book and manage appointments</Text>
          </View>

          <View style={styles.featureRow}>
            <MaterialCommunityIcons name="doctor" size={25} color="#4880D8" />

            <Text style={styles.featureText}>
              Find and connect with doctors
            </Text>
          </View>

          <View style={styles.featureRow}>
            <MaterialCommunityIcons
              name="prescription"
              size={25}
              color="#4880D8"
            />

            <Text style={styles.featureText}>View prescriptions</Text>
          </View>

          <View style={styles.featureRow}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={25}
              color="#4880D8"
            />

            <Text style={styles.featureText}>Access medical records</Text>
          </View>
        </View>

        {/* SECURITY */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Information</Text>

          <Text style={styles.text}>
            MedCare is designed with user privacy and secure access to
            healthcare information in mind.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} MedCare
          </Text>

          <Text style={styles.footerSubtext}>
            Smart healthcare, made easier.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
