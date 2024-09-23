import supabase from "../../SupabaseConfig";


export const deleteAnnouncement = async (id) => {
    try {
        const { error } = await supabase
        .from("comunicados")
        .delete()
        .eq("id", id)
    }catch(err){
        console.log(err);
    }
}