import { StyleSheet, Pressable, View, Image, Text } from "react-native";
import { Word } from "@/types";
import { useState, useEffect, useContext } from "react";
import { HidableWord } from "@/components/HidableWord";
import TraductionModeContext from "@/contexts/TraductionModeContext";
import { Title } from "@/components/Title";
import Page from "@/components/Page";
import ManageDatabaseContext from "@/contexts/ManageDatabaseContext";
import Toast from "@/components/Toast";
import WordDetailModal from "@/components/crudModals/WordDetailModal";
import NoWordsToShow from "@/components/NoWordsToShow";

export default function RandomWord() {
  const [word, setWord] = useState<Word>({ id: 0, en: "", es: "" });
  const { mode } = useContext(TraductionModeContext);
  const { words } = useContext(ManageDatabaseContext);
  const { toast, showToast } = Toast();
  const [showDetailModal, setShowDetailModal] = useState(false);

  function getRandomWord(): void {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  }

  useEffect(() => {
    if (words.length > 0) {
      getRandomWord();
    }
  }, [words]);

  return (
    <Page>
      {toast({ left: 80 })}
      <WordDetailModal
        hideDetailModal={() => setShowDetailModal(false)}
        word={word}
        showModal={showDetailModal}
        showToast={showToast}
        afterDeleteWord={() => getRandomWord()}
      />
      <View style={styles.titleContainer}>
        <Title>Random Word</Title>
      </View>
      {words.length > 0 ? (
        <View style={styles.randomWordCard}>
          <View style={styles.wordContainer}>
            <Text
              onPress={() => {
                setShowDetailModal(true);
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.text}
            >
              {mode === "en-es" ? word?.en : word?.es}
            </Text>
            <HidableWord customStyles={{ maxWidth: "90%" }}>
              {mode === "en-es" ? word?.es : word?.en}
            </HidableWord>
          </View>
          <Pressable
            style={styles.randomWordButton}
            onPress={() => getRandomWord()}
          >
            <Image source={require("@/assets/images/dices.png")} />
          </Pressable>
        </View>
      ) : (
        <NoWordsToShow/>
      )}
    </Page>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    top: 60,
  },
  randomWordCard: {
    backgroundColor: "#5EB4D8",
    width: "90%",
    margin: "auto",
    height: 300,
    borderRadius: 30,
  },
  wordContainer: {
    gap: 30,
    margin: "auto",
    textAlign: "center",
    alignItems: "center",
    top: 15,
  },
  randomWordButton: {
    margin: "auto",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    maxWidth: "90%",
  },
});
