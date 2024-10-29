import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Pressable,
  Text,
  Modal,
  TextInput,
  Image,
} from "react-native";
import ManageDatabaseContext from "@/contexts/ManageDatabaseContext";
import { CustomResponse, Word } from "@/types";
import { ToastType, ToastDurationType } from "@/types";
import { commonStyles } from "./commonStyles";
import { confirm } from "@/utils/confirm";

function WordDetailModal({
  word,
  showModal,
  hideDetailModal,
  afterDeleteWord = () => {},
  showToast,
}: {
  word: Word;
  showModal: boolean;
  hideDetailModal: () => void;
  afterDeleteWord?: () => void;
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
    setModalVisible(showModal);
  }, [showModal]);

  useEffect(() => {
    setWordData(word);
  }, [word]);

  const hideModal = useCallback(() => {
    setModalVisible(false);
    hideDetailModal();
    setWordData(word);
  }, [hideDetailModal, word]);

  const handleUpdateWordData = useCallback((key: string, newText: string) => {
    setWordData((prev) => ({
      ...prev,
      [key]: newText,
    }));
  }, []);

  const handleEditWord = useCallback(async () => {
    if (wordData.en.trim() === "" || wordData.es.trim() === "") {
      return showToast({ message: "Empty fields not allowed", type: "danger" });
    }
    try {
      await editWord(wordData);
      hideModal();
      showToast({ message: "Word edited successfully", type: "success" });
    } catch (err) {
      showToast({ message: (err as Error).message, type: "danger" });
    }
  }, [wordData, editWord, hideModal, showToast]);

  const handleDeleteWord = useCallback(() => {
    confirm({
      onConfirm: async () => {
        try {
          await deleteWord(wordData.id);
          hideModal();
          showToast({
            message: "Word deleted successfully",
            type: "success",
          });
          afterDeleteWord();
        } catch (err) {
          showToast({ message: (err as Error).message, type: "danger" });
        }
      },
    });
  }, [wordData.id, deleteWord, hideModal, showToast, afterDeleteWord]);

  return (
    <View style={{ position: "absolute", bottom: 15, right: 15 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <View style={commonStyles.centeredView}>
          <View style={commonStyles.modalView}>
            <Pressable
              style={commonStyles.closeModalButton}
              onPress={hideModal}
            >
              <Text style={commonStyles.closeModalButtonText}>X</Text>
            </Pressable>
            <Text style={commonStyles.modalTitle}>Word Detail</Text>
            <View style={commonStyles.addWordForm}>
              <TextInput
                placeholder="English Word"
                style={commonStyles.input}
                value={wordData.en}
                onChangeText={(text) => handleUpdateWordData("en", text)}
              />
              <TextInput
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

export default React.memo(WordDetailModal);