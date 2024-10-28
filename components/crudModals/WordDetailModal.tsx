import {
  View,
  Pressable,
  Text,
  Modal,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import ManageDatabaseContext from "@/contexts/ManageDatabaseContext";
import { CustomResponse, Word } from "@/types";
import { ToastType, ToastDurationType } from "@/types";
import { commonStyles } from "./commonStyles";

function WordDetailModal({
  word,
  showModal,
  hideDetailModal,
  showToast,
}: {
  word: Word;
  showModal: boolean;
  hideDetailModal: () => void;
  showToast: ({
    message,
    type,
    duration,
  }: {
    message: string;
    type?: ToastType;
    duration?: ToastDurationType;
  }) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { editWord, deleteWord } = useContext(ManageDatabaseContext);
  const [wordData, setWordData] = useState<Word>(word);

  useEffect(() => {
    if (showModal) setModalVisible(true);
  }, [showModal]);

  useEffect(() => {
    setWordData(word);
  }, [word]);

  const hideModal = () => {
    setModalVisible(false);
    hideDetailModal();
    setWordData(word);
  };

  function handleUpdateWordData(key: string, newText: string) {
    setWordData((prev) => ({
      ...prev,
      [`${key}`]: newText,
    }));
  }
  function handleEditWord() {
    if (wordData.en === "" || wordData.es === "") {
      return showToast({ message: "Empty fields not allowed", type: "danger" });
    }
    editWord(wordData)
      .then((res: CustomResponse) => {
        hideModal();
        showToast({ message: "Word edited successfuly", type: "success" });
      })
      .catch((err: Error) => {
        showToast({ message: err.message, type: "danger" });
      });
  }

  function handleDeleteWord() {
    Alert.alert(
      "Confirmation",
      "Are you sure about this operation?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: () => {
            deleteWord(wordData.id)
              .then(() => {
                hideModal();
                showToast({
                  message: "Word deleted successfuly",
                  type: "success",
                });
              })
              .catch((err: Error) => {
                showToast({ message: err.message, type: "danger" });
              });
          },
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <View style={{ position: "absolute", bottom: 15, right: 15 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          hideModal();
        }}
      >
        <View style={commonStyles.centeredView}>
          <View style={commonStyles.modalView}>
            <Pressable
              style={commonStyles.closeModalButton}
              onPress={() => {
                hideModal();
              }}
            >
              <Text style={commonStyles.closeModalButtonText}>X</Text>
            </Pressable>
            <Text style={commonStyles.modalTitle}>Word Detail</Text>
            <View style={commonStyles.addWordForm}>
              <TextInput
                id="en"
                placeholder="English Word"
                style={commonStyles.input}
                value={wordData.en}
                onChangeText={(text) => handleUpdateWordData("en", text)}
              />
              <TextInput
                id="es"
                placeholder="Spanish Word"
                style={commonStyles.input}
                value={wordData.es}
                onChangeText={(text) => handleUpdateWordData("es", text)}
              />
              <View style={commonStyles.buttonsContainer}>
                <Pressable
                  style={commonStyles.deleteButton}
                  onPress={handleDeleteWord}
                >
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={require("@/assets/images/trash-regular-48.png")}
                  />
                </Pressable>
                <Pressable
                  style={commonStyles.sendDataButton}
                  onPress={handleEditWord}
                >
                  <Text style={commonStyles.textStyle}>Update</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default WordDetailModal;
