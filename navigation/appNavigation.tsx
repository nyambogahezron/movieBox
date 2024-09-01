import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@/screens/HomeScreen';
import MovieScreen from '@/screens/MovieScreen';
import CastScreen from '@/screens/CastScreen';
import SearchScreen from '@/screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            options={{ headerShown: false }}
            component={HomeScreen}
          />
          <Stack.Screen
            name='Movie'
            options={{ headerShown: false }}
            component={MovieScreen}
          />
          <Stack.Screen
            name='Cast'
            options={{ headerShown: false }}
            component={CastScreen}
          />
          <Stack.Screen
            name='Search'
            options={{ headerShown: false }}
            component={SearchScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
