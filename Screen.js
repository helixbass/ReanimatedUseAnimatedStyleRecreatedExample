import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function AnimatedStyleUpdateExample(props) {
  const width = useSharedValue(10);

  const derivedValue = useDerivedValue(() => width.value + 10);
  const style = useAnimatedStyle(() => {
    return {
      width: derivedValue.value,
      // width: 10,
    };
  });
  const [, setCounter] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCounter((counterVal) => counterVal + 1);
    }, 1000);
  }, []);
  console.log('component re-render');
  useEffect(() => {
    console.log('width changed identity');
  }, [width]);
  useEffect(() => {
    console.log('derivedValue changed identity');
  }, [derivedValue]);
  useEffect(() => {
    console.log('style changed identity');
  }, [style]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[
          {width: 100, height: 80, backgroundColor: 'black', margin: 30},
          style,
        ]}
      />
    </View>
  );
}
