import { View, Text, StyleSheet, Animated} from "react-native";
import { useRef, useState } from "react";
import { ToastType, ToastDurationType } from "@/types";

function Toast() {
  const [show, setShow] = useState<boolean>(false);
  const [type, setType] = useState<ToastType>("success");
  const [message, setMessage] = useState<string>("");
  const translateY = useRef(new Animated.Value(50)).current;

  const ToastAnimation = Animated.timing(translateY, {
    toValue: -15,
    duration: 300,
    delay: 0,
    useNativeDriver: true,
  });

  const showToast = ({
    message,
    type = "success",
    duration = 2000,
  }: {
    message: string;
    type?: ToastType;
    duration?: ToastDurationType;
  }) => {
    setType(type);
    setMessage(message);
    setShow(true);
    ToastAnimation.start()
    setTimeout(() => {
        setShow(false)
        ToastAnimation.reset()
    }, duration);
  };

  const toast = () => {
    return (
      <Animated.View
        style={[
          styles.toastContainer,
          { display: `${show ? "flex" : "none"}`, translateY:translateY },
        ]}
      >
        {type === "success" ? successToast() : null}
        {type === "danger" ? dangerToast() : null}
        {type === "warning" ? warningToast() : null}
      </Animated.View>
    );
  };

  const successToast = () => {
    return (
      <View style={[styles.toast, styles.toastSuccess]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    );
  };
  const dangerToast = () => {
    return (
      <View style={[styles.toast, styles.toastDanger]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    );
  };
  const warningToast = () => {
    return (
      <View style={[styles.toast, styles.toastWarning]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    );
  };
  return { showToast, toast };
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom:10,
    left:50,
    alignSelf: "center",
    zIndex:999
  },
  toast: {
    minWidth: 200,
    borderRadius: 5,
    padding: 20,
  },
  toastSuccess: {
    backgroundColor: "#11AD00",
  },
  toastDanger: {
    backgroundColor: "#960000",
  },
  toastWarning: {
    backgroundColor: "#C67A00",
  },
  text: {
    color: "#fff",
    fontWeight:"600"
  },
});

export default Toast;
