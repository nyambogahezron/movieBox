import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { router } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import { fallbackImage, image500 } from '@/api/movieDB';

const { width, height } = Dimensions.get('window');
type TrendingMoviesProps = {
  data: any;
};
const PAGE_WIDTH = width;

const COUNT = 6;
export default function TrendingMovies({ data }: TrendingMoviesProps) {
  const handleClick = ({ item }: { item: any }) => {
    router.push({
      pathname: '/(home)/movies',
      params: { item: JSON.stringify(item.id) },
    });
  };

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH / COUNT,
    height: PAGE_WIDTH / 2,
    style: {
      width: PAGE_WIDTH,
    },
  } as const;

  return (
    <View className='mb-4'>
      <Text className='text-white text-xl mx-4 mt-1 '>Trending Now</Text>
      <View
        className='w-full items-center justify-center'
        style={{ width: width }}
      >
        <Carousel
          {...baseOptions}
          loop
          autoPlayInterval={2500}
          width={width * 0.9}
          height={height * 0.5}
          autoPlay={true}
          parallax-horizontal
          mode='parallax'
          modeConfig={{
            parallaxScrollingScale: 0.84,
            parallaxScrollingOffset: 60,
          }}
          data={data}
          windowSize={10}
          scrollAnimationDuration={2000}
          renderItem={({ item }) => (
            <View className=' flex-1'>
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
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{
          uri: image500(item?.poster_path) || fallbackImage,
        }}
        style={{
          width: width * 0.9,
          height: height * 0.5,
          alignItems: 'center',
        }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};
