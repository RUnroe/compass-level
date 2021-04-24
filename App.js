import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';


export default function App() {
  return (
    <Swiper loop={false}>
      <CompassView />
      <LevelView />
    </Swiper>
  );
}

const CompassView = () => {
  return (
    <View style={styles.compassView}>
      <Text>Compass View</Text>
    </View>
  );
}

const LevelView = () => {

  return (
    <View style={styles.levelView}>
      <Text>Level View</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  compassView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  levelView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
});
