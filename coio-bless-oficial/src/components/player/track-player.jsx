"use client";

import Image from "next/image";
import { Play, Pause, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/contexts/player-context";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function TrackPlayer({ track, queue }) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    playTrack,
    togglePlay,
    seek,
  } = usePlayer();

  const isThisTrackActive = currentTrack?.id === track.id;

  function handlePlayClick() {
    if (isThisTrackActive) {
      togglePlay();
    } else {
      playTrack(track, queue);
    }
  }

  function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: track.title, url });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copiado!");
    }
  }

  // se a música ativa no player global for ESSA, usa o tempo real;
  // senão, mostra 0 (ainda não começou a tocar)
  const displayTime = isThisTrackActive ? currentTime : 0;
  const displayDuration = isThisTrackActive && duration ? duration : track.duration;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-lg">
        <Image src={track.coverUrl} alt={track.title} fill priority className="object-cover" />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{track.title}</h1>
        <p className="text-sm text-muted-foreground">
          {track.plays.toLocaleString("pt-BR")} reproduções •{" "}
          {track.downloads.toLocaleString("pt-BR")} downloads
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-10 text-right text-xs text-muted-foreground">
          {formatTime(displayTime)}
        </span>
        <Slider
          value={[displayTime]}
          max={displayDuration || 1}
          step={1}
          onValueChange={([value]) => isThisTrackActive && seek(value)}
          className="flex-1"
        />
        <span className="w-10 text-xs text-muted-foreground">
          {formatTime(displayDuration)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button size="icon" className="h-12 w-12 rounded-full" onClick={handlePlayClick}>
          {isThisTrackActive && isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>

        <Button variant="outline" className="gap-2" asChild>
          <a href={track.audioUrl || "#"} download>
            <Download className="h-4 w-4" />
            Baixar
          </a>
        </Button>

        <Button variant="ghost" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}