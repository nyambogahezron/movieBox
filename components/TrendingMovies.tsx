import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');
type TrendingMoviesProps = {
  data: any;
};

export default function TrendingMovies({ data }: TrendingMoviesProps) {
  const handleClick = ({ item }: any) => {
    router.push({
      pathname: '/(home)/movies',
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <View className='mb-8'>
      <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
      <View className='items-center justify-center w-full pb-4'>
        <Carousel
          loop
          width={width * 0.9}
          height={height * 0.4}
          autoPlay={true}
          parallax-horizontal
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={2000}
          renderItem={({ item }) => (
            <FlatList
              initialNumToRender={3}
              horizontal
              // keyExtractor={(item) => item.id}
              data={[...new Array(6).keys()]}
              renderItem={({ item }) => (
                <View className='p-3'>
                  <MovieCard item={item} handleClick={handleClick} />
                </View>
              )}
            />
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
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-l8LYFUlYqmHEmvA1NgcIc7rIko7aQr_Zuw&s',
        }}
        style={{
          width: width * 0.5,
          height: height * 0.4,
          alignItems: 'center',
        }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};
