//


import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F6F8FB",
        paddingHorizontal: 16,
    },

    header: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1A1A1A",
        marginTop: 15,
        marginBottom: 20,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        paddingHorizontal: 15,
        marginBottom: 18,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    searchInput: {
        flex: 1,
        height: 50,
        marginLeft: 10,
        fontSize: 16,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",

        elevation: 3,

        shadowColor: "#000",

        shadowOpacity: 0.08,

        shadowRadius: 6,

        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },

    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EAF2FF",
    },

    info: {
        flex: 1,
        marginLeft: 15,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    specialization: {
        marginTop: 4,
        fontSize: 15,
        color: "#4880D8",
        fontWeight: "600",
    },

    hospital: {
        marginTop: 5,
        color: "#666",
        fontSize: 14,
    },

    experience: {
        marginTop: 5,
        color: "#444",
        fontSize: 14,
    },

    fee: {
        marginTop: 8,
        color: "#16A34A",
        fontWeight: "700",
        fontSize: 16,
    },

    availabilityContainer: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
    },

    availableDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#22C55E",
        marginRight: 8,
    },

    availabilityText: {
        color: "#22C55E",
        fontWeight: "600",
    },

    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    ratingText: {
        marginLeft: 5,
        color: "#444",
        fontWeight: "600",
    },

    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    },

    error: {
        color: "red",
        textAlign: "center",
        marginBottom: 12,
    },

    emptyContainer: {
        marginTop: 90,
        justifyContent: "center",
        alignItems: "center",
    },

    emptyText: {
        marginTop: 15,
        fontSize: 18,
        color: "#999",
    },

    fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4880D8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
},

});