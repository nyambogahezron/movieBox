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

const { width, height } = Dimensions.get('window');

interface MovieListProps {
  title: string;
  data: Array<{ id: number; [key: string]: any }>;
  hideSeeAll?: boolean;
}

const MovieList = ({ title, data, hideSeeAll }: MovieListProps) => {
  const movieName = 'Movie name';

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
                params: { item: JSON.stringify(item) },
              })
            }
            className='p-1 border border-gray-600'
          >
            <View>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3KtsQGuRcs9FYnOGb2OuzwWFShhAQSqSpdQ&s',
                }}
                className='rounded-lg'
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className='text-neutral-300 ml-1'>
                {movieName.length > 14
                  ? movieName.slice(0, 14) + '...'
                  : movieName}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
