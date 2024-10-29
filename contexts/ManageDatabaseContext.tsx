import { useState, createContext, ReactNode, useEffect } from "react";
import { Word } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { CustomResponse } from "@/types";

const ManageDatabaseContext = createContext<{
  words: Word[];
  addWord: ({ en, es }: { en: string; es: string }) => any;
  editWord: (word:Word) => any;
  deleteWord: (wordId:number) => any;
  getWords:() => void
}>({ words: [], addWord: () => {}, editWord:() => {}, deleteWord:() => {}, getWords:() => {} });

export function ManageDatabaseContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const db = useSQLiteContext();
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    //get all words from database
    getWords()
  }, []);

  const getWords = async () => {
    const words = await db.getAllAsync<Word>("SELECT * FROM words");
    setWords(words)
  };

  const addWord = async ({ en, es }: { en: string; es: string }) => {
    try {
      //add the new word to database
      const result = await db.runAsync(
        "INSERT INTO words (en, es) VALUES (?, ?)",
        en,
        es
      );
      //update the state with the new word
      let wordsCopy = [...words];
      wordsCopy.push({ id: result.lastInsertRowId, en: en, es: es });
      setWords(wordsCopy);
    } catch {
        throw new Error("Error adding the new word")
    }
  };
  const editWord = async (word:Word) => {
    try {
      //edit word from database
      const result = await db.runAsync(
        "UPDATE words SET en = ?, es = ? WHERE id = ?",
        word.en,
        word.es,
        word.id
      );
      //update the state with the new word
      let wordsCopy = [...words];
      wordsCopy.forEach(item => {
        if(item.id === word.id){
          item.en = word.en
          item.es = word.es
        }
      })
      setWords(wordsCopy);
    } catch {
        throw new Error("Error editing the word")
    }
  };
  const deleteWord = async (wordId:number) => {
    try {
      //delete word from database
      const result = await db.runAsync(
        "DELETE FROM words WHERE id = ?",
        wordId
      );
      getWords()
    } catch {
        throw new Error("Error deleting the word")
    }
  };
  return (
    <ManageDatabaseContext.Provider value={{ words, addWord, editWord, deleteWord, getWords }}>
      {children}
    </ManageDatabaseContext.Provider>
  );
}
export default ManageDatabaseContext;
