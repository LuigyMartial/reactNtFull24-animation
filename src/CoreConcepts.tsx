import { Pressable, StyleSheet, Text, View} from "react-native";
import Animated, {
    useAnimatedRef,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue, withRepeat,
    withSpring, withTiming, Easing, cancelAnimation
} from "react-native-reanimated";

const ReanimatedCoreConcepts: React.FC = () => {
    const offset = useSharedValue(0);
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    const animatedRef = useAnimatedRef<Animated.View>();

    const opacity = useDerivedValue(() => {
        return Math.sin((rotation.value * Math.PI) / 180) / 2 + 0.5;
    })

    const boxStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: offset.value,
                },
                {
                    rotate: `${rotation.value}deg`,
                },
                {
                    scale: scale.value,
                },
            ],
            opacity: opacity.value,
        }
    });

    const textStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: 1 / scale.value}]
        }
    });

    const handleStartAnimation = () => {
        offset.value = withSpring(Math.random() * 200 - 100);

        rotation.value = withRepeat(
            withTiming(360, {duration: 2000, easing: Easing.linear}),
            -1,
            false
        )

        scale.value = withRepeat(withTiming(1.5, {duration: 1000}), -1, true);
    }

    const handleStopAnimation = () => {
        cancelAnimation(offset);
        cancelAnimation(rotation);
        cancelAnimation(scale);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Reanimated Core Concepts</Text>

            <Animated.View style={[styles.box, boxStyle]} ref={animatedRef}>
                <Animated.Text style={[styles.boxText, textStyle]}>Animation Box</Animated.Text>
            </Animated.View >

            <View style={styles.btnContainer}>
                <Pressable style={styles.btn} onPress={handleStartAnimation}>
                    <Text style={styles.btnText}>Start Animation</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={handleStopAnimation}>
                    <Text style={styles.btnText}>Stop Animation</Text>
                </Pressable>
            </View>
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
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150, height: 150,
        backgroundColor: '#1d31e4'
    },
    boxText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    btnContainer: { flexDirection: 'row', marginBottom: 20 },
    btn: {
        margin: 10,
        padding: 10,
        backgroundColor: '#0ebc05',
        borderRadius: 5,
    },
    btnText: { color: 'white', fontWeight: 'bold' },
})

export default ReanimatedCoreConcepts;