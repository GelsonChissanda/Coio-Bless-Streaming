import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function TrackRow({ track, index }) {
  return (
    <Link
      href={`/musica/${track.slug}`}
      className="group flex items-center gap-4 rounded-md px-3 py-2 transition-colors hover:bg-accent"
    >
      <div className="flex w-6 items-center justify-center text-sm text-muted-foreground">
        <span className="group-hover:hidden">{index}</span>
        <Play className="hidden h-4 w-4 fill-current group-hover:block" />
      </div>

      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        <Image src={track.coverUrl} alt={track.title} fill className="object-cover" sizes="48px" />
      </div>

      <div className="flex-1 truncate">
        <p className="truncate font-medium">{track.title}</p>
        <p className="text-sm text-muted-foreground">
          {track.plays.toLocaleString("pt-BR")} reproduções
        </p>
      </div>

      <span className="text-sm text-muted-foreground">{formatDuration(track.duration)}</span>
    </Link>
  );
}