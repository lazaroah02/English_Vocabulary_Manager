import { Pressable, StyleSheet, Text, View } from "react-native";
import { ReactNode, useState, useEffect } from "react";

export function HidableWord({children, customStyles}:{children:ReactNode, customStyles?:{}}) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(false)
    },[children])
    return ( 
        <Pressable style = {[styles.hidableWordContainer, customStyles]} onPress={() => setShow(!show)}>
            <Text numberOfLines={2} ellipsizeMode='tail' style = {styles.text}>{show?children:'Show traduction'}</Text>
        </Pressable>
     );
}

const styles = StyleSheet.create({
    hidableWordContainer:{
        backgroundColor:"#12739A",
        borderRadius:10,
        padding:10,
        minWidth:138,
        alignItems:"center",
        maxWidth:"50%"
    },
    text:{
        color:"#fff",
        fontSize:20,
        fontWeight:"500",
    }
  });
  

