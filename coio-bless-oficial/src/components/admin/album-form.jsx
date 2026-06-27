"use client";

import { useRef, useState } from "react";
import { criarAlbum } from "@/app/admin/(protected)/albuns/actions";
import { Button } from "@/components/ui/button";

export function AlbumForm() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setFeedback(null);

    const result = await criarAlbum(formData);

    if (result?.error) {
      setFeedback({ type: "error", message: result.error });
    } else {
      setFeedback({ type: "success", message: "Álbum criado com sucesso!" });
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
        <label htmlFor="tipo" className="mb-1 block text-sm font-medium">
          Tipo
        </label>
        <select
          id="tipo"
          name="tipo"
          required
          defaultValue="album"
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
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Por enquanto cole uma URL de imagem. Upload direto vem na próxima fase (Cloudinary).
        </p>
      </div>

      <div>
        <label htmlFor="descricao" className="mb-1 block text-sm font-medium">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows={3}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {feedback && (
        <p className={`text-sm ${feedback.type === "error" ? "text-destructive" : "text-green-500"}`}>
          {feedback.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Criar Álbum"}
      </Button>
    </form>
  );
}