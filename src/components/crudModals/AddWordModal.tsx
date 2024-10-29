import {
  View,
  Pressable,
  Text,
  Modal,
  TextInput,
} from "react-native";
import { useState, useContext } from "react";
import ManageDatabaseContext from "@/src/contexts/ManageDatabaseContext";
import { CustomResponse } from "@/types";
import { ToastType, ToastDurationType } from "@/types";
import { commonStyles } from "./commonStyles";

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
    .then(() => {
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
        <View style={commonStyles.centeredView}>
          <View style={commonStyles.modalView}>
            <Pressable
              style={commonStyles.closeModalButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setNewWordData({ en: "", es: "" });
              }}
            >
              <Text style={commonStyles.closeModalButtonText}>X</Text>
            </Pressable>
            <Text style={commonStyles.modalTitle}>Add New Word</Text>
            <View style={commonStyles.addWordForm}>
              <TextInput
                id="en"
                placeholder="English Word"
                style={commonStyles.input}
                value={newWordData.en}
                onChangeText={(text) => handleUpdateNewWordData("en", text)}
              />
              <TextInput
                id="es"
                placeholder="Spanish Word"
                style={commonStyles.input}
                value={newWordData.es}
                onChangeText={(text) => handleUpdateNewWordData("es", text)}
              />
              <Pressable style = {commonStyles.sendDataButton} onPress={handleAddWord}>
                <Text style = {commonStyles.textStyle}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={commonStyles.showModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={commonStyles.showModalButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

export default AddWord;
