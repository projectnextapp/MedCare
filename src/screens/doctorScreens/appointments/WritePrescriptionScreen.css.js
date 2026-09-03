import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6dbe2",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    color: "#1F2937",
  },

  headerSpacer: {
    width: 42,
  },

  // ==========================================
  // INFO CARD
  // ==========================================

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },

  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },

  infoLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 13,
    color: "#1F2937",
    fontWeight: "600",
  },

  // ==========================================
  // CARD
  // ==========================================

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },

  // ==========================================
  // INPUT
  // ==========================================

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },

  textArea: {
    minHeight: 110,
  },

  textAreaSmall: {
    minHeight: 80,
  },

  // ==========================================
  // ADD BUTTON
  // ==========================================

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4880D8",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },

  // ==========================================
  // MEDICINE
  // ==========================================

  medicineCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    backgroundColor: "#F9FAFB",
  },

  medicineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  medicineTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  // ==========================================
  // ERROR
  // ==========================================

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },

  errorText: {
    flex: 1,
    marginLeft: 8,
    color: "#B91C1C",
    fontSize: 14,
  },

  // ==========================================
  // SUBMIT
  // ==========================================

  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4880D8",
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 4,
  },

  disabledButton: {
    opacity: 0.6,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});

export default styles;
