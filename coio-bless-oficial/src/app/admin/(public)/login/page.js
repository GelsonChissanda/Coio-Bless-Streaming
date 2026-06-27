import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false }, // não queremos essa página indexada no Google
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold">Coio Bless Admin</h1>
        <LoginForm />
      </div>
    </div>
  );
}