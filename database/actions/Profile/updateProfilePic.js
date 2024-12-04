import supabase from "../../SupabaseConfig";

export default updateProfileImage = async (id, newImageUrl) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ imagem: newImageUrl })
      .eq('id', id);
  
    if (error) {
      return error;
    }
  };