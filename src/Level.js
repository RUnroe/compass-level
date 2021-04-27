import React, {useState, useEffect } from 'react';
import { Accelerometer  } from 'expo-sensors';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LevelView = () => {
    const [bgColor, setBgColor] = useState("#ed5a5a");
    const [topOffset, setTopOffset] = useState((windowHeight-2)/2);
    const [leftOffset, setLeftOffset] = useState((windowWidth-2)/2);

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
                adjustLines(gyroscopeData);
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

    const adjustLines = (gyroscopeData) => {
        let data = [...Object.values(gyroscopeData)];
        data = data.map(point => (adjustNum(point)));
        // console.log(data);
        let highestNum = {index: 0, value: data[0]};
        for(let i = 1; i < data.length; i++) {
            if(Math.abs(data[i]) > Math.abs(highestNum.value)) {
                highestNum = {index: i, value: Math.abs(data[i])};
            }
        }
        console.log("removed:", highestNum.index, highestNum.value);
        data.splice(highestNum.index, 1);

        // console.log(Math.floor(  (((data[1])+70) * (5/7))), 
        //             Math.floor(   (((data[0])+70) * (5/7)))
        // );
        setTopOffset(Math.floor(  (((data[0])+70) * (5/7))) + "%" );
        setLeftOffset(Math.floor(   (100-((data[1])+70) * (5/7))) + "%" );

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
        Accelerometer.setUpdateInterval(100);
        return () => _unsubscribe();
    }, []);


    return (
        <View style={styles.levelView}>
            <View style={[styles.vLine, {left: leftOffset, backgroundColor: bgColor}]}></View>
            <View style={[styles.hLine, {top: topOffset,   backgroundColor: bgColor}]}></View>
            <View style={styles.centerPoint}></View>
            <Text style={styles.text}>x: {adjustNum(data.x)} y: {adjustNum(data.y)} z: {adjustNum(data.z)}</Text>
        </View>
    );
  }

const styles = StyleSheet.create({
    centerPoint: {
        position: "absolute",
        backgroundColor: "#2c3d96",
        top:  ((windowHeight-22)/2),
        left: ((windowWidth -22)/2),
        width:  26,
        height: 26,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#eee",
        zIndex: 1
    },
    hLine: {
        position: "absolute",
        height: 2,
        top: "50%",
        width: windowWidth,
        backgroundColor: "#333",
        zIndex: 2
    },
    vLine: {
        position: "absolute",
        left: "50%",
        height: windowHeight,
        width: 2,
        backgroundColor: "#333",
        zIndex: 2
    },
    levelView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#333"
    },
    text: {
        marginBottom: 40,
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#eee",
        zIndex: 6
    }
});

export default LevelView;