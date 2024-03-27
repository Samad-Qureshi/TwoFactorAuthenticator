import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainScreen from './screens/MainScreen';
import CodeInputScreen from './screens/CodeInputScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <GestureHandlerRootView style={{ flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown:false}} />
        <Stack.Screen name="CodeInput" component={CodeInputScreen}  options={{title:'Pair the service with 2FAS',headerStyle: {
            backgroundColor: '#DC143C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400'
          }}}/>
      </Stack.Navigator>
    </NavigationContainer>
    // </GestureHandlerRootView>
  );
}