import { useEffect, useState } from "react";
import { Word } from "@/types";
import { useSQLiteContext } from "expo-sqlite";

export function useWords() {
    const db = useSQLiteContext();
    const [words, setWords] = useState<Word[]>([{id:1, en:"Hello", es:"Hola"}])
    
    useEffect(() => {
        //get all words from database
        const getWords = async() => {
            const words = await db.getAllAsync<Word>('SELECT * FROM words')
            //setWords(words)
        }
        getWords()
    })
    return ( {words} );
}

