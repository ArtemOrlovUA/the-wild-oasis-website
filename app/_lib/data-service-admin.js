'use client';

import { supabasePublic } from './supabaseAdmin';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export async function signInAdmin({ email, password }) {
  const { data, error } = await supabasePublic.auth.signInWithPassword({ email, password });
  if (error) {
    console.error(error.message);
    return { error };
  }
  console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data, error } = await supabasePublic.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function createCabin(cabin) {
  let imagePath;
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll('/', '');

  if (typeof cabin.image === 'string') {
    imagePath = cabin.image;
  } else {
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error } = await supabasePublic
    .from('cabins')
    .insert([{ ...cabin, image: imagePath }]);

  if (error) {
    console.error(error.message);
    throw new Error('An error occurred while creating or editing the cabin');
  }

  // Only upload the image if it's a new File object
  if (cabin.image instanceof File) {
    const { error: uploadError } = await supabasePublic.storage
      .from('cabin-images')
      .upload(imageName, cabin.image, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      await supabasePublic.from('cabins').delete().eq('id', data.id);
      console.error(uploadError.message);
      throw new Error('Image upload failed');
    }
  }

  return data;
}
