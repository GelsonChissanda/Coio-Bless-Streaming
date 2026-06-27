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
  {
    id: "a3",
    slug: "luz-no-fim",
    title: "Luz no Fim",
    type: "single",
    coverUrl: "https://picsum.photos/seed/single1/500/500",
    releaseYear: 2025,
    description: "Single lançado para celebrar o aniversário de carreira.",
    totalPlays: 18500,
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

export function getLooseTracks() {
  return tracks.filter((t) => t.albumId === null);
}

export const lyrics = {
  t1: [
    { time: 0, text: "Ainda aqui, depois de tudo que passou" },
    { time: 4, text: "Olhei pro chão e o tempo não parou" },
    { time: 8, text: "Cada cicatriz é prova que eu cheguei" },
    { time: 12, text: "Mais forte do que era quando eu comecei" },
    { time: 17, text: "(Refrão)" },
    { time: 19, text: "Ainda aqui, ainda de pé" },
    { time: 23, text: "Mesmo quando tudo parecia ser difícil demais" },
    { time: 28, text: "Ainda aqui, mostrando quem eu sou" },
    { time: 33, text: "Nessa estrada eu nunca mais voltei atrás" },
  ],
  t2: [
    { time: 0, text: "Sem medo de cair, sem medo de tentar" },
    { time: 5, text: "O que for pra ser, vai ser, eu vou continuar" },
    { time: 10, text: "Cada passo meu já tem um propósito" },
    { time: 15, text: "Não preciso de aprovação, eu sigo o meu instinto" },
  ],
};

export function getLyricsByTrackId(trackId) {
  return lyrics[trackId] || [];
}