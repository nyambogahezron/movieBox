import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '@/components/MovieList';
import LoadingScreen from '@/components/LoadingScreen';
import {
  fallbackProfileImage,
  getPersonDetails,
  getPersonMovieCredits,
  image185,
} from '@/api/movieDB';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : 'my-3';

export default function CastScreen() {
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [personalDetails, setPersonalDetails] = useState<any>({});
  const [personalMovies, setPersonalMovies] = useState([]);
  const { item } = useLocalSearchParams();

  async function fetchPersonalDetails(id: any) {
    const data = await getPersonDetails(id);
    if (data) setPersonalDetails(data);
  }

  async function fetchPersonalMovies(item: any) {
    const data = await getPersonMovieCredits(item);
    if (data && data.cast) setPersonalMovies(data.cast);
  }

  useEffect(() => {
    setLoading(true);
    fetchPersonalDetails(item);
    fetchPersonalMovies(item);
    setLoading(false);
  }, []);

  return (
    <ScrollView
      className='flex-1 bg-neutral-900'
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      {/* back button  */}
      <SafeAreaView
        className={
          ' z-20 w-full flex-row top-2 justify-between items-center px-4' +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className='rounded-lg p-1 bg-[#eab308] shadow-lg ml-3'
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className='mr-1'
        >
          <HeartIcon size={35} color={isFavorite ? '#eab308' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* details  */}
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <View>
          <View
            className='flex-row justify-center'
            style={{
              shadowColor: 'grey',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className='overflow-hidden rounded-full h-72 w-72 border-2 border-neutral-500'>
              <Image
                source={{
                  uri:
                    image185(personalDetails?.profile_path) ||
                    fallbackProfileImage,
                }}
                className='rounded-full h-24 w-20'
                style={{ height: height * 0.43, width: width * 0.75 }}
              />
            </View>
          </View>
          <View className='mt-6'>
            <Text className='text-3xl text-white font-bold text-center'>
              {personalDetails?.name}
            </Text>
            <Text className='text-base text-neutral-500 f text-center'>
              {personalDetails?.place_of_birth}
            </Text>
          </View>
          <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-lg overflow-hidden'>
            <View className='border-r-2 border-neutral-400 px-2 items-center'>
              <Text className='text-lg text-white font-bold text-center'>
                Gender
              </Text>
              <Text className='text-neutral-300 text-sm'>
                {' '}
                {personalDetails?.gender == 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className='border-r-2 border-neutral-400 px-2 items-center'>
              <Text className='text-lg text-white font-bold text-center'>
                Birthday
              </Text>
              <Text className='text-neutral-300 text-sm'>
                {personalDetails?.birthday}
              </Text>
            </View>
            <View className='border-r-2 border-neutral-400 px-2 items-center'>
              <Text className='text-lg text-white font-bold text-center'>
                Popularity
              </Text>
              <Text className='text-neutral-300 text-sm'>
                {personalDetails?.popularity}%
              </Text>
            </View>
            <View className=' px-2 items-center'>
              <Text className='text-lg text-white font-bold text-center'>
                Know For
              </Text>
              <Text className='text-neutral-300 text-sm'>
                {personalDetails?.known_for_department}
              </Text>
            </View>
          </View>
          <View className='my-6 mx-4 space-y-2'>
            <Text className='text-wite text-lg text-white'>Biography</Text>
            <Text className='text-neutral-400 tracking-wide'>
              {personalDetails?.biography || 'No biography available'}
            </Text>
          </View>

          {/* movie list  */}

          <MovieList data={personalMovies} title='Movies ' hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
