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
import ChangeTraductionMode from '@/components/ChangeTraductionMode';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useWords} from '@/hooks/useWords'

export default function HomeScreen() {
  const {mode} = useContext(TraductionModeContext)
  const {words} = useWords()
  return (
    <SafeAreaView style={styles.container}>
      <ChangeTraductionMode/>
      <FlatList
        data={words}
        keyExtractor={(word: Word) => word.id.toString()}
        renderItem={({ item: word, index }) => (
          <View style = {styles.wordContainer}>
            <Text>{index + 1}.</Text>
            {mode === "en-es"?
            <View style = {styles.wordContainer}>
              <HidableWord>{word?.en}</HidableWord>
              <HidableWord showWord = {false}>{word?.es}</HidableWord>
            </View>:
            <View style = {styles.wordContainer}>
              <HidableWord>{word?.es}</HidableWord>
              <HidableWord showWord = {false}>{word?.en}</HidableWord>
            </View>
            }
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"auto",
  },
  wordContainer:{
    flexDirection:'row',
    gap:10
  }
});
