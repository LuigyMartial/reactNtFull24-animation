import {Animated, PanResponder, StyleSheet, Text, View} from 'react-native';
import {useRef} from "react";

const GestureAnimation: React.FC = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        {
          useNativeDriver: false,
        },
        ),
        onPanResponderRelease:() => {
          Animated.spring(pan, {
            toValue: {x: 0, y: 80},
            useNativeDriver: false,
          }).start()
        }
      }),
  ).current;



  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Gesture Animation Demo</Text>
      <Text style={styles.headerText}>Drag the box</Text>

      <Animated.View style={[styles.box, pan.getLayout()]}
        {...panResponder.panHandlers}>
        <Text style={styles.boxText}>Drag Me</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f0f0f0',
  },
  headerText: { marginBottom: 20, fontSize: 20, fontWeight: 'bold' },
  box : {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    width: 100, height: 100,
    backgroundColor: '#18da22',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  boxText: { color: 'white', fontSize: 16, fontWeight: 'bold'}

});

export default GestureAnimation;