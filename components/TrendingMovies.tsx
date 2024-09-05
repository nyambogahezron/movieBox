import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { router, useNavigation } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = ({ item }) => {
    router.push({
      pathname: '/(home)/movies',
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>

      <Carousel
        loop
        width={width * 0.62}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The-vampire-diaries-season-2-dvd_558x754.jpg/250px-The-vampire-diaries-season-2-dvd_558x754.jpg',
        }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};
