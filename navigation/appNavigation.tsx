import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@/app';
import MovieScreen from '@/app/(home)/movies';
import CastScreen from '@/app/(home)/cast';
import SearchScreen from '@/app/(home)/search';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
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
