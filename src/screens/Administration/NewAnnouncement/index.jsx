import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import AnnouncementCard from '../../../components/AnnouncementCard';


// import { Container } from './styles';

const NewAnnouncement = () => {
  return( 
    <SafeAreaView style={{ width: "100%", height: "100%", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
      <AnnouncementCard/>
    </SafeAreaView>
  );
}

export default NewAnnouncement;