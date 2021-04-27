import React from 'react';
import { Magnetometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';


const CompassView = () => {
    return (
      <View style={styles.compassView}>
        <Text>Compass View</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    compassView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    }
  });


  export default CompassView;