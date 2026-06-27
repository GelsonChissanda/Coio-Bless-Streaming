"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { uploadBuffer } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function getMusicasAdmin() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("musicas")
    .select("*, albuns(titulo)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar músicas:", error.message);
    return [];
  }

  return data;
}

export async function getAlbunsParaSelect() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("albuns").select("id, titulo").order("titulo");
  return data ?? [];
}

function gerarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function tempoParaSegundos(texto) {
  // aceita formato "3:45" e converte pra 225 segundos
  const [min, seg] = texto.split(":").map(Number);
  return (min || 0) * 60 + (seg || 0);
}

export async function criarMusica(formData) {
  const supabase = createSupabaseAdminClient();

  const titulo = formData.get("titulo");
  const albumId = formData.get("album_id") || null;
  const duracaoTexto = formData.get("duracao");
  const audioFile = formData.get("audio_file");
  const capaFile = formData.get("capa_file");

  if (!audioFile || audioFile.size === 0) {
    return { error: "É necessário enviar um arquivo de áudio." };
  }

  try {
    // Upload do áudio
    const audioBuffer = Buffer.from(await audioFile.arrayBuffer());
    const audioResult = await uploadBuffer(audioBuffer, {
      resource_type: "video", // Cloudinary trata áudio dentro do tipo "video"
      folder: "coio-bless/musicas",
    });

    // Upload da capa (se enviada)
    let capaUrl = "";
    if (capaFile && capaFile.size > 0) {
      const capaBuffer = Buffer.from(await capaFile.arrayBuffer());
      const capaResult = await uploadBuffer(capaBuffer, {
        resource_type: "image",
        folder: "coio-bless/capas",
      });
      capaUrl = capaResult.secure_url;
    }

    const { error } = await supabase.from("musicas").insert({
      titulo,
      slug: gerarSlug(titulo),
      album_id: albumId,
      numero_faixa: Number(formData.get("numero_faixa")) || null,
      duracao_segundos: duracaoTexto ? tempoParaSegundos(duracaoTexto) : null,
      data_lancamento: formData.get("data_lancamento") || null,
      audio_url: audioResult.secure_url,
      capa_url: capaUrl,
    });

    if (error) return { error: error.message };

    revalidatePath("/admin/musicas");
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error("Erro no upload:", err);
    return { error: "Falha ao enviar arquivo para o Cloudinary." };
  }
}