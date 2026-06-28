import { supabase } from "@/lib/supabase";

function mapAlbum(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.titulo,
    type: row.tipo,
    coverUrl: row.capa_url,
    releaseYear: row.ano_lancamento,
    description: row.descricao,
    totalPlays: row.total_reproducoes ?? 0,
  };
}

export async function getAllAlbuns() {
  const { data, error } = await supabase
    .from("albuns")
    .select("*")
    .order("ano_lancamento", { ascending: false });

  if (error) {
    console.error("Erro ao buscar álbuns:", error.message);
    return [];
  }

  return data.map(mapAlbum);
}

export async function getAlbumBySlug(slug) {
  const { data, error } = await supabase
    .from("albuns")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Erro ao buscar álbum:", error.message);
    return null;
  }

  return mapAlbum(data);
}