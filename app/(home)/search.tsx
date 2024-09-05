import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const [searchResults, setSearchResults] = useState([1, 2, 3, 4]);
  const navigation = useNavigation();
  const movieName = 'Movie Name';
  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <View className='mx-4 flex-row justify-between items-center border border-neutral-500 rounded-full'>
        <TextInput
          placeholder='Search Movie'
          placeholderTextColor={'lightgray'}
          className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className='rounded-full p-3 m-1 bg-neutral-500'
        >
          <XMarkIcon size='25' color='white' />
        </TouchableOpacity>
      </View>

      {/* search result  */}

      {searchResults.length > 0 ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className='space-y-3'
        >
          <Text className='text-white font-semibold ml-1'>
            Results ({searchResults.length})
          </Text>
          <View className='flex-row justify-between flex-wrap'>
            {searchResults.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movies', item)}
                >
                  <View className='space-y-3 mb-4'>
                    <Image
                      className='rounded-3xl'
                      style={{ width: width * 0.44, height: height * 0.3 }}
                      source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The-vampire-diaries-season-2-dvd_558x754.jpg/250px-The-vampire-diaries-season-2-dvd_558x754.jpg',
                      }}
                    />
                    <Text className='text-neutral-400 ml-1'>
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + '...'
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className='flex-row justify-center'>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/The-vampire-diaries-season-2-dvd_558x754.jpg/250px-The-vampire-diaries-season-2-dvd_558x754.jpg',
            }}
            className='h-96 w-96'
          />{' '}
        </View>
      )}
    </SafeAreaView>
  );
}
