import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    backgroundColor: "#4880D8",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 30,
    paddingBottom: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 15,
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#7DA6EB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 15,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },

  email: {
    marginTop: 5,
    color: "#E8F0FF",
    fontSize: 15,
  },

  roleBadge: {
    marginTop: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
  },

  roleText: {
    color: "#4880D8",
    fontWeight: "700",
    fontSize: 13,
    textTransform: "uppercase",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },

  label: {
    color: "#777",
    fontSize: 14,
    marginTop: 12,
  },

  value: {
    color: "#222",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 3,
  },

  menuContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 15,
    elevation: 3,
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuTitle: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },

  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E53935",
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 16,
    borderRadius: 15,
    elevation: 3,
  },

  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 10,
  },
});
