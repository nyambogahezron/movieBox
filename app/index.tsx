import {  ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrendingMovies from '@/components/TrendingMovies';
import MovieList from '@/components/MovieList';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from '@/components/LoadingScreen';
import {
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from '@/api/movieDB';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [trendingData, setTrendingData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [topRatedData, setTopRatedData] = useState([]);

  const fetchTrendingMoves = async () => {
    const data = await getTrendingMovies();
    if (data && data.results) {
      setTrendingData(data.results);
      setLoading(false);
    }
  };

  const fetchUpcomingMovies = async () => {
    const data = await getUpcomingMovies();
    if (data && data.results) {
      setUpcomingData(data.results);
      setLoading(false);
    }
  };

  const fetchTopRatedMovies = async () => {
    const data = await getTopRatedMovies();
    if (data && data.results) {
      setTopRatedData(data.results);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMoves();
    fetchUpcomingMovies();
    fetchTopRatedMovies();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#1D2125',
      }}
    >
      <StatusBar backgroundColor='#1D2125' style='light' />

      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
          className='-mt-8'
        >
          {/* trending movies carousel */}
          {trendingData.length > 0 && <TrendingMovies data={trendingData} />}

          {/* upcoming movies */}
          {upcomingData.length > 0 && (
            <MovieList title='Upcoming Movies' data={upcomingData} />
          )}
          {/* top rated movies */}

          {topRatedData.length > 0 && (
            <MovieList title='Top rated Movies' data={topRatedData} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
