import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
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
    marginBottom: 20,
  },

  headerIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 3,
    fontSize: 14,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,

    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },

  infoRow: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 5,
  },

  value: {
    fontSize: 15,
    color: "#1F2937",
  },

  status: {
    alignSelf: "flex-start",
    backgroundColor: "#EAF7EF",
    color: "#15803D",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: "600",
    overflow: "hidden",
  },

  personRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  personIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  personName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  personDetail: {
    marginTop: 3,
    fontSize: 13,
    color: "#6B7280",
  },

  textSection: {
    marginBottom: 15,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#374151",
  },

  medicationCard: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },

  medicationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  pillIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  medicationName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  medicationRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  medicationLabel: {
    width: 100,
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },

  medicationValue: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
  },

  noMedication: {
    alignItems: "center",
    paddingVertical: 20,
  },

  emptyMedication: {
    marginTop: 10,
    fontSize: 14,
    color: "#9CA3AF",
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
  },

  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 21,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 21,
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
