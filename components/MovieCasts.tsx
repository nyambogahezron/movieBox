import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'react-native';

export default function MovieCasts({ cast, navigation }) {
  const castName = 'John Doe';
  const characterName = 'John Doe';
  return (
    <View className='my-6'>
      <Text className='text-white text-lg mx-4 mb-5'>Movie Casts</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Cast', person)}
                className='mr-4 items-center'
                key={index}
              >
                <View className='overflow-hidden rounded-full h-20 w-20 border border-neutral-500'>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The-vampire-diaries-season-2-dvd_558x754.jpg/250px-The-vampire-diaries-season-2-dvd_558x754.jpg',
                    }}
                    className='rounded-full h-24 w-20'
                  />
                </View>
                <Text className='text-white text-xs mt-1'>
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + '...'
                    : characterName}
                </Text>
                <Text className='text-neutral-400 text-xs mt-1'>
                  {characterName.length > 10
                    ? castName.slice(0, 10) + '...'
                    : castName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
