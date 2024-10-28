import { Word } from "@/types";
import { HidableWord } from "@/components/HidableWord";
import { useContext } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import TraductionModeContext from "@/contexts/TraductionModeContext";
import { useWords } from "@/hooks/useWords";
import Page from "@/components/Page";
import AddWordModal from "@/components/AddWordModal";

export default function HomeScreen() {
  const { mode } = useContext(TraductionModeContext);
  const { words } = useWords();
  return (
    <Page>
      <FlatList
        data={words}
        style={{marginTop:-35}}
        keyExtractor={(word: Word) => word.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item: word, index }) => (
          <View style={styles.wordContainer}>
            <Text numberOfLines={2} ellipsizeMode='tail'style={styles.text}>{`${index + 1}. ${
              mode === "en-es" ? word?.en : word?.es
            }`}</Text>
            <HidableWord>{mode === "en-es" ? word?.es : word?.en}</HidableWord>
          </View>
        )}
      />
      <AddWordModal/>
    </Page>
  );
}

const styles = StyleSheet.create({
  wordContainer: {
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
    alignItems: "center",
    marginBottom:20
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    maxWidth:"40%"
  },
});
