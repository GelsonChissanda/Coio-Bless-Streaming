import { notFound } from "next/navigation";
import { getAllMusicas, getMusicaBySlug } from "@/lib/queries/musicas";
import { getLetrasByMusicaId } from "@/lib/queries/letras";
import { TrackPlayer } from "@/components/player/track-player";
import { LyricsView } from "@/components/player/lyrics-view";
import { TrackRow } from "@/components/shared/track-row";

// Não usamos mais generateStaticParams com dados fixos do mock —
// como o conteúdo agora vem do banco e muda quando você cadastra
// músicas novas no admin, deixamos o Next.js renderizar essa rota
// dinamicamente (ele busca os dados a cada acesso).
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const track = await getMusicaBySlug(slug);

  if (!track) return { title: "Música não encontrada" };

  return {
    title: track.title,
    description: `Ouça e baixe "${track.title}" de Coio Bless.`,
    openGraph: {
      title: track.title,
      images: track.coverUrl ? [track.coverUrl] : [],
    },
  };
}

export default async function TrackPage({ params }) {
  const { slug } = await params;
  const track = await getMusicaBySlug(slug);

  if (!track) notFound();

  const [allTracks, lyricsLines] = await Promise.all([
    getAllMusicas(),
    getLetrasByMusicaId(track.id),
  ]);

  const relatedTracks = allTracks.filter((t) => t.id !== track.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <TrackPlayer track={track} queue={allTracks} />
        <LyricsView lines={lyricsLines} />
      </div>

      {relatedTracks.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Músicas Relacionadas</h2>
          <div className="flex flex-col">
            {relatedTracks.map((t, i) => (
              <TrackRow key={t.id} track={t} index={i + 1} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}