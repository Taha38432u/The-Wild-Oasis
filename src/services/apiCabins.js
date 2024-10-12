import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be loaded`);
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be deleted`);
  }

  return data;
}

export async function createEditCabin(cabin, id) {
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be deleted`);
  }

  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
  }
  return data;
}
