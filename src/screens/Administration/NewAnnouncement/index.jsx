import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputSelectTime from '../../../components/InputSelectTime';

// import { Container } from './styles';

const NewAnnouncement = () => {
  return( 
    <SafeAreaView>
        <InputSelectTime
            label="Data de início"
        />
    </SafeAreaView>
  );
}

export default NewAnnouncement;