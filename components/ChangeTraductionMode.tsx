import { Pressable, Image, StyleSheet } from "react-native";
import { useContext } from "react";
import TraductionModeContext from "@/contexts/TraductionModeContext";

function ChangeTraductionMode() {
  const { mode, setMode } = useContext(TraductionModeContext);
  return (
    <Pressable onPress={() => setMode(mode === "en-es" ? "es-en" : "en-es")}>
      {mode === "en-es" ? (
        <Image style = {styles.image} source={require("@/assets/images/en-to-es.png")} resizeMode="contain"/>
      ) : (
        <Image style = {styles.image} source={require("@/assets/images/es-to-en.png")} resizeMode="contain"/>
      )}
    </Pressable>
  );
}

export default ChangeTraductionMode;

const styles = StyleSheet.create({
  image:{
    width:90,
    height:50
  }
})