import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { TEXT_COLOR } from "@/src/constants/Colors";

export function Title({children, extraStyles}:{children:ReactNode, extraStyles?:{}}) {
    return ( 
        <Text style = {[styles.tite,extraStyles]}>{children}</Text> 
    );
}

const styles = StyleSheet.create({
    tite:{
        color:TEXT_COLOR,
        fontSize: 28,
        lineHeight:29.05,
        textAlign:"center",
        fontStyle:"italic",
        fontWeight:"700",
    }
})