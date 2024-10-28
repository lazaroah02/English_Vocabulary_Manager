import { useState, createContext, ReactNode, useEffect } from "react";
import { Word } from "@/types";
import { useSQLiteContext } from "expo-sqlite";
import { CustomResponse } from "@/types";

const ManageDatabaseContext = createContext<{
  words: Word[];
  addWord: ({ en, es }: { en: string; es: string }) => any;
}>({ words: [], addWord: () => {} });

export function ManageDatabaseContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const db = useSQLiteContext();
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    //get all words from database
    getWords().then((words) => {
      setWords(words);
    });
  }, []);

  const getWords = async () => {
    const words = await db.getAllAsync<Word>("SELECT * FROM words");
    return words;
  };

  const addWord = async ({ en, es }: { en: string; es: string }) => {
    try {
      //add the new word to tdatabase
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
  return (
    <ManageDatabaseContext.Provider value={{ words, addWord }}>
      {children}
    </ManageDatabaseContext.Provider>
  );
}
export default ManageDatabaseContext;
