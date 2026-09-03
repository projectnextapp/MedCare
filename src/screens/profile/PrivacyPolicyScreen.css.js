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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    position: "relative",
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
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 12,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
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
    marginBottom: 12,
  },

  text: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
    marginBottom: 10,
  },

  bullet: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
    marginBottom: 6,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  footerText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#10B981",
    fontWeight: "600",
  },
});
