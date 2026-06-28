import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlbumCard } from "@/components/shared/album-card";
import { TrackRow } from "@/components/shared/track-row";
import { getArtista } from "@/lib/queries/artista";
import { getAllAlbuns } from "@/lib/queries/albuns";
import { getAllMusicas } from "@/lib/queries/musicas";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [artist, albums, tracks] = await Promise.all([
    getArtista(),
    getAllAlbuns(),
    getAllMusicas(),
  ]);

  if (!artist) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-muted-foreground">
          Não foi possível carregar os dados do artista. Verifique a conexão com o Supabase.
        </p>
      </div>
    );
  }

  const featuredAlbums = albums.filter((a) => a.type === "album" || a.type === "ep");
  const popularTracks = [...tracks].sort((a, b) => b.plays - a.plays).slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <section className="relative mb-10 overflow-hidden rounded-2xl">
        <div className="relative h-64 w-full md:h-80">
          <Image
            src={artist.banner_url}
            alt={artist.nome}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="relative -mt-20 flex flex-col items-center gap-4 px-6 text-center md:flex-row md:items-end md:text-left">
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-background">
            <Image src={artist.avatar_url} alt={artist.nome} fill className="object-cover" />
          </div>
          <div className="pb-2">
            <h1 className="text-3xl font-bold md:text-4xl">{artist.nome}</h1>
            <p className="mt-2 max-w-xl text-muted-foreground">{artist.bio_curta}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {artist.total_reproducoes.toLocaleString("pt-BR")} reproduções totais
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Álbuns e EPs</h2>
          <Button variant="link" asChild>
            <Link href="/discografia">Ver tudo</Link>
          </Button>
        </div>
        {featuredAlbums.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum álbum cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {featuredAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Faixas Populares</h2>
        {popularTracks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma música cadastrada ainda.</p>
        ) : (
          <div className="flex flex-col">
            {popularTracks.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i + 1} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}