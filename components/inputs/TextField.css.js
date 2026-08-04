import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 6,

    fontSize: 15,

    fontWeight: "600",

    color: "#333",
  },

  inputContainer: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FFF",

    borderWidth: 1,

    borderColor: "#DDD",

    borderRadius: 12,

    paddingHorizontal: 15,
  },

  input: {
    flex: 1,

    height: 55,

    fontSize: 16,

    color: "#222",
  },

  error: {
    color: "#E53935",

    marginTop: 5,

    fontSize: 13,
  },
});
