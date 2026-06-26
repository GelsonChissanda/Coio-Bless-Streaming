"use client";

import Image from "next/image";
import Link from "next/link";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/contexts/player-context";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    playNext,
    playPrevious,
    seek,
    setVolume,
  } = usePlayer();

  // se nada estiver tocando, não mostra o player
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          href={`/musica/${currentTrack.slug}`}
          className="flex min-w-0 flex-1 items-center gap-3 sm:flex-none sm:w-48"
        >
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image src={currentTrack.coverUrl} alt={currentTrack.title} fill className="object-cover" sizes="48px" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{currentTrack.title}</p>
            <p className="truncate text-xs text-muted-foreground">Coio Bless</p>
          </div>
        </Link>

        <div className="flex flex-1 flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={playPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-9 w-9 rounded-full" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={playNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden w-full max-w-md items-center gap-2 sm:flex">
            <span className="w-10 text-right text-xs text-muted-foreground">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration || 1}
              step={1}
              onValueChange={([value]) => seek(value)}
              className="flex-1"
            />
            <span className="w-10 text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="hidden w-32 items-center gap-2 sm:flex">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([value]) => setVolume(value / 100)}
          />
        </div>
      </div>
    </div>
  );
}