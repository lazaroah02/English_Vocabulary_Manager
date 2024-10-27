import { StyleSheet, Pressable, View, Image, Text } from 'react-native';
import { words } from "../database.json";
import { Word } from '@/types';
import { useState, useEffect, useContext } from 'react';
import { HidableWord } from '@/components/HidableWord';
import TraductionModeContext from '@/contexts/TraductionModeContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import { BACKGROUND_COLOR } from '@/constants/Colors';

export default function RandomWord() {
  const [word, setWord] = useState<Word>()
  const {mode} = useContext(TraductionModeContext)

  function getRandomWord():Word{
    return words[Math.floor(Math.random() * words.length)]
  }

  useEffect(() => {
    setWord(getRandomWord())
  },[])

  return (
    <SafeAreaView style = {styles.page}>
      <View style = {styles.randomWordCard}>
        {mode === "en-es"?
        <View style = {styles.wordContainer}>
          <Text style = {styles.text}>{word?.en}</Text>
          <HidableWord showWord = {false}>{word?.es}</HidableWord>
        </View>:
        <View style = {styles.wordContainer}>
          <Text style = {styles.text}>{word?.es}</Text>
          <HidableWord showWord = {false}>{word?.en}</HidableWord>
        </View>
        }
        <Pressable style = {styles.randomWordButton} onPress={() => setWord(getRandomWord())}>
          <Image source={require("@/assets/images/dices.png")}/>
        </Pressable>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page:{
    backgroundColor:BACKGROUND_COLOR,
    flex:1
  },
  randomWordCard:{
    backgroundColor:"#5EB4D8",
    width:"90%",
    margin:"auto",
    height:300,
    borderRadius:30
  },
  wordContainer:{
    gap:10,
    margin:"auto",
    textAlign:"center",
    alignItems:"center"
  },
  randomWordButton:{
    margin:"auto"
  },
  text:{
    color:"#fff",
    fontSize:20,
    fontWeight:"500",
  }
});
