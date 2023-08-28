import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default App = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);


  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimer(0);
    setIsRunning(false);
    setLaps([]);
  };

  const lapTimer = () => {
    if (isRunning) {
      const lapTime = timer - laps.reduce((total, lap) => total + lap.lapTime, 0);
      const totalTime = laps.length > 0 ? laps[0].totalTime + lapTime : lapTime;
      const lapNumber = laps.length + 1;
      const newLap = {
        lapNumber,
        lapTime,
        totalTime
      };
      setLaps(prevLaps => [newLap, ...prevLaps]);
    }
  };

  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((timeInSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const renderLapItem = ({ item }) => (
    <View style={[styles.lapRow, themeStyles.lapRow]}>
      <Text style={[styles.lapText, themeStyles.lapText]}>{item.lapNumber}</Text>
      <Text style={[styles.lapText, themeStyles.lapText]}>{formatTime(item.lapTime)}</Text>
      <Text style={[styles.lapText, themeStyles.lapText]}>{formatTime(item.totalTime)}</Text>
    </View>
  );

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const themeStyles = isDarkTheme ? darkStyles : lightStyles;


  return (
    <View style={[styles.container, themeStyles.container]}>
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={[styles.themeButtonText, themeStyles.themeButtonText]}>
            {isDarkTheme ? 'Light ⚪' : 'Dark ⚫'}
          </Text>
        </TouchableOpacity>
      <View style={[styles.upper, themeStyles.upper]}>
        <Text style={[styles.timer, themeStyles.timer]}>{formatTime(timer)}</Text>  
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              isRunning ? styles.stopButton : styles.startButton,
            ]}
            onPress={isRunning ? stopTimer : startTimer}>
            <Text style={styles.buttonText}>
              {isRunning ? 'Stop' : 'Start'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.lapButton]}
            onPress={lapTimer}
            disabled={!isRunning}>
            <Text style={styles.buttonText}>Lap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetTimer}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lapsContainer}>
      <View style={styles.tableHeader}>
          <Text style={[styles.headerText, themeStyles.headerText]}>Lap</Text>
          <Text style={[styles.headerText, themeStyles.headerText]}>Lap Time</Text>
          <Text style={[styles.headerText, themeStyles.headerText]}>Total Time</Text>
        </View>
        <FlatList
          data={laps}
          renderItem={renderLapItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.lapsContentContainer}
        />
      </View>
    </View>
  );
};


const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  timer: {
    color: '#FFFFFF',
  },
  headerText: {
    color:'#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#FF2',
  },
  lapText: {
    fontSize: 16,
    color: 'white',
    paddingVertical: 10,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBlockColor: '#FF3'
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  timer: {
    color: '#000000',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  lapText: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 10,
  },
  lapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBlockColor: 'gray'
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 60,
    margin: 14
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  startButton: {
    backgroundColor: '#4caf50',
  },
  stopButton: {
    backgroundColor: 'orange',
  },
  lapButton: {
    backgroundColor: '#2196f3',
  },
  resetButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lapsContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  lapsContentContainer: {
    paddingBottom: 20,
  },
  themeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
