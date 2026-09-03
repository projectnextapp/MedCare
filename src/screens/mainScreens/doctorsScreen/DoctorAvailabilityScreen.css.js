import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  loaderContainer: {
    flex: 1,
    backgroundColor: "#F7F9FC",
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
    padding: 25,
  },

  errorTitle: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 21,
  },

  retryButton: {
    marginTop: 20,
    backgroundColor: "#4880D8",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EAF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EEF5FF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    lineHeight: 19,
    color: "#374151",
  },

  dayCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  dayCardEnabled: {
    borderColor: "#BFD5F5",
  },

  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dayName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  availableText: {
    marginTop: 4,
    fontSize: 12,
    color: "#16A34A",
    fontWeight: "500",
  },

  unavailableText: {
    marginTop: 4,
    fontSize: 12,
    color: "#9CA3AF",
  },

  toggle: {
    width: 48,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#D1D5DB",
    padding: 3,
    justifyContent: "center",
  },

  toggleActive: {
    backgroundColor: "#4880D8",
  },

  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },

  toggleCircleActive: {
    alignSelf: "flex-end",
  },

  timeSection: {
    flexDirection: "row",
    marginTop: 18,
    gap: 10,
  },

  timeColumn: {
    flex: 1,
    position: "relative",
  },

  timeLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 7,
  },

  timeButton: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  timeButtonText: {
    flex: 1,
    marginLeft: 7,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  timeOptionsContainer: {
    position: "absolute",
    top: 76,
    left: 0,
    right: 0,
    zIndex: 100,
    elevation: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },

  timeOptions: {
    maxHeight: 220,
  },

  timeOption: {
    minHeight: 42,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  timeOptionSelected: {
    backgroundColor: "#EEF5FF",
  },

  timeOptionText: {
    fontSize: 14,
    color: "#374151",
  },

  timeOptionTextSelected: {
    color: "#4880D8",
    fontWeight: "700",
  },

  saveButton: {
    marginTop: 10,
    minHeight: 52,
    borderRadius: 11,
    backgroundColor: "#4880D8",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveButtonText: {
    marginLeft: 8,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    marginTop: 12,
    minHeight: 48,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  cancelButtonText: {
    color: "#374151",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default styles;
