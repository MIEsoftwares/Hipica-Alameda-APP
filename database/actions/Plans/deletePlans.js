import supabase from "../../SupabaseConfig";

export const deletePlans = async (id) => {
    try {
        const { error } = await supabase
        .from("planosaula")
        .delete()
        .eq("id", id)
    }catch(err){
        console.log(err);
    }
}