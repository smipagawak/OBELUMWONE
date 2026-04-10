import { useEffect, useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import type { Tables } from "@/integrations/supabase/types";

type News = Tables<"news">;

const placeholderImages = [gallery1, gallery2, gallery3];

export default function NewsSection() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      setNews(data || []);
      setLoading(false);
    };
    fetchNews();
  }, []);

  // Show placeholder cards if no news yet
  const displayNews = news.length > 0 ? news : [
    {
      id: "1",
      title: "Pelayanan Rohani di Kelila Berjalan Dengan Baik",
      excerpt: "Kegiatan pelayanan rohani di daerah Kelila terus berlangsung dengan partisipasi aktif dari masyarakat.",
      created_at: new Date().toISOString(),
      image_url: null,
      published: true,
      content: null,
      author_id: null,
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Perkembangan Infrastruktur Daerah Kelila",
      excerpt: "Pembangunan infrastruktur di Distrik Kelila menunjukkan kemajuan yang positif untuk kesejahteraan masyarakat.",
      created_at: new Date().toISOString(),
      image_url: null,
      published: true,
      content: null,
      author_id: null,
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Kegiatan Sosial Masyarakat Mamberamo Tengah",
      excerpt: "Berbagai kegiatan sosial dilaksanakan untuk meningkatkan solidaritas dan kebersamaan masyarakat.",
      created_at: new Date().toISOString(),
      image_url: null,
      published: true,
      content: null,
      author_id: null,
      updated_at: new Date().toISOString(),
    },
  ];

  return (
    <section id="berita" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.2em] uppercase text-sm mb-2">Berita</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Berita Obelomwone</h2>
          <div className="w-20 h-1 gradient-gold mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayNews.map((item, i) => (
            <article key={item.id} className="bg-card rounded-2xl overflow-hidden shadow-card group hover:shadow-lg transition-shadow">
              <div className="overflow-hidden h-48">
                <img
                  src={item.image_url || placeholderImages[i % placeholderImages.length]}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                  <Calendar size={14} />
                  <span>{new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                <button className="flex items-center gap-2 text-secondary font-medium text-sm hover:gap-3 transition-all">
                  Baca Selengkapnya <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
