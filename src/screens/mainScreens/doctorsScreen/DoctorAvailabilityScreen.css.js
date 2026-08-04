import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    paddingHorizontal: 18,
    paddingTop: 15,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 20,
  },

  button: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,

    backgroundColor: "#4880D8",

    paddingVertical: 16,

    borderRadius: 15,

    alignItems: "center",

    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 17,
  },
});
