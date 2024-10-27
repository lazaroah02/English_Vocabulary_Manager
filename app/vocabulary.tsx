import { Word } from "@/types";
import { HidableWord } from "@/components/HidableWord";
import { useContext } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import TraductionModeContext from "@/contexts/TraductionModeContext";
import { useWords } from "@/hooks/useWords";
import Page from "@/components/Page";

export default function HomeScreen() {
  const { mode } = useContext(TraductionModeContext);
  const { words } = useWords();
  return (
    <Page>
      <FlatList
        data={words}
        keyExtractor={(word: Word) => word.id.toString()}
        renderItem={({ item: word, index }) => (
          <View style={styles.wordContainer}>
            <Text style={styles.text}>{`${index + 1}. ${
              mode === "en-es" ? word?.en : word?.es
            }`}</Text>
            <HidableWord>{mode === "en-es" ? word?.es : word?.en}</HidableWord>
          </View>
        )}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  wordContainer: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
});
