import { View,  Dimensions } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');
export default function LoadingScreen() {
  return (
    <View
      style={{ height, width }}
      className='absolute flex-row justify-center items-center'
    >
      <View className='-mt-28'>
        <Progress.CircleSnail size={100} thickness={8} color='#eab308' />
      </View>
    </View>
  );
}
