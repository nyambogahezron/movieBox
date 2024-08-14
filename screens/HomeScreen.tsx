import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '@/theme';

const ios = Platform.OS == 'ios';

const HomeScreen = () => {
  return (
    <View className='flex-1 bg-neutral-800'>
      {/* search bar and logo  */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <View className='flex-row justify-between item-center mx-4'>
          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>M</Text>ovie
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size='30' strokeWidth={2} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <StatusBar barStyle='light-content' />
    </View>
  );
};

export default HomeScreen;
