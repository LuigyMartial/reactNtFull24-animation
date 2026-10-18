import {Pressable, StyleSheet, Text, View} from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue, withDelay, withRepeat,
    withSequence,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {withDecay} from "react-native-reanimated/src";


const ReanimatedAnimationTypes: React.FC = () => {
    const translateX = useSharedValue(0);
    const scale = useSharedValue(1);
    const rotate = useSharedValue(0);

    const boxStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { scale: scale.value },
                { rotate: `${rotate.value}deg`},
            ]
        }
    });

    // Timing animation
    const handleTimingAnimation = () => {
        translateX.value = withTiming(150, {
            duration: 1500,
            easing: Easing.out(Easing.exp)
        })
    }

    // Spring animation
    const handleSpringAnimation = () => {
        scale.value = withSpring(1.5, {
            damping: 120,
            stiffness: 900,
        });
    }

    // Decay animation
    const handleDecayAnimation = () => {
        translateX.value = withDecay({
            velocity: 200,
            clamp: [0, 300],
        });
    }

    // Sequence animation
    const handleSequenceAnimation = () => {
        rotate.value = withSequence(
            withTiming(360, { duration: 1000}),
            withTiming(0, { duration: 1000 }),
        );
    }

    // Repeat animation
    const handleRepeatAnimation = () => {
        scale.value = withRepeat(
            withTiming(1.5, { duration: 300 }),
            6,
            true,
        );
    }

    // Delay animation
    const handleDelayAnimation = () => {
        translateX.value = withDelay(1000, withSpring(200))
    }

    // Reset animation
    const handleResetAnimation = () => {
        translateX.value = withTiming(0);
        scale.value = withTiming(1);
        rotate.value = withTiming(0);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Reanimated Animation Types</Text>

            <Animated.View style={[styles.box, boxStyle]} />

            <View style={styles.btnContainer}>
                <Pressable style={styles.btn} onPress={handleTimingAnimation}>
                    <Text style={styles.btnText}>Timing</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={handleSpringAnimation}>
                    <Text style={styles.btnText}>Spring</Text>
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText} onPress={handleDecayAnimation}>Decay</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={handleSequenceAnimation}>
                    <Text style={styles.btnText}>Sequence</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={handleRepeatAnimation}>
                    <Text style={styles.btnText}>Repeat</Text>
                </Pressable>
                <Pressable style={styles.btn}>
                    <Text style={styles.btnText} onPress={handleDelayAnimation}>Delay</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={handleResetAnimation}>
                    <Text style={styles.btnText}>Reset</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#f0f0f0',
    },
    headerText: { marginBottom: 20, fontSize: 20, fontWeight: 'bold' },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150, height: 150,
        backgroundColor: '#1d31e4',
    },
    btnContainer: { flexDirection: 'row', marginBottom: 20, flexWrap: 'wrap', },
    btn: {
        margin: 10, padding: 10,
        backgroundColor: '#0ebc05',
        borderRadius: 5,
    },
    btnText: { color: 'white', fontWeight: 'bold' },
});

export default ReanimatedAnimationTypes;