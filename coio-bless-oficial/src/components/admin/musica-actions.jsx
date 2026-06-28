"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { excluirMusica } from "@/app/admin/(protected)/musicas/actions";

export function MusicaActions({ musicaId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmado = window.confirm(
      "Tem certeza que quer excluir esta música? Essa ação não pode ser desfeita."
    );
    if (!confirmado) return;

    setIsDeleting(true);
    const result = await excluirMusica(musicaId);
    setIsDeleting(false);

    if (result?.error) {
      alert("Erro ao excluir: " + result.error);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/musicas/${musicaId}`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isDeleting}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}