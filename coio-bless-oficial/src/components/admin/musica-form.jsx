"use client";

import { useRef, useState } from "react";
import { criarMusica } from "@/app/admin/(protected)/musicas/actions";
import { Button } from "@/components/ui/button";

export function MusicaForm({ albuns }) {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setFeedback(null);

    const result = await criarMusica(formData);

    if (result?.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      setFeedback({ type: "success", message: "Música enviada com sucesso!" });
      formRef.current?.reset();
    }

    setIsSubmitting(false);
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
          defaultValue=""
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
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="capa_file" className="mb-1 block text-sm font-medium">
          Capa da música (imagem)
        </label>
        <input
          id="capa_file"
          name="capa_file"
          type="file"
          accept="image/*"
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:text-sm"
        />
      </div>

      <div>
        <label htmlFor="audio_file" className="mb-1 block text-sm font-medium">
          Arquivo de áudio (mp3, wav)
        </label>
        <input
          id="audio_file"
          name="audio_file"
          type="file"
          accept="audio/*"
          required
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1 file:text-sm"
        />
      </div>

      {feedback && (
        <p className={`text-sm ${feedback.type === "error" ? "text-destructive" : "text-green-500"}`}>
          {feedback.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando... (pode levar alguns segundos)" : "Enviar Música"}
      </Button>
    </form>
  );
}