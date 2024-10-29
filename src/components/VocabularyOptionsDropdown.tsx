import { View, StyleSheet, Text, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const dropdownOptions = [
  { text: "Import Words" }
];

function VocabularyOptionsDropdown() {
  return (
    <SelectDropdown
      data={dropdownOptions}
      onSelect={(selectedItem, index) => {
        alert(selectedItem.text);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Image
                style = {{width:24, height:35}}
                source={require("@/assets/images/dots-vertical-rounded-regular-48.png")}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
            }}
          >
            <Text style={styles.dropdownItemIconStyle}>{item.text}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}

export default VocabularyOptionsDropdown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 10,
    height: 40,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    height:500,
    width:200,
    left:150
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemIconStyle: {
    fontSize: 20,
    marginRight: 8,
  },
});
