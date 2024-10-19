import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { Link, router, Stack } from 'expo-router';
import LoadingScreen from '@/components/LoadingScreen';
import { fallbackImage, image185, searchMovies } from '@/api/movieDB';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [query, setQuery] = useState('');

  const handleSearch = async (query: string) => {
    setQuery(query);
    if (query.length > 3) {
      setLoading(true);

      searchMovies({
        query: query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      }).then((data) => {
        if (data && data.results) setSearchResults(data.results);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setSearchResults([]);
    }
  };

  return (
    <SafeAreaView className='bg-neutral-900 flex-1'>
      <Stack.Screen options={{ headerShown: false }} />
      <View className='mx-4 mb-3 mt-4 flex-row justify-between items-center border border-neutral-500 rounded-full'>
        <TextInput
          placeholder='Search...'
          placeholderTextColor={'lightgray'}
          className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
          onChangeText={(text) => handleSearch(text)}
        />
        <Link href='/' className='rounded-full p-2 m-1 bg-neutral-500'>
          <XMarkIcon size='22' color='white' />
        </Link>
      </View>

      {/* search result  */}
      {loading ? (
        <>
          <LoadingScreen />
        </>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className='space-y-2'
            >
              <Text className='text-white font-semibold ml-1 mb-2 mt-1'>
                Results ({searchResults.length})
              </Text>
              <View className='flex-row justify-between flex-wrap'>
                {searchResults &&
                  searchResults.map((item: any, index: number) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() =>
                          router.push({
                            pathname: '/(home)/movies',
                            params: { item: JSON.stringify(item?.id) },
                          })
                        }
                      >
                        <View className='space-y-3 mb-4'>
                          <Image
                            className='rounded-3xl'
                            style={{
                              width: width * 0.44,
                              height: height * 0.3,
                            }}
                            source={{
                              uri: image185(item?.poster_path || fallbackImage),
                            }}
                          />
                          <Text className='text-neutral-400 ml-1'>
                            {item?.title.length > 22
                              ? item?.title.slice(0, 22) + '...'
                              : item?.title}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
              </View>
            </ScrollView>
          ) : (
            <View className='flex-row justify-center items-center flex-1'>
              <Text className='text-white text-2xl font-bold -mt-20'>
                {query.length <= 0
                  ? 'Type to start search'
                  : 'No results found'}
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
