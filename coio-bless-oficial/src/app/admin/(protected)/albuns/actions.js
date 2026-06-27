"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function getAlbunsAdmin() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("albuns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar álbuns:", error.message);
    return [];
  }

  return data;
}

export async function criarAlbum(formData) {
  const supabase = createSupabaseAdminClient();

  const titulo = formData.get("titulo");
  const slug = titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { error } = await supabase.from("albuns").insert({
    titulo,
    slug,
    tipo: formData.get("tipo"),
    ano_lancamento: Number(formData.get("ano_lancamento")) || null,
    descricao: formData.get("descricao"),
    capa_url: formData.get("capa_url"),
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/albuns");
  revalidatePath("/discografia");
  return { success: true };
}