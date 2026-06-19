import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Coio Bless. Todos os direitos reservados.</p>
        <nav className="flex gap-4">
          <Link href="/discografia" className="hover:text-foreground">Discografia</Link>
          <Link href="/biografia" className="hover:text-foreground">Biografia</Link>
        </nav>
      </div>
    </footer>
  );
}