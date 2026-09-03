import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6dbe2",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  headerIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTextContainer: {
    marginLeft: 13,
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3,
  },

  // ==========================================
  // COUNT
  // ==========================================

  countCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
  },

  countContent: {
    marginLeft: 12,
  },

  countNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },

  countLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  // ==========================================
  // PRESCRIPTION CARD
  // ==========================================

  prescriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  prescriptionIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  cardHeaderContent: {
    flex: 1,
    marginLeft: 13,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  doctorText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  // ==========================================
  // INFORMATION
  // ==========================================

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#374151",
  },

  // ==========================================
  // BUTTON
  // ==========================================

  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4880D8",
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 8,
  },

  viewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginRight: 5,
  },

  // ==========================================
  // CENTER STATES
  // ==========================================

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 14,
  },

  errorTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 15,
    textAlign: "center",
  },

  errorText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },

  // ==========================================
  // BUTTONS
  // ==========================================

  retryButton: {
    backgroundColor: "#4880D8",
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginTop: 20,
  },

  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  backButton: {
    backgroundColor: "#4880D8",
    borderRadius: 12,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginTop: 20,
  },

  backButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});