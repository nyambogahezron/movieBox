import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '@/theme';
import TrendingMovies from '@/components/TrendingMovies';
import MovieList from '@/components/MovieList';
import { router } from 'expo-router';

const ios = Platform.OS == 'ios';

const HomeScreen = () => {
  const [trendingData, setTrendingData] = useState([1, 2, 3]);
  const [upcomingData, setUpcomingData] = useState([1, 2, 3]);
  const [topRatedData, setTopRatedData] = useState([1, 2, 3]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1D2125',
        marginBottom: ios ? -2 : 3,
      }}
    >
      {/* search bar and logo */}
      <View
        className='px-2 flex flex-row justify-between
        items-center mb-4'
      >
        <Text className='text-white text-3xl font-bold'>
          <Text style={styles.text}>M</Text>ovie
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(home)/search')}
          className='mr-5'
        >
          <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* trending movies carousel */}
        <TrendingMovies data={trendingData} />

        {/* upcoming movies */}
        <MovieList title='Upcoming Movies' data={upcomingData} />

        {/* top rated movies */}
        <MovieList title='Top rated Movies' data={topRatedData} />
      </ScrollView>

      <StatusBar barStyle='light-content' />
    </SafeAreaView>
  );
};

export default HomeScreen;
