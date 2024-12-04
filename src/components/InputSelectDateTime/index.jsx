import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Provider, TextInput as PaperTextInput, MD3LightTheme } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import styles from './styles';

export default function InputSelectDateTime ({ label, setDate2 }){
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState(undefined);
  const now = new Date();

  const onConfirmDate = (params) => {
    setVisibleDate(false);
    setDate(params.date);
    setVisibleTime(true);
  };

  const onConfirmTime = ({ hours, minutes }) => {
    if (date) {
      setVisibleTime(false);

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      const formattedDateTime = `${formatDate(date)} - ${formattedTime}`;
      setTime({ hours, minutes });

      setDate2(
        new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hours,
          minutes
        )
      );
    }
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


  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: 'black',
      surface: 'white',
      onSurface: 'black',
      text: 'black',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      placeholder: 'gray', 
      disabled: 'gray',     
    },

    datePicker: {
      backgroundColor: 'white',
      textColor: 'black',
      accentColor: 'black',
      headerColor: 'black',
      headerTextColor: 'white',
    },
    timePicker: {
      backgroundColor: 'white',
      textColor: 'black',
      accentColor: 'black',
      headerColor: 'black',
      headerTextColor: 'white',
    }
  };

  return (
    <Provider theme={theme}>
      <View>
        <TouchableOpacity style={styles.container} onPress={() => setVisibleDate(true)}>
          <PaperTextInput
            value={formattedDateTime}
            style={styles.input}
            editable={false}
            placeholder={label ? label : "Selecione a data e hora do evento"}
            mode='outlined'
            underlineColor="#E0E0E0"
            activeUnderlineColor="#E0E0E0"
            outlineColor="#E0E0E0"
            activeOutlineColor="#E0E0E0"
            outlineStyle={{ borderRadius: 12 }}
          />
        </TouchableOpacity>

        <DatePickerModal
          mode="single"
          visible={visibleDate}
          onDismiss={() => setVisibleDate(false)}
          date={date}
          onConfirm={onConfirmDate}
          locale="pt"
          startYear={now.getFullYear()}
          endYear={now.getFullYear() + 1}
          validRange={{
            startDate: now,
          }}
        />

        <TimePickerModal
          visible={visibleTime}
          onDismiss={() => setVisibleTime(false)}
          onConfirm={onConfirmTime}
          hours={time?.hours}
          minutes={time?.minutes}
          locale="pt"
        />
      </View>
    </Provider>
  );
};
