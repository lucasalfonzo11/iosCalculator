/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';
import { globalStyles } from './config/theme/app-theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={globalStyles.background}>
      <StatusBar backgroundColor='blue' barStyle={'light-content'}  />
      <View style={styles.container}>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        <CalculatorScreen />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    paddingBottom:25
  },
});

export default App;
