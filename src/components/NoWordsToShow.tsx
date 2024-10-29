import { StyleSheet, Text } from "react-native";

function NoWordsToShow() {
    return ( 
        <Text style = {styles.noWordsMessage}>No Words to show</Text>
     );
}

export default NoWordsToShow;

const styles = StyleSheet.create({
    noWordsMessage:{
        backgroundColor:"#12739A",
        color:"#fff",
        padding:10,
        textAlign:"center",
        width:"90%",
        fontWeight:"600",
        margin:"auto"
      }
})