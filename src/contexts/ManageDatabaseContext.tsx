import { useState, createContext, ReactNode, useEffect } from "react";
import { Word } from "@/src/types";
import { useSQLiteContext } from "expo-sqlite";

const ManageDatabaseContext = createContext<{
  words: Word[];
  addWord: ({ en, es }: { en: string; es: string }) => any;
  editWord: (word: Word) => any;
  deleteWord: (wordId: number) => any;
  getWords: () => void;
  loading: boolean;
  importWords: (words: Word[]) => any;
}>({
  words: [],
  addWord: () => {},
  editWord: () => {},
  deleteWord: () => {},
  getWords: () => {},
  loading: false,
  importWords: () => {},
});

export function ManageDatabaseContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const db = useSQLiteContext();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //get all words from database
    getWords();
  }, []);

  const getWords = async () => {
    setLoading(true)
    const words = await db.getAllAsync<Word>("SELECT * FROM words");
    setWords(words);
    setLoading(false)
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
      throw new Error("Error adding the new word");
    }
  };
  const editWord = async (word: Word) => {
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
      wordsCopy.forEach((item) => {
        if (item.id === word.id) {
          item.en = word.en;
          item.es = word.es;
        }
      });
      setWords(wordsCopy);
    } catch {
      throw new Error("Error editing the word");
    }
  };
  const deleteWord = async (wordId: number) => {
    try {
      //delete word from database
      const result = await db.runAsync(
        "DELETE FROM words WHERE id = ?",
        wordId
      );
      getWords();
    } catch {
      throw new Error("Error deleting the word");
    }
  };
  const importWords = async (words: Word[]) => {
    console.log(words);
  };
  return (
    <ManageDatabaseContext.Provider
      value={{
        words,
        addWord,
        editWord,
        deleteWord,
        getWords,
        loading,
        importWords,
      }}
    >
      {children}
    </ManageDatabaseContext.Provider>
  );
}
export default ManageDatabaseContext;
