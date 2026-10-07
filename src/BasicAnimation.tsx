import {
  Animated,
  Button,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRef} from "react";

const BasicAnimation: React.FC = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(1)).current;

    const handleFadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    const handleFadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    const handleTranslate = () =>  {
        Animated.timing(translateAnim, {
            toValue: 100,
            duration: 1000,
            easing: Easing.bezier(0.25, 0.1,0.25,1),
            useNativeDriver: true,
        }).start();
    }

    const handleScale = () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.5,
                duration: 200,
                useNativeDriver: true
            }),
            Animated.timing(scaleAnim, {
                toValue: 3,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    }

    const handleRotate = () => {
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(()=> {
            rotateAnim.setValue(0);
        });
    }

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"]
    })



    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Basic Animation Demo</Text>

        {/* Fade animation demo */}
        <Text style={styles.headerText}>Fade In & Fade Out Demo</Text>
        <View style={styles.demoContainer}>
          <Animated.View
            style={[styles.box, styles.fadeBox, { opacity: fadeAnim }]}
          ></Animated.View>
          <View style={styles.buttonContainer}>
            <Button title="Fade In" onPress={handleFadeIn} />
            <Button title="Fade Out" onPress={handleFadeOut} />
          </View>
        </View>
        {/* Translate animation demo */}
        <Text style={styles.headerText}>Tanslate Demo </Text>
        <View style={styles.demoContainer}>
          <Animated.View
            style={[
              styles.box,
              styles.translateBox,
              {
                transform: [
                  {
                    translateX: translateAnim,
                  },
                ],
              },
            ]}
          >
            {' '}
          </Animated.View>
          <Button title="Translate" onPress={handleTranslate} />
        </View>
        {/* Scale animation demo */}
        <Text style={styles.headerText}>Scale Demo</Text>
        <View style={styles.demoContainer}>
          <Animated.View
            style={[
              styles.box,
              styles.scaleBox,
              { transform: [{ scale: scaleAnim }] },
            ]}
          ></Animated.View>
          <Button title="Scale" onPress={handleScale} />
        </View>
        {/* Rotate animation demo */}
        <Text style={styles.headerText}>Rotate Demo</Text>
        <Animated.View
          style={[
            styles.box,
            styles.rotateBox,
            { transform: [{ rotate: spin }] },
          ]}
        ></Animated.View>
        <Button title='Rotate' onPress={handleRotate} />
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: "#f0f0f0",
    },
    headerText: { marginBottom: 20, fontSize: 20, fontWeight: 'bold' },
    demoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: '100%',
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        width: 100, height: 100,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5,
    },
    fadeBox: { backgroundColor: '#3498db' },
    translateBox: { backgroundColor: '#89c825' },
    scaleBox: { backgroundColor: '#3009a3' },
    rotateBox: { backgroundColor: '#a30977' }
});

export default BasicAnimation;