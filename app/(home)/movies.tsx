import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import {  theme } from '@/theme';
import { router, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MovieCasts from '@/components/MovieCasts';
import MovieList from '@/components/MovieList';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from '@/components/LoadingScreen';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

interface RouteParams {
  params: {
    item: object;
  };
}

export default function MovieScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [cast, setCast] = useState([1, 2, 3, 4]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
 const { item } = useLocalSearchParams();
 const [parsedItem, setParsedItem] = useState(null);

 useEffect(() => {
   if (item) {
     setParsedItem(JSON.parse(item as string));
   }
   console.log('item', item);
 }, [item]);



  return (
    <SafeAreaView className='flex-1 bg-neutral-900'>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar backgroundColor='transparent' style='light' />
        {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className='w-full'>
          {/* header / back-button  */}
          <View
            className={
              'absolute top-10 z-20 w-full flex-row justify-between items-center px-4' +
              topMargin
            }
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className='rounded-lg p-1 bg-[#eab308] shadow-lg ml-3'
            >
              <ChevronLeftIcon size={28} strokeWidth={2.5} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className='mr-1'
            >
              <HeartIcon
                size={35}
                color={isFavorite ? theme.background : 'white'}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The-vampire-diaries-season-2-dvd_558x754.jpg/250px-The-vampire-diaries-season-2-dvd_558x754.jpg',
              }}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8),rgba(23,23,23,1)']}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className='absolute bottom-0'
            />
          </View>
        </View>

        {/* movie details  */}
        <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
          {/* title */}
          <Text className='text-white text-center text-3xl font-bold tracking-wider'>
            Movie Name
          </Text>
          {/* status */}
          <Text className='text-neutral-400 font-semibold text-base text-center'>
            Release . 2024 . 170 min
          </Text>

          {/* genres  */}
          <View className='flex-row justify-center mx-4 space-x-2'>
            <Text className='text-neutral-400 font-semibold text-base text-center'>
              Action
            </Text>
            <Text className='text-neutral-400 font-semibold text-base text-center'>
              Trill
              <Text className='text-neutral-400 font-semibold text-base text-center'>
                Comedy
              </Text>
            </Text>
          </View>

          {/* description */}
          <Text className='text-neutral-400 mx-4 tracking-wider'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            ducimus aperiam repellat, obcaecati dolorem quisquam commodi maxime!
            Vitae, exercitationem placeat.
          </Text>
        </View>

        {/* casts  */}
        <MovieCasts cast={cast} />

        {/* similar movies list  */}
        {/* <MovieList
          title='Similar Movies'
          hideSeeAll={true}
          data={similarMovies}
        /> */}
      </ScrollView>
      )}
    </SafeAreaView>
  );
}
