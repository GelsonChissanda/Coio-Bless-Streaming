import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/admin/logout-button";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/musicas", label: "Músicas" },
  { href: "/admin/albuns", label: "Álbuns" },
  { href: "/admin/biografia", label: "Biografia" },
];

export default async function AdminLayout({ children }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 flex-shrink-0 border-r border-border p-4 md:block">
        <p className="mb-6 px-2 text-lg font-bold">Coio Bless Admin</p>
        <nav className="flex flex-col gap-1">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-border pt-4">
          <p className="mb-2 truncate px-2 text-xs text-muted-foreground">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}