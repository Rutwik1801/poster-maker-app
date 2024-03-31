import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, ImageBackground, FlatList} from 'react-native';
import TextBox from './components/TextBox';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const pan2 = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <ImageBackground resizeMode='cover' style={{flex:1, justifyContent:'center'}} src='https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg'>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
      <TextBox text="test 1" />
      <TextBox text="test 2" />
      <TextBox text="test 3" />
          </ImageBackground>
      </View>
      {/* <View style={{flex:0.15}}>
      <FlatList data= {
            [1,2,3]
          }
          renderItem={({item}) => <Text>{item}</Text>}
          horizontal
          />
      </View> */}
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

export default App;