import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6dbe2",
    paddingHorizontal: 18,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 10,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4880D8",
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 8,
  },

  value: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
    marginTop: 3,
  },

  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
  },

  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    textTransform: "capitalize",
  },

  confirmButton: {
    height: 55,
    backgroundColor: "#2563EB",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  completeButton: {
    height: 55,
    backgroundColor: "#10B981",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  cancelButton: {
    height: 55,
    backgroundColor: "#EF4444",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  recordButton: {
    height: 55,
    backgroundColor: "#7C3AED",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  prescriptionButton: {
    height: 55,
    backgroundColor: "#F59E0B",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  buttonPrescibe: {
    height: 55,
    backgroundColor: "#239e18",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },

  // ==========================================
  // PRESCRIPTION
  // ==========================================

  prescriptionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#F8FAFF",

    borderWidth: 1,
    borderColor: "#D9E6FA",

    borderRadius: 12,

    padding: 14,
  },

  prescriptionButtonLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  prescriptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: "#EAF2FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  prescriptionButtonTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
  },

  prescriptionButtonSubtitle: {
    marginTop: 4,

    fontSize: 12,
    color: "#6B7280",

    maxWidth: 220,
  },

  noPrescription: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#F9FAFB",

    borderRadius: 12,

    padding: 15,
  },

  noPrescriptionTextContainer: {
    flex: 1,
    marginLeft: 12,
  },

  noPrescriptionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  noPrescriptionText: {
    marginTop: 4,

    fontSize: 13,
    lineHeight: 18,

    color: "#6B7280",
  },

  medicalRecordButton: {
    // marginTop: 12,

    height: 55,
    backgroundColor: "#11c76c",

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    marginBottom: 15,
  },
});
