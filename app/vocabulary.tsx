import { Word } from "@/types";
import { HidableWord } from "@/components/HidableWord";
import { useContext} from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
} from "react-native";
import TraductionModeContext from '@/contexts/TraductionModeContext'
import {useWords} from '@/hooks/useWords'
import Page from "@/components/Page";

export default function HomeScreen() {
  const {mode} = useContext(TraductionModeContext)
  const {words} = useWords()
  return (
    <Page>
      <FlatList
        data={words}
        keyExtractor={(word: Word) => word.id.toString()}
        renderItem={({ item: word, index }) => (
          <View style = {styles.wordContainer}>
            <Text>{index + 1}.</Text>
            <View style = {styles.wordContainer}>
              <Text>{mode === "en-es"? word?.en : word?.es}</Text>
              <HidableWord >{mode === "es-en"? word?.es: word?.en}</HidableWord>
            </View>
          </View>
        )}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  wordContainer:{
    flexDirection:'row',
    gap:10
  }
});
