import { supabase } from "@/lib/supabase";

export async function getArtista() {
  const { data, error } = await supabase
    .from("artistas")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Erro ao buscar artista:", error.message);
    return null;
  }

  return data;
}