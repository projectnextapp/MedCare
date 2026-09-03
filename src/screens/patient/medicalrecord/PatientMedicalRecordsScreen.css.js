import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6dbe2",
  },

  content: {
    paddingBottom: 20,
  },

  centerContainer: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#666",
  },

  header: {
    backgroundColor: "#4880D8",
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  headerTextContainer: {
    marginLeft: 15,
    flex: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  subtitle: {
    marginTop: 5,
    color: "#E8F0FF",
    fontSize: 14,
    lineHeight: 20,
  },

  summaryCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  summaryTextContainer: {
    marginLeft: 15,
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },

  summaryLabel: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },

  recordHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  recordIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
  },

  recordHeaderText: {
    marginLeft: 12,
    flex: 1,
  },

  recordTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  dateText: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },

  section: {
    marginTop: 18,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4880D8",
    marginBottom: 7,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  detailText: {
    fontSize: 14,
    color: "#777",
    marginTop: 3,
  },

  description: {
    fontSize: 15,
    color: "#444",
    lineHeight: 23,
  },

  footer: {
    marginHorizontal: 20,
    marginTop: 25,
    padding: 18,
    backgroundColor: "#ECFDF5",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  footerText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: "#047857",
    lineHeight: 20,
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginTop: 15,
    textAlign: "center",
  },

  errorText: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#333",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },

  backButton: {
    marginTop: 25,
    backgroundColor: "#4880D8",
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 10,
  },

  backButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});