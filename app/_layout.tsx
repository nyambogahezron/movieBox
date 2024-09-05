import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
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
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='+not-found' options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootLayout;
