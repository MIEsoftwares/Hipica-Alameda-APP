import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../SupabaseConfig"

export async function checkSession() {
    const sessionString = await AsyncStorage.getItem('supabase_session');
  
    if (sessionString) {
      const session = JSON.parse(sessionString);
      
      await supabase.auth.setSession(session);
  
      const { error } = await supabase.auth.getUser();
  
      if (error) {
        await AsyncStorage.removeItem('supabase_session');

      }
    }
    return sessionString;
  }