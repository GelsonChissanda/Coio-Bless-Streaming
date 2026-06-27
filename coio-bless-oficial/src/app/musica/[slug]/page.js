import Image from "next/image";
import { notFound } from "next/navigation";
import { tracks, getTrackBySlug, getLyricsByTrackId } from "@/lib/mock-data";
import { TrackPlayer } from "@/components/player/track-player";
import { LyricsView } from "@/components/player/lyrics-view";
import { TrackRow } from "@/components/shared/track-row";

export function generateStaticParams() {
  return tracks.map((track) => ({ slug: track.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);

  if (!track) return { title: "Música não encontrada" };

  return {
    title: track.title,
    description: `Ouça e baixe "${track.title}" de Coio Bless.`,
    openGraph: {
      title: track.title,
      images: [track.coverUrl],
    },
  };
}

export default async function TrackPage({ params }) {
  const { slug } = await params;
  const track = getTrackBySlug(slug);

  if (!track) notFound();

  const lyricsLines = getLyricsByTrackId(track.id);
  const relatedTracks = tracks.filter((t) => t.id !== track.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <TrackPlayer track={track} queue={tracks} />
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

