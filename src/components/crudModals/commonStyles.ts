import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      width: "90%",
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
    closeModalButton: {
      position: "absolute",
      right: 10,
      top: 10,
      backgroundColor: "#00000015",
      borderRadius: 5,
      width: 30,
      height: 30,
      justifyContent: "center",
    },
    closeModalButtonText: {
      textAlign: "center",
    },
    modalTitle: {
      position: "absolute",
      top: 15,
      left: 10,
      fontSize: 18,
      fontWeight: "600",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    showModalButton: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 100,
        justifyContent: "center",
        alignSelf: "flex-end",
        marginRight: 20,
        marginBottom: 20,
      },
      showModalButtonText: {
        fontSize: 40,
        textAlign: "center",
        top: -3,
        color: "#12739A",
      },
    addWordForm: {
      width: "100%",
      marginTop: 40,
    },
    input: {
      width: "100%",
      height: 50,
      marginTop: 12,
      padding: 10,
      backgroundColor: "#00000015",
      borderRadius: 5,
    },
    buttonsContainer:{
      flexDirection:"row",
      gap:20
    },
    sendDataButton: {
      backgroundColor: "#12739A",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      justifyContent:"center",
      marginTop: 20,
      flexGrow:1,
      height:50
    },
    deleteButton:{
      backgroundColor: "#960000",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      marginTop: 20,
    }
  });
    