import React from 'react';
import Gyroscope from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';


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

  export default LevelView;