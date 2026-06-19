export const artist = {
  id: "1",
  name: "Coio Bless",
  bioShort:
    "Coio Bless é um artista que mistura sonoridades urbanas com letras pessoais e diretas.",
  avatarUrl: "https://i.pravatar.cc/400?img=12",
  bannerUrl: "https://picsum.photos/seed/banner/1600/600",
  totalPlays: 184320,
};

export const albums = [
  {
    id: "a1",
    slug: "primeira-fase",
    title: "Primeira Fase",
    type: "album", // album | ep | single
    coverUrl: "https://picsum.photos/seed/album1/500/500",
    releaseYear: 2024,
    description: "O álbum de estreia, gravado em apenas três meses.",
    totalPlays: 92000,
  },
  {
    id: "a2",
    slug: "noites-longas",
    title: "Noites Longas",
    type: "ep",
    coverUrl: "https://picsum.photos/seed/album2/500/500",
    releaseYear: 2025,
    description: "Um EP mais introspectivo, gravado durante a madrugada.",
    totalPlays: 41000,
  },
];

export const tracks = [
  {
    id: "t1",
    slug: "ainda-aqui",
    title: "Ainda Aqui",
    albumId: "a1",
    trackNumber: 1,
    duration: 198, // segundos
    coverUrl: "https://picsum.photos/seed/track1/500/500",
    audioUrl: "",
    releaseDate: "2024-03-10",
    plays: 53000,
    downloads: 1200,
  },
  {
    id: "t2",
    slug: "sem-medo",
    title: "Sem Medo",
    albumId: "a1",
    trackNumber: 2,
    duration: 215,
    coverUrl: "https://picsum.photos/seed/track2/500/500",
    audioUrl: "",
    releaseDate: "2024-03-10",
    plays: 39000,
    downloads: 980,
  },
  {
    id: "t3",
    slug: "madrugada",
    title: "Madrugada",
    albumId: "a2",
    trackNumber: 1,
    duration: 187,
    coverUrl: "https://picsum.photos/seed/track3/500/500",
    audioUrl: "",
    releaseDate: "2025-01-15",
    plays: 25000,
    downloads: 640,
  },
];

export function getAlbumBySlug(slug) {
  return albums.find((a) => a.slug === slug);
}

export function getTracksByAlbum(albumId) {
  return tracks.filter((t) => t.albumId === albumId);
}

export function getTrackBySlug(slug) {
  return tracks.find((t) => t.slug === slug);
}