import { Alert } from "react-native";
import supabase from "../SupabaseConfig";

export async function deleteReport(id) {
    try {
      const { data, error } = await supabase
        .from('relatorios')
        .delete()
        .eq('id', id);
  
      if (error) throw error;
  
      Alert.alert('Relatório deletado com sucesso');
    } catch (error) {
      Alert.alert('Erro ao deletar relatório:', error.message);
    }
  }