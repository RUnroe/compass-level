import React, {useState, useEffect } from 'react';
import { Magnetometer } from 'expo-sensors';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

const CompassView = () => {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);


    const _subscribe = () => {
    setSubscription(
        Magnetometer.addListener(result => {
        setData(result);
        })
    );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
        _subscribe();
        Magnetometer.setUpdateInterval(16);
        return () => _unsubscribe();
    }, []);

    const adjustNum = num => {
        return( Math.round(num*100));
    }
    return (
        <View style={styles.compassView}>
            <Text>Compass View</Text>
            <View style={styles.donut}></View>
            {/* <View style={styles.compass}></View> */}
            <LinearGradient colors={['#eee', '#eee', '#f00']} style={styles.compass}>
            </LinearGradient>
            <View style={styles.circle}></View>
            
        </View>
    );
}

  const styles = StyleSheet.create({
    donut: {
        backgroundColor: "#333",
        position: "absolute",
        width: 170,
        height: 170,
        left: (windowWidth-170)/2,
        top:  (windowHeight-170)/2,
        borderRadius: 170,
        zIndex: 3,
    },
    circle: {
        backgroundColor: "#eee",
        position: "absolute",
        width: 200,
        height: 200,
        left: (windowWidth-200)/2,
        top:  (windowHeight-200)/2,
        borderRadius: 200,
        zIndex: 1,
    },
    compass: {
        // backgroundColor: "#f00",
        position: "absolute",
        width: 10,
        height: 200,
        left: (windowWidth-10)/2,
        top:  (windowHeight-200)/2,
        borderRadius: 1,
        zIndex: 2,
        transform: [{rotate: "190deg"}]
    },
    compassView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333"
    }
  });


  export default CompassView;