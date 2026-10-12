import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen.tsx';
import BasicAnimation from './BasicAnimation.tsx';
import Interpolation from "./Interpolation.tsx";
import CombinedAnimation from './CombinedAnimation.tsx';
import GestureAnimation from './GestureAnimation.tsx';

export type RootStackParamList = {
  Home: undefined;
  BasicAnimation: undefined;
  Interpolation: undefined;
  CombinedAnimation: undefined;
  GestureAnimation: undefined;
}
const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BasicAnimation" component={BasicAnimation} />
      <Stack.Screen name="Interpolation" component={Interpolation} />
      <Stack.Screen name="CombinedAnimation" component={CombinedAnimation} />
      <Stack.Screen name="GestureAnimation" component={GestureAnimation} />
    </Stack.Navigator>
  )
}

export default RootNavigator;