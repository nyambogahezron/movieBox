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
import { useNavigation } from '@react-navigation/native';

const ios = Platform.OS == 'ios';

interface HomeScreenProps {
  data: [];
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [trendingData, setTrendingData] = useState([1, 2, 3]);
  const [upcomingData, setUpcomingData] = useState([1, 2, 3]);
  const [topRatedData, setTopRatedData] = useState([1, 2, 3]);
  const navigation = useNavigation();

  return (
    <SafeAreaView className={`flex-1 bg-neutral-800 ${ios ? '-mb-2' : 'mb-3'}`}>
      {/* search bar and logo */}
      <View className='flex-row justify-between items-center mx-4'>
        <Text className='text-white text-3xl font-bold'>
          <Text style={styles.text}>M</Text>ovie
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
