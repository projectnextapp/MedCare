import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  content: {
    paddingBottom: 30,
  },

  header: {
    backgroundColor: "#4880D8",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerIcon: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
  },

  headerSubtitle: {
    color: "#E8F0FF",
    fontSize: 14,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 18,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 15,
  },

  question: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  questionContent: {
    flex: 1,
    marginLeft: 14,
  },

  questionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },

  questionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 21,
  },

  contactText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 23,
    marginBottom: 15,
  },

  contactButton: {
    backgroundColor: "#4880D8",
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  footerText: {
    color: "#4880D8",
    fontWeight: "600",
    marginLeft: 8,
  },
});
