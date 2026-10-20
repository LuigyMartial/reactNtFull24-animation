import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {useState} from "react";


const ReanimatedFormValidation: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const emailShake = useSharedValue(0);
    const passwordShake = useSharedValue(0);
    const emailCheckMark = useSharedValue(0);
    const passwordCheckMark = useSharedValue(0);
    const emailErrorheight = useSharedValue(0);
    const passwordErrorheight = useSharedValue(0);


    const validateEmail = (text: string) => {
        const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

        if(!text){
            setEmailError('Email is required');
            return false;
        } else if(!emailRegex.test(text)){
            setEmailError('Invalid Email Format');
            return false;
        }

        setEmailError('');
        return true;
    }

    const handleEmailChange = (text: string) => {
        setEmail(text);
        // validate the email
        const isValidEmail = validateEmail(text);
        emailCheckMark.value = withSpring(isValidEmail ? 1 : 0);

        if(!isValidEmail){
            emailShake.value = withSequence(
                withTiming(-10, { duration: 50}),
                withTiming(10, { duration: 100}),
                withTiming(0, { duration: 50})
            )
            emailErrorheight.value = withSpring(20);
        } else {
            emailErrorheight.value = withSpring(0);
        }
    }

    const validatePassword = (text: string) => {
        if(!text){
            setPasswordError('Password is required');
            return false;
        } else if(text.length < 6){
            setPasswordError('Password must be at least 6 characters long');
            return false;
        }

        setPasswordError('');
        return true;
    }

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        // validate the password
        const isValidatePassword = validatePassword(text);
        passwordCheckMark.value = withSpring(isValidatePassword ? 1 : 0);

        if(!isValidatePassword){
            passwordShake.value = withSequence(
                withTiming(-10, { duration: 50}),
                withTiming(10, { duration: 100}),
                withTiming(0, { duration: 50})
            )
            passwordErrorheight.value = withSpring(20);
        } else {
            passwordErrorheight.value = withSpring(0);
        }
    }

    const onSubmit = (email: string, password: string) => {

    }

    const handleFormSubmit = () => {
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);

        if(isValidEmail && isValidPassword){
            onSubmit(email, password);
            // api call from here and whatever things u wanna do here
        } else {
            if(!isValidEmail){
                emailShake.value = withSequence(
                    withTiming(-10, { duration: 50}),
                    withTiming(10, { duration: 100}),
                    withTiming(0, { duration: 50})
                )
                emailErrorheight.value = withSpring(20);
            }
            if(!isValidPassword){
                passwordShake.value = withSequence(
                    withTiming(-10, { duration: 50}),
                    withTiming(10, { duration: 100}),
                    withTiming(0, { duration: 50}),
                )
                passwordErrorheight.value = withSpring(20);
            }
        }
    }

    const emailAnimationStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: emailShake.value },
        ]
    }));

    const passwordAnimationStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: passwordShake.value },
        ]
    }))

    const emailCheckMarkStyle = useAnimatedStyle(() => ({
        opacity: emailCheckMark.value,
        transform: [
            { scale: emailCheckMark.value },
            { rotate: `${emailCheckMark.value * 360}deg` }
        ]
    }));

    const passwordCheckMarkStyles = useAnimatedStyle(() => ({
        opacity: passwordCheckMark.value,
        transform: [
            { scale: passwordCheckMark.value },
            { rotate: `${passwordCheckMark.value * 360}deg`}
        ]
    }));

    const emailErrorStyle = useAnimatedStyle(() => ({
        height: emailErrorheight.value,
        opacity: emailErrorheight.value === 0 ? 0 : 1,
        transform: [{
            translateY: withSpring(emailErrorheight.value / 2)
        }]
    }));

    const passwordErrorStyle = useAnimatedStyle(() => ({
        height: passwordErrorheight.value,
        opacity: passwordErrorheight.value === 0 ? 0 : 1,
        transform: [{
            translateY: withSpring(passwordErrorheight.value / 2)
        }]
    }));

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.inputContainer, emailAnimationStyle]}>
                <TextInput
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={email}
                    placeholder='Email'
                    style={styles.inputComp}
                    onChangeText={handleEmailChange}
                />
                <Animated.View style={[styles.checkmark, emailCheckMarkStyle]}>
                    <Text style={styles.checkmarkText}></Text>
                </Animated.View>

            </Animated.View>
            <Animated.Text style={[styles.errorText, emailErrorStyle]}>{emailError}</Animated.Text>
            <Animated.View style={[styles.inputContainer, passwordAnimationStyle]}>
                <TextInput
                    placeholder='Password'
                    style={styles.inputComp}
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry
                />
                <Animated.View style={[styles.checkmark, passwordCheckMarkStyles]}>
                    <Text style={styles.checkmarkText}></Text>
                </Animated.View>
            </Animated.View>
            <Animated.Text style={[styles.errorText, passwordErrorStyle]}>{passwordError}</Animated.Text>
            <Pressable style={styles.submitButton} onPress={handleFormSubmit}>
                <Text style={styles.submitButtonTxt}>Submit</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    inputComp: {
        flex: 1,
        paddingHorizontal: 15,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
    },
    checkmark: {
        position: 'absolute',
        right: 15,
        width: 20, height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: { color: '#40ad44', fontSize: 16, fontWeight: 'bold' },
    errorText: {
        marginBottom: 10,
        paddingHorizontal: 15,
        color: '#ff5255',
        fontSize: 12,
    },
    submitButton: {
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 12,
        backgroundColor: '#2196f3',
        borderRadius: 24,
    },
    submitButtonTxt: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default ReanimatedFormValidation;