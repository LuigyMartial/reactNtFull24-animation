import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.tsx';
import BasicAnimation from './BasicAnimation.tsx';
import Interpolation from "./Interpolation.tsx";

export type RootStackParamList = {
  Home: undefined;
  BasicAnimation: undefined;
  Interpolation: undefined;
}
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BasicAnimation" component={BasicAnimation} />
      <Stack.Screen name="Interpolation" component={Interpolation} />
    </Stack.Navigator>
  )
}

export default RootNavigator;