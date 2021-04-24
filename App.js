import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import CompassView from './src/Compass';
import LevelView from './src/Level';

export default function App() {
  return (
    <Swiper loop={false}>
      <CompassView />
      <LevelView />
    </Swiper>
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
