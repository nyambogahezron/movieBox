import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('Movie', item);
  };

  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        slideWidth={width}
        inactiveSlideOpacity={0.6}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItem: 'center' }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={require('')}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};
