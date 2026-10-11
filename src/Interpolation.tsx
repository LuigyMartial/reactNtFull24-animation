import { StyleSheet, Text, View } from 'react-native';


const Interpolation: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Interpolation Demo</Text>
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
  headerText: { fontSize: 20, fontWeight: 'bold'}
});

export default Interpolation;