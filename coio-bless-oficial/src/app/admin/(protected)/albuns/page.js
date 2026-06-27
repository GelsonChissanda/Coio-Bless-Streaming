import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getAlbunsAdmin } from "./actions";
import { AlbumForm } from "@/components/admin/album-form";

export const metadata = {
  title: "Álbuns",
  robots: { index: false, follow: false },
};

const typeLabels = {
  album: "Álbum",
  ep: "EP",
  single: "Single",
};

export default async function AdminAlbunsPage() {
  const albuns = await getAlbunsAdmin();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Álbuns</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Lista */}
        <div className="flex flex-col gap-2">
          {albuns.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum álbum cadastrado ainda.</p>
          )}

          {albuns.map((album) => (
            <div
              key={album.id}
              className="flex items-center gap-4 rounded-lg border border-border p-3"
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                {album.capa_url && (
                  <Image src={album.capa_url} alt={album.titulo} fill className="object-cover" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{album.titulo}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[album.tipo] ?? album.tipo}
                  </Badge>
                  <span>{album.ano_lancamento}</span>
                  <span>•</span>
                  <span>/{album.slug}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formulário de criação */}
        <div>
          <h2 className="mb-3 text-lg font-semibold">Novo Álbum</h2>
          <AlbumForm />
        </div>
      </div>
    </div>
  );
}