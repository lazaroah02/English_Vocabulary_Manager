import { Alert } from "react-native";

export const confirm = ({onConfirm, onCancel = () => {}}:{onConfirm:() => void, onCancel?:() => void}) => {
    Alert.alert(
        "Confirmation",
        "Are you sure about this operation?",
        [
          {
            text: "Cancel",
            onPress: onCancel,
            style: "cancel",
          },
          {
            text: "Accept",
            onPress: onConfirm
          },
        ],
        { cancelable: false }
      );
}