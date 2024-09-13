import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useNavigation } from 'expo-router';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '@/theme';
import MovieList from '@/components/MovieList';
var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
export default function CastScreen() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [personalMovies, setPersonalMovies] = useState([1, 2, 3, 4]);
  const navigation = useNavigation();
  const verticalMargin = ios ? '' : 'my-3';

  return (
    <ScrollView
      className='flex-1 bg-neutral-900'
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      {/* back button  */}
      <SafeAreaView
        className={
          ' z-20 w-full flex-row justify-between items-center px-4' +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className='rounded-full p-1'
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon
            size={35}
            color={isFavorite ? theme.background : 'white'}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {/* details  */}
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
                uri: 'https://assets.teenvogue.com/photos/5aa1aac7bc935d60fac02d01/master/pass/originals-tout.jpg',
              }}
              className='rounded-full h-24 w-20'
              style={{ height: height * 0.43, width: width * 0.75 }}
            />
          </View>
        </View>
        <View className='mt-6'>
          <Text className='text-3xl text-white font-bold text-center'>
            John Doe
          </Text>
          <Text className='text-base text-neutral-500 f text-center'>
            Kenya
          </Text>
        </View>
        <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-lg overflow-hidden'>
          <View className='border-r-2 border-neutral-400 px-2 items-center'>
            <Text className='text-2xl text-white font-bold text-center'>
              Gender
            </Text>
            <Text className='text-neutral-300 text-sm'>Male</Text>
          </View>
          <View className='border-r-2 border-neutral-400 px-2 items-center'>
            <Text className='text-2xl text-white font-bold text-center'>
              Birthday
            </Text>
            <Text className='text-neutral-300 text-sm'>04-08-1990</Text>
          </View>
          <View className=' px-2 items-center'>
            <Text className='text-2xl text-white font-bold text-center'>
              Know For
            </Text>
            <Text className='text-neutral-300 text-sm'>Acting,Singer</Text>
          </View>
         
        </View>
        <View className='my-6 mx-4 space-y-2'>
          <Text className='text-wite text-lg text-white'>Biography</Text>
          <Text className='text-neutral-400 tracking-wide'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut id
            iusto ut. Placeat delectus soluta iure assumenda nobis accusamus est
            quam velit, voluptas autem beatae commodi, dignissimos, quidem at
            modi!
          </Text>
        </View>

        {/* movie list  */}

        <MovieList data={personalMovies} title='Movies ' hideSeeAll={true} />
      </View>
    </ScrollView>
  );
}
