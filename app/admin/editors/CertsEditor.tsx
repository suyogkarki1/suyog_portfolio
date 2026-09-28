"use client";

import { useState } from "react";
import type { Cert } from "@/lib/data";
import { CardHead, SaveBar, fileToBase64, reorder, useSectionSave } from "@/app/admin/shared";
import styles from "@/styles/Admin.module.css";

const BLANK: Cert = { id: "", label: "", src: "", cap: "" };

export default function CertsEditor({ initial }: { initial: Cert[] }) {
  const [items, setItems] = useState<Cert[]>(initial);
  const { save, status, error } = useSectionSave("certs");

  function update(i: number, patch: Partial<Cert>) {
    setItems((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));
  }

  async function onUploadImage(i: number, file: File) {
    const base64 = await fileToBase64(file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder: "certs", filename: file.name, base64 }),
    });
    const json = await res.json();
    if (res.ok) update(i, { src: json.publicPath });
  }

  return (
    <div>
      <h1 className={styles.sectionTitle}>Certifications</h1>
      <p className={styles.sectionHint}>Shown as chips under About — click opens the image in a lightbox.</p>

      {items.map((c, i) => (
        <div className={styles.card} key={i}>
          <CardHead
            label={c.label || "New certification"}
            index={i}
            total={items.length}
            onUp={() => setItems((prev) => reorder(prev, i, i - 1))}
            onDown={() => setItems((prev) => reorder(prev, i, i + 1))}
            onRemove={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
          />
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Chip label</label>
              <input className={styles.input} value={c.label} onChange={(e) => update(i, { label: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label>Image caption</label>
              <input className={styles.input} value={c.cap} onChange={(e) => update(i, { cap: e.target.value })} />
            </div>
          </div>
          <div className={styles.field}>
            <label>Certificate image</label>
            <div className={styles.fileRow}>
              {c.src && <img className={styles.thumb} src={c.src} alt="" />}
              <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onUploadImage(i, e.target.files[0])} />
            </div>
          </div>
        </div>
      ))}

      <button
        className={styles.addBtn}
        onClick={() => setItems((prev) => [...prev, { ...BLANK, id: `cert-${Date.now()}` }])}
      >
        + Add certification
      </button>

      <SaveBar status={status} error={error} onSave={() => save(items)} />
    </div>
  );
}
