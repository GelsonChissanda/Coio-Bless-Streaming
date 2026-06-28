import Image from "next/image";
import { getMusicasAdmin, getAlbunsParaSelect } from "./actions";
import { MusicaForm } from "@/components/admin/musica-form";
import { MusicaActions } from "@/components/admin/musica-actions";

export const metadata = {
  title: "Músicas",
  robots: { index: false, follow: false },
};

function formatDuration(seconds) {
  if (!seconds) return "—";
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export default async function AdminMusicasPage() {
  const [musicas, albuns] = await Promise.all([
    getMusicasAdmin(),
    getAlbunsParaSelect(),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Músicas</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-2">
          {musicas.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhuma música cadastrada ainda.</p>
          )}

          {musicas.map((musica) => (
            <div
              key={musica.id}
              className="flex items-center gap-4 rounded-lg border border-border p-3"
            >
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                {musica.capa_url && (
                  <Image
                    src={musica.capa_url}
                    alt={musica.titulo}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{musica.titulo}</p>
                <p className="text-sm text-muted-foreground">
                  {musica.albuns?.titulo ?? "Faixa solta"} • {formatDuration(musica.duracao_segundos)}
                </p>
              </div>
              {musica.audio_url && (
                <audio controls className="h-8 w-40">
                  <source src={musica.audio_url} />
                </audio>
              )}
              <MusicaActions musicaId={musica.id} />
            </div>
          ))}
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Nova Música</h2>
          <MusicaForm albuns={albuns} />
        </div>
      </div>
    </div>
  );
}