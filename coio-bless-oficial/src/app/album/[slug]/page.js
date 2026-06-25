import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { TrackRow } from "@/components/shared/track-row";
import { getAlbumBySlug, getTracksByAlbum, albums } from "@/lib/mock-data";

const typeLabels = {
  album: "Álbum",
  ep: "EP",
  single: "Single",
};

// Gera as páginas de álbum no build, em vez de gerar na hora que alguém acessa
export function generateStaticParams() {
  return albums.map((album) => ({ slug: album.slug }));
}

// Metadata dinâmica: cada álbum tem seu próprio título de SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);

  if (!album) return { title: "Álbum não encontrado" };

  return {
    title: album.title,
    description: album.description,
    openGraph: {
      title: album.title,
      description: album.description,
      images: [album.coverUrl],
    },
  };
}

export default async function AlbumPage({ params }) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);

  if (!album) {
    notFound();
  }

  const albumTracks = getTracksByAlbum(album.id);
  const totalPlays = albumTracks.reduce((sum, t) => sum + t.plays, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end">
        <div className="relative h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg shadow-lg sm:h-56 sm:w-56">
          <Image
            src={album.coverUrl}
            alt={album.title}
            fill
            priority
            className="object-cover"
            sizes="224px"
          />
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
        {albumTracks.map((track, i) => (
          <TrackRow key={track.id} track={track} index={i + 1} />
        ))}
      </div>
    </div>
  );
}