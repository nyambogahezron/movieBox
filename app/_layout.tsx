import { useFonts } from 'expo-font';
import { Link, router, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { Text, TouchableOpacity, View } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import './global.css';

SplashScreen.preventAutoHideAsync();

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
                ovie <Text className='text-primary'>Threads</Text>
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
              className='h-10 w-10 rounded-full shadow-inner shadow-white border border-gray-50 items-center justify-center'
            >
              <Text className='text-primary font-bold text-2xl'>M</Text>
            </TouchableOpacity>
          ),

          headerRight: () => (
            <Link href='/(home)/search'>
              <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
            </Link>
          ),
        }}
      />
      <Stack.Screen name='+not-found' options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootLayout;
