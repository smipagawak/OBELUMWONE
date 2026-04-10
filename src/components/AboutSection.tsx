import aboutBg from "@/assets/about-bg.jpg";
import { Users, BookOpen, Heart, MapPin } from "lucide-react";

const features = [
  { icon: Users, title: "Komunitas", desc: "Melayani masyarakat di daerah Kelila dan sekitarnya" },
  { icon: BookOpen, title: "Pendidikan", desc: "Mendukung perkembangan pendidikan dan pengetahuan" },
  { icon: Heart, title: "Rohani", desc: "Pembinaan kerohanian dan pelayanan gereja" },
  { icon: MapPin, title: "Informasi", desc: "Menyebarkan informasi valid dan terpercaya" },
];

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.2em] uppercase text-sm mb-2">Tentang Kami</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Mengenal Obelomwone</h2>
          <div className="w-20 h-1 gradient-gold mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-card">
            <img src={aboutBg} alt="Masyarakat Kelila" className="w-full h-80 object-cover" loading="lazy" width={1280} height={720} />
          </div>

          <div>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              OBELOMWONE adalah platform digital yang berfungsi sebagai sarana penyimpanan dan
              publikasi dokumen-dokumen valid dari daerah Kelila, Klasis Kambo, Wilayah Bogor,
              Kabupaten Mamberamo Tengah, Distrik Kelila.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Melalui website ini, masyarakat dapat memperoleh informasi terkini tentang
              pelayanan yang sedang berlangsung serta perkembangan, baik secara rohani maupun
              aspek lainnya. Media ini juga berfungsi sebagai alat komunikasi yang cepat,
              efektif, dan mudah diakses.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-card">
                  <div className="gradient-gold p-2 rounded-lg">
                    <f.icon size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{f.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
