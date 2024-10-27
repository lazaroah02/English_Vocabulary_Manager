import { Pressable, StyleSheet, Text, View } from "react-native";
import { ReactNode, useState } from "react";

export function HidableWord({showWord = true, children}:{showWord?: boolean, children:ReactNode}) {
    const [show, setShow] = useState(showWord)
    return ( 
        <View style = {styles.hidableWordContainer}>
            <Pressable onPress={() => setShow(!show)}>
                <Text style = {styles.text}>{show?'Hide':'Show'}</Text>
            </Pressable>
            <Text style = {show?{opacity:1}:{opacity:0}}>{children}</Text>
        </View>
     );
}

const styles = StyleSheet.create({
    hidableWordContainer:{
        flexDirection:"row",
        gap: 10
    },
    test:{
        height:"auto",
    }
  });
  

