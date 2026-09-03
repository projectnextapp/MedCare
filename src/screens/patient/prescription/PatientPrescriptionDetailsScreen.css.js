import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#F8FAFC",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6B7280",
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#374151",
    textAlign: "center",
  },

  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 21,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EEF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
  },

  doctorRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  doctorIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  doctorInfo: {
    flex: 1,
  },

  doctorName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  specialization: {
    marginTop: 3,
    fontSize: 14,
    color: "#4880D8",
  },

  hospital: {
    marginTop: 3,
    fontSize: 13,
    color: "#6B7280",
  },

  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  patientDetail: {
    marginTop: 5,
    fontSize: 14,
    color: "#6B7280",
  },

  diagnosisBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F5F8FF",
    borderRadius: 10,
    padding: 12,
  },

  diagnosisText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },

  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
  },

  medicineCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  medicineHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  medicineIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF5FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  medicineName: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  medicineInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  medicineLabel: {
    fontSize: 14,
    color: "#6B7280",
  },

  medicineValue: {
    flex: 1,
    marginLeft: 15,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  instructionBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },

  instructionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 5,
  },

  instructionText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },

  notesBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F5F8FF",
    borderRadius: 10,
    padding: 12,
  },

  notesText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 21,
    color: "#374151",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 10,
  },

  dateText: {
    marginLeft: 7,
    fontSize: 13,
    color: "#6B7280",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 14,
    marginTop: 5,
  },

  footerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    lineHeight: 19,
    color: "#047857",
  },
});

export default styles;
