import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootNavigator.tsx';

const topics = [
  {
    id: 1,
    title: 'Basic Animation Demo',
    screen: 'BasicAnimation',
  },
  {
    id: 2,
    title: 'Interpolation Demo',
    screen: 'Interpolation',
  },
  {
    id: 3,
    title: 'Combined Animation Demo',
    screen: 'CombinedAnimation',
  },
  {
    id: 4,
    title: 'Gesture Animation Demo',
    screen: 'GestureAnimation',
  },
  {
    id: 5,
    title: 'Reanimated Core Concepts',
    screen: 'ReanimatedCoreConcepts',
  },
  {
    id: 6,
    title: 'Reanimated Animation Types',
    screen: 'ReanimatedAnimationTypes',
  }
]

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={topics}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.topicBtn}
            onPress={() => navigation.navigate(item.screen as keyof RootStackParamList)}
          >
            <Text style={styles.topicText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  topicBtn: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  topicText: { fontSize: 18, fontWeight: 'bold'}

});

export default HomeScreen;