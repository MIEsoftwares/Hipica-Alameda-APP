import { Alert } from "react-native";
import supabase from "../../SupabaseConfig";

export default createSchedule = async (schedule) => {
    const { error } = await supabase
          .from("aulas")
          .insert([schedule]);
        if (error) {
          console.error("Erro ao criar aula:", error);
          Alert.alert("Erro", "Não foi possível criar a aula.");
          return false;
        } else {
          Alert.alert("Sucesso!", "Aula criada");
          return true;
        }
}