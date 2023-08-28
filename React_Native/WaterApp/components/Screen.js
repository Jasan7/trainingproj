import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadWaterIntake, addWater, resetWater} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen = () => {
  const dispatch = useDispatch();
  const waterIntake = useSelector(state => state.water.intake);
  const [progress, setProgress] = useState('');
  const [limit, setLimit] = useState('');
  const [prevProgress, setPrevProgress] = useState(0);
  const animatedValue = new Animated.Value(prevProgress);

  const handleAddWater = (amount) => {
    const remainingAmount = limit - waterIntake;
    const incrementAmount = Math.min(amount, remainingAmount);
    const newIntake = waterIntake + incrementAmount;
  
    if (incrementAmount > 0) {
      dispatch(addWater(incrementAmount));
      setPrevProgress(progress * 100);
      setProgress(newIntake / limit);
      AsyncStorage.setItem('waterIntake', newIntake.toString());
    }
  };
  

  const handleDeductWater = (amount) => {
    // Deduct the water intake by 100ml
    const decrementAmount = Math.min(amount, waterIntake);
    const newIntake = waterIntake - decrementAmount;

    if (decrementAmount > 0) {
      dispatch(addWater(-decrementAmount)); // Use negative value to deduct
      setPrevProgress(progress * 100);
      setProgress(newIntake / limit);
      AsyncStorage.setItem('waterIntake', newIntake.toString());
    }
  };

  const handleResetWater = () => {
    // Reset the water intake to 0
    dispatch(resetWater());
    setProgress('');
    // Save the updated water intake to AsyncStorage
    AsyncStorage.setItem('waterIntake', '');
  };

  const handleLimitChange = value => {
    const parsedValue = parseInt(value, 10);
    setLimit(isNaN(parsedValue) ? '' : parsedValue);
    if (waterIntake > parsedValue || isNaN(parsedValue)) {
      dispatch(resetWater());
      setPrevProgress(0);
      setProgress('');
      AsyncStorage.setItem('waterIntake', '');
    } else {
      setPrevProgress(progress * 100);
      setProgress(waterIntake / parsedValue);
    }
  };

  useEffect(() => {
    dispatch(loadWaterIntake());
    Animated.timing(animatedValue, {
      toValue: progress * 100,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedValue]);

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Set your limit</Text>
        <TextInput
          style={styles.input}
          value={limit.toString()}
          onChangeText={handleLimitChange}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.text}>Your Daily Water Intake: {waterIntake} ml</Text>

      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            progress < 0.3 && styles.lowProgress,
            progress >= 0.3 && progress < 0.7 && styles.mediumProgress,
            progress >= 0.7 && styles.highProgress,
            {width: animatedWidth},
          ]}
        />
      </View>
      <Button title="Add 100 ml" onPress={() => handleAddWater(100)} />
      <Button title="Deduct 100 ml" onPress={() => handleDeductWater(100)} />
      <Button title="Add 10 ml" onPress={() => handleAddWater(10)} />
      <Button title="Deduct 10 ml" onPress={() => handleDeductWater(10)} />
      
      <Button title="Reset" onPress={handleResetWater} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
  top: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3', // Default color
  },
  lowProgress: {
    backgroundColor: 'red',
  },
  mediumProgress: {
    backgroundColor: 'yellow',
  },
  highProgress: {
    backgroundColor: 'green',
  },
  input: {
    width: 70,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  progressContainer: {
    width: 200,
    height: 10,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
});

export default Screen;
