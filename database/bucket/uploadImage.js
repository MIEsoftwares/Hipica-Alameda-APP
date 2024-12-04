import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import supabase from '../SupabaseConfig';

export default uploadImageToSupabase = async (imageUri, bucketName) => {
  try {

    const base64FileData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });


    const arrayBuffer = decode(base64FileData);


    const fileName = imageUri.split('/').pop();
    const fileType = `image/${fileName.split('.').pop()}`;


    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`${fileName}`, arrayBuffer, {
        contentType: fileType,
        upsert: false,
      });

    if (error) {
      return null;
    }

    return data.path;

  } catch (error) {
    return null;
  }
};
