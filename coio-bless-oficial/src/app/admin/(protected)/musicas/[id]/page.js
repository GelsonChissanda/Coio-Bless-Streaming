import { notFound } from "next/navigation";
import { getMusicaPorId, getAlbunsParaSelect } from "../actions";
import { MusicaForm } from "@/components/admin/musica-form";

export const metadata = {
  title: "Editar Música",
  robots: { index: false, follow: false },
};


export default async function EditarMusicaPage({ params }) {
  const { id } = await params;
  const [musica, albuns] = await Promise.all([
    getMusicaPorId(id),
    getAlbunsParaSelect(),
  ]);

  if (!musica) notFound();

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-2xl font-bold">Editar Música</h1>
      <MusicaForm musica={musica} albuns={albuns} />
    </div>
  );
}