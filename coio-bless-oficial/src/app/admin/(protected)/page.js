import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Music2, Disc3, Play, Download } from "lucide-react";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

async function getStats() {
  const supabase = await createSupabaseServerClient();

  const [{ count: totalMusicas }, { count: totalAlbuns }, { data: artista }] =
    await Promise.all([
      supabase.from("musicas").select("*", { count: "exact", head: true }),
      supabase.from("albuns").select("*", { count: "exact", head: true }),
      supabase.from("artistas").select("total_reproducoes").limit(1).single(),
    ]);

  const { data: musicas } = await supabase.from("musicas").select("total_downloads");
  const totalDownloads = musicas?.reduce((sum, m) => sum + (m.total_downloads || 0), 0) ?? 0;

  return {
    totalMusicas: totalMusicas ?? 0,
    totalAlbuns: totalAlbuns ?? 0,
    totalReproducoes: artista?.total_reproducoes ?? 0,
    totalDownloads,
  };
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border p-5">
      <div className="rounded-lg bg-accent p-3">
        <Icon className="h-5 w-5 text-foreground" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold">{value.toLocaleString("pt-BR")}</p>
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Music2} label="Total de Músicas" value={stats.totalMusicas} />
        <StatCard icon={Disc3} label="Total de Álbuns" value={stats.totalAlbuns} />
        <StatCard icon={Play} label="Total de Reproduções" value={stats.totalReproducoes} />
        <StatCard icon={Download} label="Total de Downloads" value={stats.totalDownloads} />
      </div>
    </div>
  );
}