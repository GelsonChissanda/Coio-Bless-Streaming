"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const currentTrack = currentIndex >= 0 ? queue[currentIndex] : null;

  const playNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 < queue.length ? prev + 1 : prev));
  }, [queue]);

  const playPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // guarda sempre a versão mais recente de playNext,
  // pra usar dentro do listener "ended" sem pegar uma versão "velha" da função
  const playNextRef = useRef(playNext);
  useEffect(() => {
    playNextRef.current = playNext;
  }, [playNext]);

  // cria o elemento <audio> UMA única vez, quando o app carrega
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => playNextRef.current();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  // toda vez que a faixa atual mudar, troca o áudio e dá play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.audioUrl || "";
    audio.currentTime = 0;
    audio.play().catch(() => {
      // navegador pode bloquear autoplay sem interação do usuário; ignoramos aqui
    });
    setIsPlaying(true);
  }, [currentTrack]);

  // sincroniza o volume sempre que ele mudar
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playTrack = useCallback((track, trackQueue = [track]) => {
    const index = trackQueue.findIndex((t) => t.id === track.id);
    setQueue(trackQueue);
    setCurrentIndex(index === -1 ? 0 : index);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying, currentTrack]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        isPlaying,
        currentTime,
        duration,
        volume,
        playTrack,
        togglePlay,
        playNext,
        playPrevious,
        seek,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer precisa ser usado dentro de <PlayerProvider>");
  }
  return context;
}