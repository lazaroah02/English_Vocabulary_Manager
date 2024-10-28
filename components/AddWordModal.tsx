import {
  View,
  Pressable,
  Text,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState, useContext } from "react";
import ManageDatabaseContext from "@/contexts/ManageDatabaseContext";
import { CustomResponse } from "@/types";
import { ToastType, ToastDurationType } from "@/types";

function AddWord({showToast}:{showToast:({message, type, duration}:{message:string, type?:ToastType, duration?:ToastDurationType}) => void}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { addWord } = useContext(ManageDatabaseContext);
  const [newWordData, setNewWordData] = useState<{ en: string; es: string }>({
    en: "",
    es: "",
  });
  function handleUpdateNewWordData(key:string, newText: string) {
    setNewWordData((prev) => ({
      ...prev,
      [`${key}`]: newText,
    }));
  }
  function handleAddWord(){
    if(newWordData.en === "" || newWordData.es === ""){
      return showToast({message:"Empty fields not allowed", type:"danger"})
    }
    addWord(newWordData)
    .then((res:CustomResponse) => {
        setModalVisible(false)
        setNewWordData({en:"", es:""})
        showToast({message:"Word added successfuly", type:"success"})
    })
    .catch((err:Error) => {
        showToast({message:err.message, type:"danger"})
    })
  }
  return (
    <View style={{ position: "absolute", bottom: 15, right: 15 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setNewWordData({ en: "", es: "" });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeModalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setNewWordData({ en: "", es: "" });
              }}
            >
              <Text style={styles.closeModalButtonText}>X</Text>
            </Pressable>
            <Text style={styles.modalTitle}>Add New Word</Text>
            <View style={styles.addWordForm}>
              <TextInput
                id="en"
                placeholder="English Word"
                style={styles.input}
                value={newWordData.en}
                onChangeText={(text) => handleUpdateNewWordData("en", text)}
              />
              <TextInput
                id="es"
                placeholder="Spanish Word"
                style={styles.input}
                value={newWordData.es}
                onChangeText={(text) => handleUpdateNewWordData("es", text)}
              />
              <Pressable style = {styles.sendDataButton} onPress={handleAddWord}>
                <Text style = {styles.textStyle}>Send</Text>
              </Pressable>
            </View>
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
    backgroundColor:"#00000015",
    borderRadius:5,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  addWordForm: {
    width: "100%",
    marginTop:40
  },
  input: {
    width: "100%",
    height: 40,
    marginTop: 12,
    padding: 10,
    backgroundColor:"#00000015",
    borderRadius:5,
  },
  sendDataButton:{
    backgroundColor:"#12739A",
    borderRadius:10,
    padding:10,
    alignItems:"center",
    marginTop:20
  }
});

export default AddWord;
