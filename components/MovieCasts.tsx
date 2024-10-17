import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { router } from 'expo-router';
import { fallbackProfileImage, image185 } from '@/api/movieDB';

type MovieCastsProps = { cast: any };

export default function MovieCasts({ cast }: MovieCastsProps) {
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
          cast.map((person: any, index: number) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/(home)/cast',
                    params: { item: JSON.stringify(person) },
                  })
                }
                className='mr-4 items-center'
                key={index}
              >
                <View className='overflow-hidden rounded-full h-20 w-20 border border-neutral-500'>
                  <Image
                    source={{
                      uri:
                        image185(person.profile_path) || fallbackProfileImage,
                    }}
                    className='rounded-full h-24 w-20'
                  />
                </View>
                <Text className='text-white text-xs mt-1'>
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + '...'
                    : person?.character}
                </Text>
                <Text className='text-neutral-400 text-xs mt-1'>
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + '...'
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
