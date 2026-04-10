import heroBg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Pemandangan daerah Kelila, Papua"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-secondary font-medium tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in">
         GIDI Klasis Kambo — Wilayah Bogo — Distrik Kelila
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          OBELOMWONE
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Menyimpan dan mempublikasikan dokumen valid untuk memberikan informasi pelayanan
          dan perkembangan rohani di daerah Kelila, Kabupaten Mamberamo Tengah.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => document.querySelector("#tentang")?.scrollIntoView({ behavior: "smooth" })}
            className="gradient-gold text-primary-foreground px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            Tentang Kami
          </button>
          <button
            onClick={() => document.querySelector("#berita")?.scrollIntoView({ behavior: "smooth" })}
            className="border border-primary-foreground/30 text-primary-foreground px-8 py-3 rounded-md font-semibold hover:bg-primary-foreground/10 transition-colors"
          >
            Baca Berita
          </button>
        </div>
      </div>
    </section>
  );
}
