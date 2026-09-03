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

  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 12,
  },

  subtitle: {
    color: "#E8F0FF",
    fontSize: 14,
    marginTop: 4,
  },

  versionBadge: {
    marginTop: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },

  versionText: {
    color: "#4880D8",
    fontSize: 12,
    fontWeight: "700",
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
    color: "#555",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  featureText: {
    marginLeft: 14,
    fontSize: 15,
    color: "#333",
    flex: 1,
  },

  footer: {
    alignItems: "center",
    marginTop: 25,
  },

  footerText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },

  footerSubtext: {
    fontSize: 13,
    color: "#999",
    marginTop: 5,
  },
});
