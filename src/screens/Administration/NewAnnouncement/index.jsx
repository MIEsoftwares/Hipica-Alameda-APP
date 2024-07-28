import { SafeAreaView } from 'react-native-safe-area-context';
import InputSelectDate from '../../../components/InputSelectDate';
import InputSelectDateTime from '../../../components/InputSelectDateTime';
import { View } from 'react-native';


// import { Container } from './styles';

const NewAnnouncement = () => {
  return( 
    <SafeAreaView style={{ width: "100%", height: "100%", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
          <InputSelectDate
            label="krlh"
          />
        <InputSelectDateTime
          label="krlh2"
        />
    </SafeAreaView>
  );
}

export default NewAnnouncement;