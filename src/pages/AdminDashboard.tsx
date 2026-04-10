import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  LogOut, Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Newspaper, Home,
} from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type News = Tables<"news">;

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", image_url: "", published: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchNews();
  }, [isAdmin]);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Gagal memuat berita");
    else setNews(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ title: "", excerpt: "", content: "", image_url: "", published: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item: News) => {
    setForm({
      title: item.title,
      excerpt: item.excerpt || "",
      content: item.content || "",
      image_url: item.image_url || "",
      published: item.published,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editingId) {
      const { error } = await supabase
        .from("news")
        .update({ ...form, author_id: user!.id })
        .eq("id", editingId);
      if (error) toast.error("Gagal mengupdate berita");
      else toast.success("Berita diperbarui!");
    } else {
      const { error } = await supabase
        .from("news")
        .insert({ ...form, author_id: user!.id });
      if (error) toast.error("Gagal menambahkan berita");
      else toast.success("Berita ditambahkan!");
    }

    setSaving(false);
    resetForm();
    fetchNews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus berita ini?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) toast.error("Gagal menghapus berita");
    else {
      toast.success("Berita dihapus!");
      fetchNews();
    }
  };

  const togglePublish = async (item: News) => {
    const { error } = await supabase
      .from("news")
      .update({ published: !item.published })
      .eq("id", item.id);
    if (error) toast.error("Gagal mengubah status");
    else fetchNews();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold">Dashboard Admin</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
              <Home size={16} /> Beranda
            </button>
            <button onClick={signOut} className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <Newspaper className="text-secondary mb-2" size={24} />
            <p className="text-2xl font-bold text-foreground">{news.length}</p>
            <p className="text-muted-foreground text-sm">Total Berita</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <Eye className="text-primary mb-2" size={24} />
            <p className="text-2xl font-bold text-foreground">{news.filter((n) => n.published).length}</p>
            <p className="text-muted-foreground text-sm">Dipublikasikan</p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-card">
            <EyeOff className="text-muted-foreground mb-2" size={24} />
            <p className="text-2xl font-bold text-foreground">{news.filter((n) => !n.published).length}</p>
            <p className="text-muted-foreground text-sm">Draft</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-foreground">Kelola Berita</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="gradient-gold text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Plus size={16} /> Tambah Berita
            </button>
          )}
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-card mb-8 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {editingId ? "Edit Berita" : "Tambah Berita Baru"}
            </h3>
            <input
              placeholder="Judul Berita"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
            <input
              placeholder="Ringkasan / Excerpt"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
            <textarea
              placeholder="Konten Berita"
              rows={6}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none"
            />
            <input
              placeholder="URL Gambar (opsional)"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm"
            />
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded"
              />
              Langsung publikasikan
            </label>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="gradient-gold text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                {editingId ? "Perbarui" : "Simpan"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-lg text-sm border border-border text-foreground hover:bg-muted transition-colors">
                Batal
              </button>
            </div>
          </form>
        )}

        {/* News list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Newspaper size={48} className="mx-auto mb-4 opacity-50" />
            <p>Belum ada berita. Mulai tambahkan berita pertama!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div key={item.id} className="bg-card rounded-xl p-5 shadow-card flex flex-col sm:flex-row gap-4 items-start">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title} className="w-full sm:w-32 h-24 object-cover rounded-lg" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{item.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {item.published ? "Publik" : "Draft"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">{item.excerpt}</p>
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => togglePublish(item)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground" title={item.published ? "Sembunyikan" : "Publikasikan"}>
                    {item.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground" title="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-destructive" title="Hapus">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
