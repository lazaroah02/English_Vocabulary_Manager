import { Pressable, StyleSheet, Text, View } from "react-native";
import { ReactNode, useState, useEffect } from "react";

export function HidableWord({children}:{children:ReactNode}) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(false)
    },[children])
    return ( 
        <Pressable style = {styles.hidableWordContainer} onPress={() => setShow(!show)}>
            <Text style = {styles.text}>{show?children:'Tap to see traduction'}</Text>
        </Pressable>
     );
}

const styles = StyleSheet.create({
    hidableWordContainer:{
        backgroundColor:"#12739A",
        borderRadius:10,
        padding:10,
        minWidth:138,
        alignItems:"center"
    },
    text:{
        color:"#fff",
        fontSize:20,
        fontWeight:"500",
    }
  });
  

