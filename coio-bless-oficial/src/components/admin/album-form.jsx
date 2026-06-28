"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { criarAlbum, atualizarAlbum } from "@/app/admin/(protected)/albuns/actions";
import { Button } from "@/components/ui/button";

export function AlbumForm({ album }) {
  const router = useRouter();
  const isEditing = Boolean(album);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setFeedback(null);

    const result = isEditing
      ? await atualizarAlbum(album.id, formData)
      : await criarAlbum(formData);

    if (result?.error) {
      setFeedback({ type: "error", message: result.error });
      setIsSubmitting(false);
      return;
    }

    if (isEditing) {
      router.push("/admin/albuns");
      router.refresh();
    } else {
      setFeedback({ type: "success", message: "Álbum criado com sucesso!" });
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
          defaultValue={album?.titulo}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="tipo" className="mb-1 block text-sm font-medium">
          Tipo
        </label>
        <select
          id="tipo"
          name="tipo"
          required
          defaultValue={album?.tipo ?? "album"}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="album">Álbum</option>
          <option value="ep">EP</option>
          <option value="single">Single</option>
        </select>
      </div>

      <div>
        <label htmlFor="ano_lancamento" className="mb-1 block text-sm font-medium">
          Ano de lançamento
        </label>
        <input
          id="ano_lancamento"
          name="ano_lancamento"
          type="number"
          min="1900"
          max="2100"
          defaultValue={album?.ano_lancamento ?? ""}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="capa_url" className="mb-1 block text-sm font-medium">
          URL da capa
        </label>
        <input
          id="capa_url"
          name="capa_url"
          type="url"
          placeholder="https://..."
          defaultValue={album?.capa_url ?? ""}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="descricao" className="mb-1 block text-sm font-medium">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={3}
          defaultValue={album?.descricao ?? ""}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {feedback && (
        <p className={`text-sm ${feedback.type === "error" ? "text-destructive" : "text-green-500"}`}>
          {feedback.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : isEditing ? "Salvar Alterações" : "Criar Álbum"}
      </Button>
    </form>
  );
}