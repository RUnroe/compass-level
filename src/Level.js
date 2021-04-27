import React, {useState, useEffect } from 'react';
import { Accelerometer  } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';


const LevelView = () => {
    const [bgColor, setBgColor] = useState("#ed5a5a");
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    
    const [subscription, setSubscription] = useState(null);

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(gyroscopeData => {
                setData(gyroscopeData);
                adjustBgColor(gyroscopeData);
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    const adjustNum = num => {
        return( Math.round(num*100));
    }
    const adjustBgColor = (gyroscopeData) => {
        let conditionsMet = 0;
        let dataPoint;
        Object.values(gyroscopeData).forEach(number => {
            dataPoint = Math.abs(adjustNum(number));
            if(dataPoint >= 0 && dataPoint <= 2 || dataPoint >= 98 && dataPoint <= 102)
                conditionsMet++;
        });
        if(conditionsMet == 3) setBgColor("#68ed6f");
        else setBgColor("#ed5a5a")
    }


    useEffect(() => {
        _subscribe();
        Accelerometer.setUpdateInterval(300);
        return () => _unsubscribe();
    }, []);


    return (
      <View style={[styles.levelView, {backgroundColor: bgColor}]}>
        <Text>x: {adjustNum(data.x)} y: {adjustNum(data.y)} z: {adjustNum(data.z)}</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    levelView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
  });

  export default LevelView;