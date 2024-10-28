import { View, Pressable, Text, Modal, StyleSheet } from "react-native";
import { useState } from "react";

function AddWord() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style = {{position:"absolute", bottom:15, right:15}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.showModalButtonText}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.showModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.showModalButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    showModalButton:{
        width:50,
        height:50,
        backgroundColor:"#fff",
        borderRadius:100,
        justifyContent:"center",
        alignSelf:"flex-end",
        marginRight:20,
        marginBottom:20
    },
    showModalButtonText:{
        fontSize:40,
        textAlign:"center",
        top:-3,
        color:"#12739A"
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
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
});

export default AddWord;
