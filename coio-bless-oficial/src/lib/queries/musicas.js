import { supabase } from "@/lib/supabase";

// Converte os nomes de coluna do banco (snake_case) pro formato que
// nossos componentes já esperam (camelCase) — assim não precisamos
// alterar TrackPlayer, MiniPlayer, TrackRow, etc.
function mapMusica(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.titulo,
    albumId: row.album_id,
    trackNumber: row.numero_faixa,
    duration: row.duracao_segundos,
    coverUrl: row.capa_url,
    audioUrl: row.audio_url,
    releaseDate: row.data_lancamento,
    plays: row.total_reproducoes ?? 0,
    downloads: row.total_downloads ?? 0,
  };
}

export async function getAllMusicas() {
  const { data, error } = await supabase.from("musicas").select("*");

  if (error) {
    console.error("Erro ao buscar músicas:", error.message);
    return [];
  }

  return data.map(mapMusica);
}

export async function getMusicaBySlug(slug) {
  const { data, error } = await supabase
    .from("musicas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Erro ao buscar música:", error.message);
    return null;
  }

  return mapMusica(data);
}