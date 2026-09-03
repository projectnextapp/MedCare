import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6dbe2",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 28,
  },

  profilePlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#4880D8",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeContainer: {
    marginLeft: 12,
  },

  welcomeText: {
    fontSize: 13,
    color: "#6B7280",
  },

  patientName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 2,
  },

  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  notificationBadge: {
    position: "absolute",
    right: 5,
    top: 4,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  notificationBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
  },

  // ==========================================
  // SECTION
  // ==========================================

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },

  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4880D8",
  },

  // ==========================================
  // APPOINTMENT
  // ==========================================

  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
    elevation: 3,
  },

  appointmentTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  doctorIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 14,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  doctorSpecialization: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  appointmentDivider: {
    height: 1,
    backgroundColor: "#EEF0F4",
    marginVertical: 16,
  },

  appointmentEmptyIcon: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },

  appointmentEmptyText: {
    color: "#6B7280",
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },

  bookAppointmentButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c8608",
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 16,
  },

  bookAppointmentText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  // ==========================================
  // SUMMARY
  // ==========================================

  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  summaryCard: {
    width: "31.5%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
  },

  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F0F5FF",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 8,
  },

  summaryLabel: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 3,
  },

  // ==========================================
  // QUICK ACTIONS
  // ==========================================

  quickActionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  quickAction: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  quickActionText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginTop: 9,
  },

  // ==========================================
  // HEALTH TIP
  // ==========================================

  healthTipCard: {
    flexDirection: "row",
    backgroundColor: "#138830",
    borderRadius: 18,
    padding: 18,
    marginBottom: 22,
  },

  healthTipIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#138830",
    justifyContent: "center",
    alignItems: "center",
  },

  healthTipContent: {
    flex: 1,
    marginLeft: 14,
  },

  healthTipTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  healthTipText: {
    color: "#E8F0FF",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },

  // ==========================================
  // EMERGENCY
  // ==========================================

  emergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DC2626",
    borderRadius: 17,
    padding: 17,
    elevation: 3,
  },

  emergencyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },

  emergencyContent: {
    flex: 1,
    marginLeft: 13,
  },

  emergencyTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  emergencyText: {
    color: "#FEE2E2",
    fontSize: 12,
    marginTop: 4,
  },
});
