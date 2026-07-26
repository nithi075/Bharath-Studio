import { useEffect, useRef, useState } from "react";
import "./Admin.css";
import { apiGet, apiPostJSON, apiPostForm, apiDelete, toImageUrl } from "../../api/api";

const TABS = [
  { key: "Testimonials", label: "Testimonials" },
  { key: "Gallery", label: "Gallery" },
  { key: "Portfolio", label: "Portfolio" },
  { key: "Instagram", label: "Instagram" },
];

function AdminDashboard() {
  const [tab, setTab] = useState("Testimonials");

  return (
    <section className="admin">
      <div className="admin__inner">
        <aside className="admin__sidebar">
          <div className="admin__brand">
            <span className="admin__brand-mark">BS</span>
            <div>
              <p className="admin__brand-title">Studio Admin</p>
              <p className="admin__brand-subtitle">Content Manager</p>
            </div>
          </div>

          <nav className="admin__nav">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`admin__nav-item ${tab === t.key ? "is-active" : ""}`}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <p className="admin__hint">
            Anything added here automatically appears on the website, alongside the existing content.
          </p>
        </aside>

        <main className="admin__content">
          {tab === "Testimonials" && <TestimonialsPanel />}
          {tab === "Gallery" && <GalleryPanel />}
          {tab === "Portfolio" && <PortfolioPanel />}
          {tab === "Instagram" && <InstagramPanel />}
        </main>
      </div>
    </section>
  );
}

/* ---------------- Shared bits ---------------- */

function StatusBanner({ status }) {
  if (!status) return null;
  return <p className={`admin__status admin__status--${status.type}`}>{status.text}</p>;
}

function ChipSelect({ options, value, onChange, formatLabel }) {
  return (
    <div className="admin__chips">
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          className={`admin__chip ${value === opt ? "is-active" : ""}`}
          onClick={() => onChange(opt)}
        >
          {formatLabel ? formatLabel(opt) : opt || "None"}
        </button>
      ))}
    </div>
  );
}

