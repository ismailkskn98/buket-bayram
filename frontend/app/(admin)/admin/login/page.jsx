import {Button} from '@/components/ui/button';

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-6">
      <section className="w-full max-w-sm rounded-xl border border-[#eaeaea] bg-white p-8 shadow-sm">
        <p className="text-sm text-[#666]">Dr. Buket Bayram</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Yönetim paneli</h1>
        <p className="mt-3 text-sm leading-6 text-[#666]">
          Kimlik doğrulama ekranı backend auth modülüyle birlikte tamamlanacak.
        </p>
        <Button className="mt-6 w-full" disabled>
          Giriş altyapısı hazırlanıyor
        </Button>
      </section>
    </main>
  );
}
