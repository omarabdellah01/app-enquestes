// App.tsx (o index.tsx)
import 'react-native-get-random-values';  // << justo aquí
import React from 'react';
import { EnquestesProvider } from './screens/context/EnquestesContext';
// resto de imports...


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CrearEnquesta from './screens/CrearEnquesta';
import RespondreEnquesta from './screens/RespondreEnquesta';
import DuplicarEnquesta from './screens/DuplicarEnquesta';
import ResultatsScreen from './screens/ResultatsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <EnquestesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Enquestes' }} />
          <Stack.Screen name="CrearEnquesta" component={CrearEnquesta} options={{ title: 'Crear Enquesta' }} />
          <Stack.Screen name="RespondreEnquesta" component={RespondreEnquesta} options={{ title: 'Respondre Enquesta' }} />
          <Stack.Screen name="DuplicarEnquesta" component={DuplicarEnquesta} options={{ title: 'Duplicar Enquesta' }} />
          <Stack.Screen name="ResultatsScreen" component={ResultatsScreen} options={{ title: 'Resultats' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </EnquestesProvider>
  );
}



