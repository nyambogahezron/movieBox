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

const ios = Platform.OS == 'ios';

interface HomeScreenProps {
  data: [];
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [trendingData, setTrendingData] = useState([1, 2, 3]);
  const [upcomingData, setUpcomingData] = useState([1, 2, 3]);
  const [topRatedData, setTopRatedData] = useState([1, 2, 3]);
  return (
    <View className='flex-1 bg-neutral-800'>
      {/* search bar and logo  */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <View className='flex-row justify-between item-center mx-4'>
          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>M</Text>ovie
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

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
    </View>
  );
};

export default HomeScreen;
