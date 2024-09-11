import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider, TextInput as PaperTextInput } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import styles from './styles';

const InputSelectDateTime = ({ label, setDate2}) => {
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
          {hours}.hours,
          {minutes}.minutes,
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

  return (
    <Provider>
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
            outlineStyle={{borderRadius: 12}}
          />
        </TouchableOpacity>

        <DatePickerModal
          mode="single"
          visible={visibleDate}
          onDismiss={() => setVisibleDate(false)}
          date={date}
          onConfirm={onConfirmDate}
          locale="pt" //Mudar para idioma selecionado quando tiver opção de idiomas(i18n)
          startYear={now.getFullYear()}
          endYear={now.getFullYear() + 1}
        />

        <TimePickerModal
          visible={visibleTime}
          onDismiss={() => setVisibleTime(false)}
          onConfirm={onConfirmTime}
          hours={time?.hours}
          minutes={time?.minutes}
          locale="pt" //Mudar para idioma selecionado quando tiver opção de idiomas(i18n)
        />
      </View>
    </Provider>
  );
};

export default InputSelectDateTime;