function ImageDropInput({ file, onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (f) => {
    if (f && f.type.startsWith("image/")) onChange(f);
  };

  return (
    <div
      className={`admin__dropzone ${dragOver ? "is-dragover" : ""} ${preview ? "has-preview" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        pick(e.dataTransfer.files?.[0]);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => pick(e.target.files?.[0])}
      />

      {preview ? (
        <img src={preview} alt="Preview" className="admin__dropzone-preview" />
      ) : (
        <div className="admin__dropzone-empty">
          <span className="admin__dropzone-icon">+</span>
          <p>Choose a photo, or drag and drop it here</p>
        </div>
      )}
    </div>
  );
}

function EmptyState({ text }) {
  return <p className="admin__empty">{text}</p>;
}

/* ---------------- Testimonials ---------------- */

function TestimonialsPanel() {
  const [items, setItems] = useState([]);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [venue, setVenue] = useState("");
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => apiGet("/api/testimonials").then(setItems).catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!quote.trim() || !name.trim()) {
      setStatus({ type: "error", text: "Quote and name are required" });
      return;
    }
    setSaving(true);
    try {
      await apiPostJSON("/api/testimonials", { quote, name, venue });
      setQuote("");
      setName("");
      setVenue("");
      setStatus({ type: "success", text: "Testimonial added successfully" });
      load();
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    await apiDelete(`/api/testimonials/${id}`);
    load();
  };

  return (
    <div className="admin__layout">
      <form className="admin__form-card" onSubmit={handleAdd}>
        <h2 className="admin__form-title">New Testimonial</h2>

        <label className="admin__field">
          <span>Quote</span>
          <textarea value={quote} onChange={(e) => setQuote(e.target.value)} rows={4} placeholder="What the client said..." />
        </label>

        <label className="admin__field">
          <span>Client Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Mr. & Mrs. ..." />
        </label>

        <label className="admin__field">
          <span>Venue (optional)</span>
          <input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Tirunelveli" />
        </label>

        <button type="submit" className="admin__btn" disabled={saving}>
          {saving ? "Adding..." : "Add Testimonial"}
        </button>

        <StatusBanner status={status} />
      </form>

      <div className="admin__list-panel">
        <h2 className="admin__form-title">Added by you ({items.length})</h2>

        {items.length === 0 ? (
          <EmptyState text="No testimonials added from the admin panel yet." />
        ) : (
          <div className="admin__list">
            {items.map((t) => (
              <div className="admin__card" key={t._id}>
                <p className="admin__card-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="admin__card-footer">
                  <p className="admin__card-meta">{t.name}{t.venue ? ` — ${t.venue}` : ""}</p>
                  <button className="admin__delete-link" onClick={() => handleDelete(t._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Gallery (home strip + full /gallery page) ---------------- */

const GALLERY_CATEGORIES = ["", "wedding", "prewedding", "model", "portrait", "maternity", "bride"];

function GalleryPanel() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [showOnHome, setShowOnHome] = useState(false);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => apiGet("/api/gallery").then(setItems).catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: "error", text: "Please select a photo" });
      return;
    }
    setSaving(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("showOnHome", showOnHome);

    try {
      await apiPostForm("/api/gallery", formData);
      setFile(null);
      setType("");
      setShowOnHome(false);
      setStatus({ type: "success", text: "Photo added successfully" });
      load();
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;
    await apiDelete(`/api/gallery/${id}`);
    load();
  };

  return (
    <div className="admin__layout">
      <form className="admin__form-card" onSubmit={handleAdd}>
        <h2 className="admin__form-title">New Gallery Photo</h2>

        <ImageDropInput file={file} onChange={setFile} />

        <label className="admin__field">
          <span>Category</span>
          <ChipSelect
            options={GALLERY_CATEGORIES}
            value={category}
            onChange={setCategory}
            formatLabel={(c) => (c === "" ? "Home only" : c.charAt(0).toUpperCase() + c.slice(1))}
          />
          <span className="admin__field-hint">"Home only" won't appear on the /gallery page — it will only show in the home page strip.</span>
        </label>

        <label className="admin__field">
          <span>Type (e.g. Candid, Studio, Outdoor)</span>
          <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Candid" />
        </label>

        <label className="admin__toggle">
          <input type="checkbox" checked={showOnHome} onChange={(e) => setShowOnHome(e.target.checked)} />
          <span>Also show in the home page "Featured Works" strip</span>
        </label>

        <button type="submit" className="admin__btn" disabled={saving}>
          {saving ? "Uploading..." : "Add Photo"}
        </button>

        <StatusBanner status={status} />
      </form>

      <div className="admin__list-panel">
        <h2 className="admin__form-title">Added by you ({items.length})</h2>

        {items.length === 0 ? (
          <EmptyState text="No photos added from the admin panel yet." />
        ) : (
          <div className="admin__grid">
            {items.map((img) => (
              <div className="admin__thumb" key={img._id}>
                <img src={toImageUrl(img.imageUrl)} alt={img.type} />
                <div className="admin__thumb-overlay">
                  <button className="admin__thumb-delete" onClick={() => handleDelete(img._id)}>Delete</button>
                </div>
                <p className="admin__thumb-caption">
                  {img.category || "home only"} {img.showOnHome && img.category ? "★" : ""}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Portfolio ---------------- */

const PORTFOLIO_CATEGORIES = ["Classic", "Garden", "Ballroom"];
const PORTFOLIO_SIZES = ["tall", "short", "wide"];

function PortfolioPanel() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Classic");
  const [couple, setCouple] = useState("");
  const [venue, setVenue] = useState("");
  const [size, setSize] = useState("short");
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => apiGet("/api/portfolio").then(setItems).catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: "error", text: "Please select a photo" });
      return;
    }
    setSaving(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);
    formData.append("couple", couple);
    formData.append("venue", venue);
    formData.append("size", size);

    try {
      await apiPostForm("/api/portfolio", formData);
      setFile(null);
      setCouple("");
      setVenue("");
      setStatus({ type: "success", text: "Photo added successfully" });
      load();
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;
    await apiDelete(`/api/portfolio/${id}`);
    load();
  };

  return (
    <div className="admin__layout">
      <form className="admin__form-card" onSubmit={handleAdd}>
        <h2 className="admin__form-title">New Portfolio Photo</h2>

        <ImageDropInput file={file} onChange={setFile} />

        <label className="admin__field">
          <span>Category</span>
          <ChipSelect options={PORTFOLIO_CATEGORIES} value={category} onChange={setCategory} />
        </label>

        <label className="admin__field">
          <span>Couple Names</span>
          <input value={couple} onChange={(e) => setCouple(e.target.value)} placeholder="Aravind & Keerthana" />
        </label>

        <label className="admin__field">
          <span>Venue</span>
          <input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Tirunelveli" />
        </label>

        <label className="admin__field">
          <span>Grid Size</span>
          <ChipSelect options={PORTFOLIO_SIZES} value={size} onChange={setSize} />
        </label>

        <button type="submit" className="admin__btn" disabled={saving}>
          {saving ? "Uploading..." : "Add Photo"}
        </button>

        <StatusBanner status={status} />
      </form>

      <div className="admin__list-panel">
        <h2 className="admin__form-title">Added by you ({items.length})</h2>

        {items.length === 0 ? (
          <EmptyState text="No photos added from the admin panel yet." />
        ) : (
          <div className="admin__grid">
            {items.map((img) => (
              <div className="admin__thumb" key={img._id}>
                <img src={toImageUrl(img.imageUrl)} alt={img.couple} />
                <div className="admin__thumb-overlay">
                  <button className="admin__thumb-delete" onClick={() => handleDelete(img._id)}>Delete</button>
                </div>
                <p className="admin__thumb-caption">{img.couple || img.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Instagram ---------------- */

function InstagramPanel() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => apiGet("/api/instagram").then(setItems).catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: "error", text: "Please select a photo" });
      return;
    }
    setSaving(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      await apiPostForm("/api/instagram", formData);
      setFile(null);
      setStatus({ type: "success", text: "Photo added successfully" });
      load();
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;
    await apiDelete(`/api/instagram/${id}`);
    load();
  };

  return (
    <div className="admin__layout">
      <form className="admin__form-card" onSubmit={handleAdd}>
        <h2 className="admin__form-title">New Instagram Photo</h2>

        <ImageDropInput file={file} onChange={setFile} />

        <button type="submit" className="admin__btn" disabled={saving}>
          {saving ? "Uploading..." : "Add Photo"}
        </button>

        <StatusBanner status={status} />
      </form>

      <div className="admin__list-panel">
        <h2 className="admin__form-title">Added by you ({items.length})</h2>

        {items.length === 0 ? (
          <EmptyState text="No photos added from the admin panel yet." />
        ) : (
          <div className="admin__grid">
            {items.map((post) => (
              <div className="admin__thumb" key={post._id}>
                <img src={toImageUrl(post.imageUrl)} alt="" />
                <div className="admin__thumb-overlay">
                  <button className="admin__thumb-delete" onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
