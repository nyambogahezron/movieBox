import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import TrendingMovies from '@/components/TrendingMovies';
import MovieList from '@/components/MovieList';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
  const [trendingData, setTrendingData] = useState([1, 2, 3]);
  const [upcomingData, setUpcomingData] = useState([1, 2, 3]);
  const [topRatedData, setTopRatedData] = useState([1, 2, 3]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1D2125',
      }}
    >
      <StatusBar backgroundColor='#1D2125' style='light' />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitle: (props) => (
            <View {...props}>
              <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold' }}>
                <Text className='text-[#eab308]'>M</Text>
                ovie
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
            <TouchableOpacity
              onPress={() => router.push('/(home)/search')}
              className='mr-5'
            >
              <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* trending movies carousel */}
        <TrendingMovies data={trendingData} />

        {/* upcoming movies */}
        <MovieList title='Upcoming Movies' data={upcomingData} />

        {/* top rated movies */}
        <MovieList title='Top rated Movies' data={topRatedData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
