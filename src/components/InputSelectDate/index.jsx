import { useState } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import styles from "./styles";

const InputSelectDate = ({ label }) => {
  const [inputDate, setInputDate] = useState();
  const now = new Date();

  return (
    <DatePickerInput
        style={styles.input}
        locale="en" //Mudar para idioma selecionado quando tiver opção de idiomas(i18n)
        label={label}
        value={inputDate}
        onChange={(d) => setInputDate(d)}
        inputMode="start"
        startYear={now.getFullYear()}
        endYear={now.getFullYear() + 1}
    />
  );
};

export default InputSelectDate;
