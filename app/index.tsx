import { SafeAreaView } from "react-native-safe-area-context";
import { BACKGROUND_COLOR } from "@/constants/Colors";
import { StyleSheet, View, Pressable } from "react-native";
import { Title } from "@/components/Title";
import { useNavigation } from "expo-router";

export default function HomeMenu() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Title>English Vocabulary</Title>
      </View>
      <Pressable
        style={[styles.label, styles.label1]}
        onPress={() => navigation.navigate("random-word")}
      >
        <Title extraStyles={{ fontSize: 20 }}>Vocabulary</Title>
      </Pressable>
      <Pressable
        style={[styles.label, styles.label2]}
        onPress={() => navigation.navigate("random-word")}
      >
        <Title extraStyles={{ fontSize: 20 }}>Practice</Title>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  titleContainer: {
    position: "relative",
    top: 100,
  },
  label: {
    height: 130,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  label1: {
    backgroundColor: "#0B83B2",
    position: "relative",
    top: 230,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    width: "80%",
  },
  label2: {
    backgroundColor: "#6AD5FF",
    position: "relative",
    top: 330,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    width: "80%",
    alignSelf: "flex-end",
  },
});
