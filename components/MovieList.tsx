import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { styles } from '@/theme';
import { router } from 'expo-router';
import { fallbackImage, image185 } from '@/api/movieDB';
import { MovieListProps } from '@/types';
const { width, height } = Dimensions.get('window');

const MovieList = ({ title, data, hideSeeAll }: MovieListProps) => {
  return (
    <View className='mb-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-xl'>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className='text-lg'>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* movie row  */}
      <ScrollView
        scrollIndicatorInsets={{ right: 1 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() =>
              router.push({
                pathname: '/(home)/movies',
                params: { item: JSON.stringify(item.id) },
              })
            }
            className='p-1 border border-gray-600 '
          >
            <View>
              <Image
                source={{
                  uri: image185(item?.poster_path || fallbackImage),
                }}
                className='rounded-lg ml-2'
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className='text-neutral-300 ml-1 mt-1 text-[12px]'>
                {item.title.length > 14
                  ? item.title.slice(0, 14) + '...'
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
