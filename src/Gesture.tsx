import {StyleSheet, Text, View} from "react-native";
import {GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent} from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
    useAnimatedStyle
} from "react-native-reanimated";

type ContextType = {
    startX: number;
    startY: number;
}

const ReanimatedGestures: React.FC = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
        onStart: (_: any, context: any) => {
            context.startX = translateX.value;
            context.startY = translateY.value;
        },
        onActive: (event: any, context: any) => {
            translateX.value = context.startX + event.translateX;
            translateY.value = context.startY + event.translateY;
        },
        onEnd: () => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value }
            ]
        }
    })

    return (
        <GestureHandlerRootView style={styles.container}>
            <View>
                <Text style={styles.headerText}>Reanimated Gestures</Text>
                <Text>Drag the below box and release it</Text>
            </View>
            <PanGestureHandler onGestureEvent={panGestureHandler}>
                <Animated.View style={[styles.box, animatedStyle]} />
            </PanGestureHandler>

        </GestureHandlerRootView>
    )
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
        marginTop: 20,
        width: 150, height: 150,
        backgroundColor: 'blue',
        borderRadius: 18,
    }
});

export default ReanimatedGestures;