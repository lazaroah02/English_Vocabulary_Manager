import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

function Loader({ message = "Loading" }: { message?: string }) {
  const translateY1 = useRef(new Animated.Value(5)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const translateY3 = useRef(new Animated.Value(5)).current;

  const DotAnimation = ({
    delay = 0,
    target,
  }: {
    delay?: number;
    target: Animated.Value;
  }) => {
    return Animated.loop(
      Animated.timing(target, {
        toValue: -10,
        duration: 1000,
        delay: delay,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    );
  };

  useEffect(() => {
    DotAnimation({ delay: 0, target: translateY1 }).start();
    DotAnimation({ delay: 200, target: translateY2 }).start();
    DotAnimation({ delay: 400, target: translateY3 }).start();
  }, []);

  return (
    <View style={styles.loaderContainer}>
      <View style={styles.loader}>
        <Text style={styles.loaderText}>{message}</Text>
        <Animated.Text
          style={[
            styles.loaderText,
            { transform: [{ translateY: translateY1 }] },
          ]}
        >
          {" "}.{" "}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.loaderText,
            { transform: [{ translateY: translateY2 }] },
          ]}
        >
          .{" "}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.loaderText,
            { transform: [{ translateY: translateY3 }] },
          ]}
        >
          .
        </Animated.Text>
      </View>
    </View>
  );
}

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 999,
  },
  loader: {
    margin: "auto",
    alignItems: "center",
    flexDirection: "row",
  },
  loaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
});
