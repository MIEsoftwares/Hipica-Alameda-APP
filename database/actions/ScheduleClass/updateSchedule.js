import { Alert } from "react-native";
import supabase from "../../SupabaseConfig";

export default async function updateSchedule(id, newData) {
    try {
      
      const { data, error } = await supabase
        .from('aulas')
        .update(newData) 
        .eq('id', id);
  
      if (error) {
        Alert.alert('Erro ao atualizar relatório:', error.message);
        return null;
      }
  
      Alert.alert('Relatório atualizado com sucesso');
      return true;
    } catch (err) {
      Alert.alert('Erro inesperado:', err);
      return false;
    }
};