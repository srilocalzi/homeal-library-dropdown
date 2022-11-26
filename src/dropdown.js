import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import CustomTextInput from "./customTextInput";
import { Card } from "react-native-shadow-cards";
import { Entypo, AntDesign } from "@expo/vector-icons";
// import Toast from "react-native-tiny-toast";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    minHeight: windowHeight * 0.05,
    margin: 5,
    padding: 5,
    width: windowWidth * 0.83,
    // marginHorizontal: windowWidth / 35,
  },
});

const Dropdown = ({ items, addCustomItems, itemLists, zIndex, max, placeholder, handleGetValue }) => {
  const [label, setLabel] = useState("");
  const [itemList, setItemList] = useState(itemLists);
  const [itemDropdown, setItemDropdown] = useState(items);
  const [showDropdown, setShowDropdown] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          minHeight: 20,
          backgroundColor: "#2D2D56",
          marginHorizontal: 2,
          paddingHorizontal: 7,
          borderRadius: 15,
          paddingVertical: 3,
          marginVertical: 4,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: "white",
            marginRight: 5,
            fontSize: 12,
            fontFamily: "public-sans-regular",
            alignSelf: "center",
          }}
        >
          {item}
        </Text>
        <Entypo name="circle-with-cross" size={17} color="white" style={{ paddingTop: 1.5 }} onPress={() => handleCross(item)} />
      </View>
    );
  };

  const handleDropdown = (item) => {
    setShowDropdown(false);
    if (itemList.length >= max) {
      Toast.show("Max only " + max + " can be selected");
    } else if (!itemList.includes(item.name.toUpperCase())) {
      setItemList((prevState) => [...prevState, item.name.toUpperCase()]);
    } else {
      Toast.show("Item is already added");
    }
    setLabel("");
  };

  const renderItemDropdown = ({ item }) => (
    <TouchableOpacity onPress={() => handleDropdown(item)}>
      <View style={{ paddingVertical: 8 }}>
        <Text
          style={{
            color: "black",
            marginRight: 5,
            fontSize: 15,
            fontFamily: "public-sans-regular",
          }}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleCross = (itemValue) => {
    setItemList(
      itemList.filter((data) => {
        return data !== itemValue;
      })
    );
  };

  useEffect(() => {
    if (label === "") {
      setItemDropdown(items);
      setShowDropdown(false);
    } else {
      setItemDropdown(items.filter((item) => item.name.includes(label)));
      if (items.map((item) => label.length > 4 && item.name !== label)) {
        setItemDropdown((item) => [{ name: label }, ...item]);
      }
      setShowDropdown(true);
    }
  }, [label]);

  const handleCrossLabel = () => {
    setLabel("");
    setShowDropdown(false);
  };

  //   useEffect(() => {
  //     handleGetValue(itemList);
  //   }, [itemList]);

  const handleToggle = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <View style={{ zIndex: zIndex }}>
      <Card style={styles.container}>
        {addCustomItems ? (
          <View style={{ flexDirection: "row", alignItems: "baseline" }}>
            <CustomTextInput
              inputContainer={{
                width: windowWidth * 0.65,
                borderColor: "grey",
                marginRight: 5,
              }}
              inputText={{
                color: "black",
                textAlign: "left",
                marginLeft: -8,
                fontSize: 14,
              }}
              placeholder={placeholder}
              placeholderTextColor="grey"
              value={label}
              onChangeText={(val) => {
                setLabel(val);
              }}
            />
            <Entypo name="circle-with-cross" size={22} color="#2D2D56" style={{ paddingTop: 1.5 }} onPress={() => handleCrossLabel()} />
          </View>
        ) : (
          <TouchableOpacity onPress={() => handleToggle()}>
            <View style={{ width: windowWidth * 0.8, flexDirection: "row", alignItems: "baseline", justifyContent: "space-around" }}>
              <Text style={{ fontSize: 16, fontFamily: "public-sans-regular", color: "#2D2D56" }}>{placeholder}</Text>
              {showDropdown && <AntDesign name="upcircle" size={22} color="black" />}
              {!showDropdown && <AntDesign name="downcircle" size={22} color="black" />}
            </View>
            <View style={{ width: windowWidth * 0.8, borderWidth: 0.5, marginVertical: 5 }}></View>
          </TouchableOpacity>
        )}

        <FlatList
          data={itemList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{ flexWrap: "wrap", marginTop: 5 }}
          numColumns={3}
        />
        {showDropdown && <FlatList data={itemDropdown} renderItem={renderItemDropdown} keyExtractor={(item) => item.name} />}
      </Card>
    </View>
  );
};

export default Dropdown;
