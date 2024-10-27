import { SQLiteDatabase } from "expo-sqlite";
import { Word } from "@/types";

export async function fillDatabase(db: SQLiteDatabase, words: Word[]){
    const addWord = async(es: string, en: string) => {
        const res = await db.runAsync('INSERT into words (en, es) VALUES(?, ?)', en, es)
    }

    words.forEach((word:Word) => {
        db.runAsync('INSERT into words (en, es) VALUES(?, ?)', word.en, word.es)
    })
}