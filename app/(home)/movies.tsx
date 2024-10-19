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
import { theme } from '@/theme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MovieCasts from '@/components/MovieCasts';
import MovieList from '@/components/MovieList';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from '@/components/LoadingScreen';
import {
  fallbackImage,
  getMovieCredits,
  getMovieDetails,
  getSimilarMovies,
  image500,
} from '@/api/movieDB';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState<any>({});
  const { item } = useLocalSearchParams();

  const router = useRouter();

  async function fetchMovieDetails(item: any) {
    setLoading(true);
    const data = await getMovieDetails(item);
    if (data) {
      setMovieDetails(data);
      setLoading(false);
    }
  }

  async function fetchMovieCredits(id: any) {
    const data = await getMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  }

  async function fetchSimilarMovies(id: any) {
    const data = await getSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  }

  useEffect(() => {
    fetchMovieDetails(item);
    fetchMovieCredits(item);
    fetchSimilarMovies(item);
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
                'absolute top-12 z-20 w-full flex-row justify-between items-center px-4' +
                topMargin
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
                <HeartIcon
                  size={35}
                  color={isFavorite ? theme.background : 'white'}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Image
                source={{
                  uri: image500(movieDetails?.poster_path) || fallbackImage,
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
            <Text className='text-white text-center text-2xl font-bold tracking-wider'>
              {movieDetails?.title}
            </Text>
            {/* status */}
            <Text className='text-neutral-400 font-semibold text-base text-center'>
              {movieDetails?.status} .{' '}
              {movieDetails?.release_date?.split('-')[0]}.{' '}
              {movieDetails?.runtime} min
            </Text>

            {/* genres  */}
            <View className='flex-row justify-center mx-4 space-x-2'>
              {movieDetails?.genres?.map((genre: any, index: number) => {
                return (
                  <Text
                    key={index}
                    className='text-neutral-400 font-semibold text-base text-center'
                  >
                    {genre.name} .
                  </Text>
                );
              })}
            </View>

            {/* description */}
            <Text className='text-neutral-400 mx-4 tracking-wider'>
              {movieDetails?.overview}
            </Text>
          </View>

          {/* casts  */}
          <MovieCasts cast={cast} />

          {/* similar movies list  */}
          <MovieList
            title='Similar Movies'
            hideSeeAll={true}
            data={similarMovies}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
