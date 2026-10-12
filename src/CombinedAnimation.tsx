import { Animated, Button, StyleSheet, Text, View } from 'react-native';
import {useRef} from "react";


const CombinedAnimation: React.FC = () => {
  const moveAndRotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const combinedAnimation = () => {
    moveAndRotateAnim.setValue(0);

    Animated.timing(moveAndRotateAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false
    }).start()
  }

  const pulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }

  const moveX = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100]
  });

  const moveY = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100]
  });

  const rotate = moveAndRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const backgroundColor = moveAndRotateAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#0697ad', '#c0dc06', '#063ad6']
  })

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Combined Animation Demo</Text>
      <Animated.View style={[styles.box, {
            backgroundColor,
            transform: [
              {
                translateX: moveX,
              },
              {
                translateY: moveY,
              },
              {
                rotate: rotate,
              },
              {
                scale: pulseAnim,
              },
            ]
          }]}>
        <Text style={styles.boxText}>Combined Animation</Text>
      </Animated.View>
      <View style={styles.btnContainer}>
        <Button title="Move, rotate & change color" onPress={combinedAnimation} />
        <Button title="Pulse" onPress={pulseAnimation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
  },
  headerText: { fontSize: 20, fontWeight: 'bold'},
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: 100, height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  btnContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  boxText: { fontSize: 18, fontWeight: 'bold' },
});

export default CombinedAnimation;