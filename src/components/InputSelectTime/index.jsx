import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider, TextInput as PaperTextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import styles from './styles';

const InputSelectTime = ({ label }) => {
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState(undefined);

  const onConfirmDate = (params) => {
    setVisibleDate(false);
    setDate(params.date);
    setVisibleTime(true); // Open time picker after date is selected
  };

  const onConfirmTime = (params) => {
    setVisibleTime(false);
    setTime(params);
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    const hours = String(time.hours).padStart(2, '0');
    const minutes = String(time.minutes).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formattedDateTime = date && time 
    ? `${formatDate(date)} - ${formatTime(time)}`
    : '';

  return (
    <Provider>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisibleDate(true)}>
          <PaperTextInput
            label={label}
            value={formattedDateTime}
            style={styles.input}
            editable={false}
            placeholder={label}
          />
        </TouchableOpacity>

        <DatePickerModal
          mode="single"
          visible={visibleDate}
          onDismiss={() => setVisibleDate(false)}
          date={date}
          onConfirm={onConfirmDate}
          locale="pt" // Locale para português
        />

        <TimePickerModal
          visible={visibleTime}
          onDismiss={() => setVisibleTime(false)}
          onConfirm={onConfirmTime}
          hours={time?.hours}
          minutes={time?.minutes}
          locale="pt" // Locale para português
        />
      </View>
    </Provider>
  );
};

export default InputSelectTime;