import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
    .from('cabins')
    .select('*');

    if (error) {
        console.error(error)
        throw new Error("Cabins could not be loaded");
    }

    return data;
};


export async function createEditCabin(newCabin, id) {
const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

const imagePath = hasImagePath? newCabin.image: `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`

// https://xhpulchjrrlylegtsbpc.supabase.co/storage/v1/object/public/cabins-image/cabin-001.jpg
// 1. Create/Edit the cabin

let query = supabase.from("cabins");

//A) CREATE

if (!id) query = query.insert([{...newCabin, image: imagePath}])
    
//B) EDIT
if(id) query = query.update({...newCabin, image: imagePath}).eq("id", id);

console.log(newCabin.image)

const {data, error} = await query.select().single()

if (error) {
    console.error(error)
    throw new Error("Cabin could not be created");
}

//2. Upload the image
//if anything goes wrong check the code line below
if (hasImagePath) return data;

const {  error: storageError } = await supabase.storage.from('cabins-image').upload(imageName, newCabin.image);

if(storageError) {
    await supabase
    .from('cabins')
    .delete()
    .eq('id', data.id)

    console.error(error)
    throw new Error("Cabins image could not be uploaded");
}

return data;
}


export async function deleteCabin(id) {

    const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if (error) {
        console.error(error)
        throw new Error("Cabins could not be deleted");
    }

    return data;
};




