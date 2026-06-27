import { supabase } from "@/lib/supabase";

export async function getLetrasByMusicaId(musicaId) {
  const { data, error } = await supabase
    .from("letras")
    .select("*")
    .eq("musica_id", musicaId)
    .order("ordem");

  if (error || !data) return [];

  return data.map((row) => ({
    time: Number(row.tempo_segundos),
    text: row.texto,
  }));
}