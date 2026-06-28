"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { criarMusica, atualizarMusica } from "@/app/admin/(protected)/musicas/actions";
import { Button } from "@/components/ui/button";

function segundosParaTempo(segundos) {
  if (!segundos) return "";
  const minutos = Math.floor(segundos / 60);
  const segs = segundos % 60;
  return `${minutos}:${segs.toString().padStart(2, "0")}`;
}

export function MusicaForm({ musica, albuns }) {
  const router = useRouter();
  const isEditing = Boolean(musica);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setFeedback(null);

    const result = isEditing
      ? await atualizarMusica(musica.id, formData)
      : await criarMusica(formData);

    if (result?.error) {
      setFeedback({ type: "error", message: result.error });
      setIsSubmitting(false);
      return;
    }

    if (isEditing) {
      router.push("/admin/musicas");
      router.refresh();
    } else {
      setFeedback({ type: "success", message: "Música enviada com sucesso!" });
      formRef.current?.reset();
      setIsSubmitting(false);
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label htmlFor="titulo" className="mb-1 block text-sm font-medium">
          Título
        </label>
        <input
          id="titulo"
          name="titulo"
          required
          defaultValue={musica?.titulo}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="album_id" className="mb-1 block text-sm font-medium">
          Álbum (opcional — vazio = faixa solta)
        </label>
        <select
          id="album_id"
          name="album_id"
          defaultValue={musica?.album_id ?? ""}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">— Faixa solta —</option>
          {albuns.map((album) => (
            <option key={album.id} value={album.id}>
              {album.titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="numero_faixa" className="mb-1 block text-sm font-medium">
            Nº da faixa
          </label>
          <input
            id="numero_faixa"
            name="numero_faixa"
            type="number"
            min="1"
            defaultValue={musica?.numero_faixa ?? ""}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="duracao" className="mb-1 block text-sm font-medium">
            Duração (mm:ss)
          </label>
          <input
            id="duracao"
            name="duracao"
            placeholder="3:45"
            defaultValue={segundosParaTempo(musica?.duracao_segundos)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <label htmlFor="data_lancamento" className="mb-1 block text-sm font-medium">
          Data de lançamento
        </label>
        <input
          id="data_lancamento"
          name="data_lancamento"
          type="date"
          defaultValue={musica?.data_lancamento ?? ""}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {isEditing && musica?.capa_url && (
        <p className="text-xs text-muted-foreground">
          Capa atual: <a href={musica.capa_url} target="_blank" className="underline">ver imagem</a> — envie um novo arquivo abaixo só se quiser trocar.
        </p>
      )}
      <div>
        <label htmlFor="capa_file" className="mb-1 block text-sm font-medium">
          {isEditing ? "Nova capa (opcional)" : "Capa da música (imagem)"}
        </label>
        <input
          id="capa_file"
          name="capa_file"
          type="file"
          accept="image/*"
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:text-sm"
        />
      </div>

      {isEditing && musica?.audio_url && (
        <p className="text-xs text-muted-foreground">
          Áudio atual: <audio controls src={musica.audio_url} className="mt-1 h-8 w-full" /> — envie um novo arquivo abaixo só se quiser trocar.
        </p>
      )}
      <div>
        <label htmlFor="audio_file" className="mb-1 block text-sm font-medium">
          {isEditing ? "Novo áudio (opcional)" : "Arquivo de áudio (mp3, wav)"}
        </label>
        <input
          id="audio_file"
          name="audio_file"
          type="file"
          accept="audio/*"
          required={!isEditing}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:text-sm"
        />
      </div>

      {feedback && (
        <p className={`text-sm ${feedback.type === "error" ? "text-destructive" : "text-green-500"}`}>
          {feedback.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : isEditing ? "Salvar Alterações" : "Enviar Música"}
      </Button>
    </form>
  );
}