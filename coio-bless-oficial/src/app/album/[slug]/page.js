import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { TrackRow } from "@/components/shared/track-row";
import { getAlbumBySlug } from "@/lib/queries/albuns";
import { getMusicasByAlbumId } from "@/lib/queries/musicas";

export const dynamic = "force-dynamic";

const typeLabels = {
  album: "Álbum",
  ep: "EP",
  single: "Single",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) return { title: "Álbum não encontrado" };

  return {
    title: album.title,
    description: album.description,
    openGraph: {
      title: album.title,
      description: album.description,
      images: album.coverUrl ? [album.coverUrl] : [],
    },
  };
}

export default async function AlbumPage({ params }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  if (!album) notFound();

  const albumTracks = await getMusicasByAlbumId(album.id);
  const totalPlays = albumTracks.reduce((sum, t) => sum + t.plays, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end">
        <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg shadow-lg sm:h-56 sm:w-56">
          {album.coverUrl && (
            <Image
              src={album.coverUrl}
              alt={album.title}
              fill
              priority
              className="object-cover"
              sizes="224px"
            />
          )}
        </div>

        <div>
          <Badge variant="secondary" className="mb-2">
            {typeLabels[album.type] ?? album.type}
          </Badge>
          <h1 className="text-3xl font-bold md:text-4xl">{album.title}</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">{album.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {album.releaseYear} • {albumTracks.length}{" "}
            {albumTracks.length === 1 ? "faixa" : "faixas"} •{" "}
            {totalPlays.toLocaleString("pt-BR")} reproduções
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {albumTracks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma música cadastrada neste álbum ainda.</p>
        ) : (
          albumTracks.map((track, i) => <TrackRow key={track.id} track={track} index={i + 1} />)
        )}
      </div>
    </div>
  );
}