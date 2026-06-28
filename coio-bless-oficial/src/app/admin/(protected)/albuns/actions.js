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

export async function getAlbumPorId(id) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("albuns").select("*").eq("id", id).single();

  if (error) {
    console.error("Erro ao buscar álbum:", error.message);
    return null;
  }

  return data;
}

function gerarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function criarAlbum(formData) {
  const supabase = createSupabaseAdminClient();

  const titulo = formData.get("titulo");
  const slug = gerarSlug(titulo);

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

export async function atualizarAlbum(id, formData) {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase
    .from("albuns")
    .update({
      titulo: formData.get("titulo"),
      tipo: formData.get("tipo"),
      ano_lancamento: Number(formData.get("ano_lancamento")) || null,
      descricao: formData.get("descricao"),
      capa_url: formData.get("capa_url"),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/albuns");
  revalidatePath("/discografia");
  return { success: true };
}

export async function excluirAlbum(id) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("albuns").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/albuns");
  revalidatePath("/discografia");
  return { success: true };
}