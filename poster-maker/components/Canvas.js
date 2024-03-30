import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, PanResponder, Animated, TouchableOpacity, FlatList } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

const Canvas = () => {
  const [elements, setElements] = useState([
    { type: 'image', uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fdfstudio-d420.kxcdn.com%2Fwordpress%2Fwp-content%2Fuploads%2F2019%2F06%2Fdigital_camera_photo-1080x675.jpg&tbnid=0kl2WrGN8BrkhM&vet=12ahUKEwjCovvclpyFAxWcb2wGHSlSBWQQMygDegQIARBL..i&imgrefurl=https%3A%2F%2Fwww.dfstudio.com%2Fdigital-image-size-and-resolution-what-do-you-need-to-know%2F&docid=KEFtss0dYCDpzM&w=1080&h=675&q=image&ved=2ahUKEwjCovvclpyFAxWcb2wGHSlSBWQQMygDegQIARBL', position: { x: 0, y: 0 } },
    { type: 'text', content: 'Text 1', position: { x: 50, y: 100 }, style: { fontSize: 16, fontWeight: 'normal', color: 'black' } },
    { type: 'text', content: 'Text 2', position: { x: 150, y: 200 }, style: { fontSize: 16, fontWeight: 'normal', color: 'black' } },
  ]);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontColor, setFontColor] = useState('black');

  const addTextElement = () => {
    const newTextElement = {
      type: 'text',
      content: 'New Text',
      position: { x: 100, y: 100 },
      style: { fontSize, fontWeight, color: fontColor },
    };
    setElements([...elements, newTextElement]);
  };

  const panResponders = {};

  elements.forEach((element, index) => {
    panResponders[index] = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const updatedElements = [...elements];
        updatedElements[index].position.x += gesture.dx;
        updatedElements[index].position.y += gesture.dy;
        setElements(updatedElements);
      },
    });
  });

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  const changeFontWeight = (weight) => {
    setFontWeight(weight);
  };

  const changeFontColor = (color) => {
    setFontColor(color);
  };

  const FontSizeButtons = () => {
    const sizes = [12, 16, 20];
    return (
      <FlatList
        horizontal
        data={sizes}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => changeFontSize(item)}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const FontWeightButtons = () => {
    const weights = ['normal', 'bold'];
    return (
      <FlatList
        horizontal
        data={weights}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.button} onPress={() => changeFontWeight(item)}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const FontColorButtons = () => {
    const colors = ['black', 'red', 'blue'];
    return (
      <FlatList
        horizontal
        data={colors}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.button, { backgroundColor: item }]} onPress={() => changeFontColor(item)}>
            <Text style={[styles.buttonText, { color: 'white' }]}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasContainer}>
        <Image source={{ uri: elements[0].uri }} style={styles.image} />
        {elements.slice(1).map((element, index) => (
          <PanGestureHandler key={index} {...panResponders[index + 1].panHandlers}>
            <Animated.View
              style={[
                styles.draggable,
                { left: element.position.x, top: element.position.y },
                element.style,
              ]}
            >
              <Text>{element.content}</Text>
            </Animated.View>
          </PanGestureHandler>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <FontSizeButtons />
        <FontWeightButtons />
        <FontColorButtons />
        <TouchableOpacity style={styles.addButton} onPress={addTextElement}>
          <Text>Add Text</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  draggable: {
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#eee',
  },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default Canvas;
