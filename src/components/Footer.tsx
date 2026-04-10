export default function Footer() {
  return (
    <footer className="bg-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="font-serif text-xl font-bold text-background mb-2">OBELOMWONE</p>
        <p className="text-background/50 text-sm">
          © {new Date().getFullYear()} Obelomwone — Kelila, Mamberamo Tengah. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
}
