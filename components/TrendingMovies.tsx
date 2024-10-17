import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import { image500 } from '@/api/movieDB';
import React from 'react';

const { width, height } = Dimensions.get('window');
type TrendingMoviesProps = {
  data: any;
};
const PAGE_WIDTH = width;

const COUNT = 6;
export default function TrendingMovies({ data }: TrendingMoviesProps) {
  const [isVertical, setIsVertical] = React.useState(false);

  const handleClick = ({ item }: { item: any }) => {
    router.push({
      pathname: '/(home)/movies',
      params: { item: JSON.stringify(item.id) },
    });
  };

  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH / 2 / COUNT,
        style: {
          height: PAGE_WIDTH / 2,
        },
      } as const)
    : ({
        vertical: false,
        width: PAGE_WIDTH / COUNT,
        height: PAGE_WIDTH / 2,
        style: {
          width: PAGE_WIDTH,
          // padding: 10,
        },
      } as const);

  return (
    <View className='mb-4'>
      <Text className='text-white text-xl mx-4 mt-1 '>Trending Now</Text>
      <View
        className='w-full pb-4 items-center justify-center'
        style={{ width: width }}
      >
        <Carousel
          {...baseOptions}
          loop
          autoPlayInterval={2500}
          width={width * 0.9}
          height={height * 0.4}
          autoPlay={true}
          parallax-horizontal
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.87,
            parallaxScrollingOffset: 50,
          }}
          data={data}
          windowSize={10}
          scrollAnimationDuration={2000}
          renderItem={({ item }) => (
            <View className='p-3 flex-1'>
              <MovieCard
                item={item}
                handleClick={() => handleClick({ item })}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

type MovieCardProps = {
  item: any;
  handleClick: (item: any) => void;
};
const MovieCard = ({ item, handleClick }: MovieCardProps) => {
  return (
    <TouchableWithoutFeedback
      style={{ padding: 10 }}
      onPress={() => handleClick(item)}
    >
      <Image
        source={{
          uri: image500(item?.poster_path),
        }}
        style={{
          width: width * 0.9,
          height: height * 0.4,
          alignItems: 'center',
        }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};
