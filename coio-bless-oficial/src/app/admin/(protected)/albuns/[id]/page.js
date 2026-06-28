import { notFound } from "next/navigation";
import { getAlbumPorId } from "../actions";
import { AlbumForm } from "@/components/admin/album-form";

export const metadata = {
  title: "Editar Álbum",
  robots: { index: false, follow: false },
};

export default async function EditarAlbumPage({ params }) {
  const { id } = await params;
  const album = await getAlbumPorId(id);

  if (!album) notFound();

  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-2xl font-bold">Editar Álbum</h1>
      <AlbumForm album={album} />
    </div>
  );
}