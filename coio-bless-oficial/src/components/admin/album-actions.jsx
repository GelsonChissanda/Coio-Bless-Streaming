"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { excluirAlbum } from "@/app/admin/(protected)/albuns/actions";

export function AlbumActions({ albumId }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmado = window.confirm(
      "Tem certeza que quer excluir este álbum? As músicas dele ficarão como faixas soltas."
    );
    if (!confirmado) return;

    setIsDeleting(true);
    const result = await excluirAlbum(albumId);
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
        <Link href={`/admin/albuns/${albumId}`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isDeleting}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}