import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function NapLogger() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');

  const handleCalculateDuration = () => {
    const formattedDuration = calculateDuration(startTime, endTime);
    setDuration(formattedDuration);
    // No need to add nap log here, it will be added in calculateDuration function
  };

  const calculateDuration = (start, end) => {
    const startTimeInMinutes = getTimeInMinutes(start);
    const endTimeInMinutes = getTimeInMinutes(end);
    let totalDurationInMinutes = endTimeInMinutes - startTimeInMinutes;

    // Adjust for crossing midnight
    if (endTimeInMinutes < startTimeInMinutes) {
      totalDurationInMinutes += 24 * 60; // Add 24 hours
    }

    const formattedDuration = formatDuration(totalDurationInMinutes);
    addNapLogToFirebase(startTime, endTime, formattedDuration); // Add nap log to Firebase
    return formattedDuration;
  };

  const getTimeInMinutes = (timeString) => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    return (period.toLowerCase() === 'pm' ? 12 : 0) * 60 + hours * 60 + minutes;
  };

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);
    return `${hours}hr ${minutes}min`;
  };

  const addNapLogToFirebase = async (start, end, duration) => {
    try {
      const napLogRef = collection(db, 'napLogs');
      const docRef = await addDoc(napLogRef, {
        startTime: start.toString(),
        endTime: end.toString(),
        duration: duration,
      });
      console.log('Nap log added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding nap log:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Start Time (e.g., 9:00 AM)"
        value={startTime}
        onChangeText={(text) => setStartTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="End Time (e.g., 1:30 PM)"
        value={endTime}
        onChangeText={(text) => setEndTime(text)}
      />
      <Button title="Calculate Duration" onPress={handleCalculateDuration} />
      <Text>Duration: {duration}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

