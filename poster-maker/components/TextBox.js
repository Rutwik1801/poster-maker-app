import React, {useRef, useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, ImageBackground, FlatList} from 'react-native';

const TextBox = () => {
  const [text, setText] = useState("new text")
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  const handlePress = () => {
    setText(Math.random().toString())
  }

  return (
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <Text style={{width: 100, borderBottomWidth: 3}} onPress={handlePress}>{text}</Text>
      </Animated.View>

  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 5,
    flexWrap: "wrap"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default TextBox;