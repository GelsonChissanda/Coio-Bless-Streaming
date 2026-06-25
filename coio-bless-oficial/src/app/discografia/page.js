import { AlbumCard } from "@/components/shared/album-card";
import { TrackRow } from "@/components/shared/track-row";
import { albums, getLooseTracks } from "@/lib/mock-data";

export const metadata = {
  title: "Discografia",
  description: "Veja todos os álbuns, EPs, singles e faixas soltas.",
};

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function AlbumGrid({ items }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum item por aqui ainda.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}

export default function DiscografiaPage() {
  const fullAlbums = albums.filter((a) => a.type === "album");
  const eps = albums.filter((a) => a.type === "ep");
  const singles = albums.filter((a) => a.type === "single");
  const looseTracks = getLooseTracks();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Discografia</h1>

      <Section title="Álbuns">
        <AlbumGrid items={fullAlbums} />
      </Section>

      <Section title="EPs">
        <AlbumGrid items={eps} />
      </Section>

      <Section title="Singles">
        <AlbumGrid items={singles} />
      </Section>

      <Section title="Faixas Soltas">
        {looseTracks.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma faixa solta ainda.</p>
        ) : (
          <div className="flex flex-col">
            {looseTracks.map((track, i) => (
              <TrackRow key={track.id} track={track} index={i + 1} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}