import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const typeLabels = {
  album: "Álbum",
  ep: "EP",
  single: "Single",
};

export function AlbumCard({ album }) {
  return (
    <Link
      href={`/album/${album.slug}`}
      className="group flex flex-col gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
        <Image
          src={album.coverUrl}
          alt={album.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 220px"
        />
      </div>
      <div>
        <p className="truncate font-medium">{album.title}</p>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="secondary" className="text-xs">
            {typeLabels[album.type] ?? album.type}
          </Badge>
          <span>{album.releaseYear}</span>
        </div>
      </div>
    </Link>
  );
}