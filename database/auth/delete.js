import supabase from "../SupabaseConfig"

export async function deleteUser(id){
    const error = await supabase.auth.admin.deleteUser(id)

    return error
}