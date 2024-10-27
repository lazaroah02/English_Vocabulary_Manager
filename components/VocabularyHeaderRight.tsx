import { View, StyleSheet } from "react-native";
import ChangeTraductionMode from "./ChangeTraductionMode";
import VocabularyOptionsDropdown from "./VocabularyOptionsDropdown";

function VocabularyHeaderRight() {
    return ( 
        <View style = {styles.container}>
            <ChangeTraductionMode/>
            <VocabularyOptionsDropdown/>
        </View>
     );
}

export default VocabularyHeaderRight;

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        gap:20,
        alignItems:"center"
    },
})