import React, {useRef, useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, ImageBackground, FlatList} from 'react-native';

const TextBox = (text) => {
  const [text, setText] = useState(text);
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
      <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <Text style={{display:'inline'}} onPress={handlePress}>{text}</Text>
      </Animated.View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
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