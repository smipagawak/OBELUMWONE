import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="kontak" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-[0.2em] uppercase text-sm mb-2">Kontak</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h2>
          <div className="w-20 h-1 gradient-gold mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-8">
            <h3 className="font-serif text-2xl font-semibold">Informasi Kontak</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="gradient-gold p-2.5 rounded-lg">
                  <MapPin size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium mb-1">Alamat</p>
                  <p className="text-primary-foreground/70 text-sm">
                    Daerah Kelila, Klasis Kambo, Wilayah Bogo,<br />
                    Kabupaten Mamberamo Tengah, Distrik Kelila
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="gradient-gold p-2.5 rounded-lg">
                  <Phone size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium mb-1">Telepon</p>
                  <p className="text-primary-foreground/70 text-sm">+62 853 2342 3422</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="gradient-gold p-2.5 rounded-lg">
                  <Mail size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p className="text-primary-foreground/70 text-sm">obelomwone@gmail.com</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium mb-4">Ikuti Kami</p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:gradient-gold hover:border-transparent transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10">
            <h3 className="font-serif text-2xl font-semibold mb-6">Kirim Pesan</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary text-sm"
              />
              <textarea
                rows={4}
                placeholder="Pesan Anda"
                className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary text-sm resize-none"
              />
              <button className="w-full gradient-gold text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
