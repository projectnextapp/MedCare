import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  loaderContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6B7280",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
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
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111827",
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  patientCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  patientIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  patientInfo: {
    flex: 1,
  },

  patientName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  patientDetail: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3,
  },

  recordCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },

  recordCountText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
  },

  recordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  recordHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  recordHeaderText: {
    flex: 1,
  },

  recordTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  recordDate: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3,
  },

  section: {
    marginBottom: 16,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  sectionValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  secondaryValue: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 3,
  },

  informationBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F1F6FF",
    borderRadius: 10,
    padding: 12,
  },

  informationText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 22,
    color: "#111827",
    fontWeight: "500",
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },

  appointmentReference: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 14,
    marginTop: 4,
  },

  appointmentReferenceText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#6B7280",
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 21,
    fontWeight: "700",
    color: "#374151",
  },

  emptyText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
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
    lineHeight: 21,
    color: "#6B7280",
    textAlign: "center",
  },

  backButton: {
    marginTop: 20,
    backgroundColor: "#4880D8",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;
