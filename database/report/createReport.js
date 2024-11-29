import { Alert } from "react-native";
import supabase from "../SupabaseConfig";

export default createReport = async (relatorioAtualizado) => {
    const { error } = await supabase
          .from("relatorios")
          .insert([relatorioAtualizado]);
        if (error) {
          console.error("Erro ao criar relatório:", error);
          Alert.alert("Erro", "Não foi possível criar o relatório.");
          return false;
        } else {
          Alert.alert("Sucesso", "Relatório criado com sucesso!");
          return true;
        }
}