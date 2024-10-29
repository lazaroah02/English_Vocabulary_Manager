import { Word } from "@/src/types";
import { HidableWord } from "@/src/components/HidableWord";
import { useContext, useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import TraductionModeContext from "@/src/contexts/TraductionModeContext";
import Page from "@/src/components/Page";
import AddWordModal from "@/src/components/crudModals/AddWordModal";
import ManageDatabaseContext from "@/src/contexts/ManageDatabaseContext";
import Toast from "@/src/components/Toast";
import WordDetailModal from "@/src/components/crudModals/WordDetailModal";
import NoWordsToShow from "@/src/components/NoWordsToShow";

export default function HomeScreen() {
  const { mode } = useContext(TraductionModeContext);
  const { words } = useContext(ManageDatabaseContext);
  const { toast, showToast } = Toast();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailWord, setDetailWord] = useState<Word>({ id: 0, en: "", es: "" });

  return (
    <Page>
      {toast()}
      <WordDetailModal
        word={detailWord}
        showToast={showToast}
        showModal={showDetailModal}
        hideDetailModal={() => setShowDetailModal(false)}
      />
      {words.length > 0 ? (
        <FlatList
          data={words}
          style={{ marginTop: -30 }}
          keyExtractor={(word: Word) => word.id.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item: word, index }) => (
            <View style={styles.wordContainer}>
              <Text
                onPress={() => {
                  setDetailWord(word);
                  setShowDetailModal(true);
                }}
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.text}
              >{`${index + 1}. ${
                mode === "en-es" ? word?.en : word?.es
              }`}</Text>
              <HidableWord>
                {mode === "en-es" ? word?.es : word?.en}
              </HidableWord>
            </View>
          )}
        />
      ) : (
        <NoWordsToShow />
      )}
      <AddWordModal showToast={showToast} />
    </Page>
  );
}

const styles = StyleSheet.create({
  wordContainer: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    maxWidth: "40%",
  },
});
