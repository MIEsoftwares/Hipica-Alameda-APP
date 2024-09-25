import supabase from "../SupabaseConfig";

export default getImage = (bucket, id) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(id);
    return data.publicUrl;
};