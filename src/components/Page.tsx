import { BACKGROUND_COLOR } from "@/src/constants/Colors";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Page({children}:{children:ReactNode}) {
    return ( 
        <SafeAreaView style = {styles.page}>{children}</SafeAreaView>
     );
}

const styles = StyleSheet.create({
    page:{
        backgroundColor:BACKGROUND_COLOR,
        flex:1
    }
})

export default Page;