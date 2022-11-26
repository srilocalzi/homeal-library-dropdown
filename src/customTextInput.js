import React from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, Keyboard } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: windowHeight * 0.01,
    marginHorizontal: 5,
    width: windowWidth * 0.82,
    height: 40,
    borderBottomWidth: 0.8,
    borderBottomColor: "grey",
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  prefix: {
    fontSize: windowHeight > 1000 ? windowWidth * 0.03 : 16,
    marginRight: 10,
    fontFamily: "public-sans-light",
  },
  inputText: {
    width: "100%",
    fontSize: windowHeight > 1000 ? windowWidth * 0.03 : 13,
    fontFamily: "public-sans-light",
    color: "#2D2D56",
    flex: 1,
    flexWrap: "wrap",
  },
  icon: {
    color: "#2D2D56",
    margin: 5,
  },
});

const customTextInput = (props) => {
  return (
    <View style={{ ...styles.inputContainer, ...props.inputContainer }}>
      {props.prefix && <Text style={{ ...styles.prefix, ...props.prefixStyle }}>+91</Text>}
      {props.rupees && (
        <Text style={{ ...styles.prefix, ...props.prefixStyle }}>
          <FontAwesome name="rupee" size={14} color="black" />
        </Text>
      )}
      {props.iconName && <FontAwesome name={props.iconName} size={props.iconSize} color="black" style={{ ...styles.icon, ...props.icon }} />}
      {props.iconEmail && <MaterialIcons name={props.iconEmail} size={props.iconSize} color="black" style={{ ...styles.icon, ...props.icon }} />}
      {props.iconFood && <MaterialCommunityIcons name="bowl-mix" size={props.iconSize} color="black" />}
      <TextInput
        keyboardType={props.boardType}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        maxLength={props.maxLen}
        value={props.value}
        editable={props.editable}
        style={{ ...styles.inputText, ...props.inputText }}
        onChangeText={props.onChangeText}
        ref={props.ref}
        returnKeyType={props.returnKeyType}
        onSubmitEditing={props.onSubmitEditing}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        require={props.require}
      />
      {props.iconEdit && <MaterialIcons name="edit" size={22} color="#2D2D56" />}
      {props.iconCross && <Entypo name="circle-with-cross" size={22} color="black" style={{ paddingTop: 1.5 }} onPress={props.handleCross} />}
    </View>
  );
};

export default customTextInput;
