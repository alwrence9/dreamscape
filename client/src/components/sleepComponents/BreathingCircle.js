//inspired by react-native-animated-examples by WJimmyCook
import { StatusBar } from "expo-status-bar";
import React, {useRef} from "react";
import {Stylesheet, Text, View, Dimensions, Animated } from "react-native";
const {width, height} = Dimensions.get("Window");
const circleWidth = width / 2;
const styles = Stylesheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    left: width /4,
    top: height/4
  }
})
export default function BreathingCircle(){
  return (
    // <View style = {styles.container }>
    //   {
    //   key = {item}
    //   style = ({
    //     backgroundColor: "green",
    //     width:circleWidth,
    //     height: circleWidth,
    //     borderRadius: circleWidth /2
    //   })}
    // </View>
    <h1> Implementing the circle here</h1>
  );

}
