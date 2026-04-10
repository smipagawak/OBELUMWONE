import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import aboutBg from "@/assets/about-bg.jpg";

const images = [
  { src: gallery1, alt: "Kegiatan masyarakat Kelila", span: "col-span-1 row-span-1" },
  { src: gallery2, alt: "Pemandangan desa Kelila", span: "col-span-1 row-span-2" },
  { src: gallery3, alt: "Lembah hijau Kelila", span: "col-span-1 row-span-1" },
  { src: heroBg, alt: "Daerah Kelila dari udara", span: "col-span-2 row-span-1" },
  { src: aboutBg, alt: "Komunitas Kelila", span: "col-span-1 row-span-1" },
];

export default function GallerySection() {
  return (
    <section id="galeri" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.2em] uppercase text-sm mb-2">Galeri</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Galeri Obelomwone</h2>
          <div className="w-20 h-1 gradient-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] gap-4">
          {images.map((img, i) => (
            <div key={i} className={`${img.span} rounded-xl overflow-hidden group cursor-pointer`}>
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
