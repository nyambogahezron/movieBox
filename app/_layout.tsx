import { useFonts } from 'expo-font';
import { router, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { Text, TouchableOpacity, View } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
SplashScreen.preventAutoHideAsync(); //prevent splash screen from auto hiding till fonts are loaded

const RootLayout = () => {
  // load fonts

  const [fontsLoaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // check if fonts are loaded

  useEffect(() => {
    if (error) throw new Error('Fonts not loaded');
    if (fontsLoaded) SplashScreen.hideAsync(); //hide splash screen
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;

  return (
    <Stack>
      <Stack.Screen name='(home)' options={{ headerShown: false }} />
      <Stack.Screen
        name='index'
        options={{
          headerStyle: {
            backgroundColor: '#1D2125',
          },
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerBackButtonMenuEnabled: false,
          headerTitle: (props) => (
            <View {...props}>
              <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold' }}>
                <Text className='text-primary'>M</Text>
                ovie <Text className='text-primary'>Trend</Text>
              </Text>
            </View>
          ),
          headerTitleStyle: {
            color: '#eab308',
            fontSize: 26,
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              className=' bg-opacity-50 rounded-lg p-1 py-2 '
            >
              <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/(home)/search')}>
              <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name='+not-found' options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootLayout;
