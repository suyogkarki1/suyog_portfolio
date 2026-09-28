"use client";

import { useState } from "react";
import type { StackItem, StackIcon } from "@/lib/data";
import { CardHead, SaveBar, fileToBase64, reorder, useSectionSave } from "@/app/admin/shared";
import styles from "@/styles/Admin.module.css";

const SPECIAL_KINDS = ["sql", "pbi", "xls", "cv"] as const;
const BLANK: StackItem = { icon: { kind: "sql" }, name: "", pct: 50 };

function iconSelectValue(icon: StackIcon): string {
  return icon.kind === "img" ? "img" : icon.kind;
}

export default function StackEditor({ initial }: { initial: StackItem[] }) {
  const [items, setItems] = useState<StackItem[]>(initial);
  const { save, status, error } = useSectionSave("stack");

  function update(i: number, patch: Partial<StackItem>) {
    setItems((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  async function onUploadIcon(i: number, file: File) {
    const base64 = await fileToBase64(file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder: "icons", filename: file.name, base64 }),
    });
    const json = await res.json();
    if (res.ok) update(i, { icon: { kind: "img", src: json.publicPath } });
  }

  return (
    <div>
      <h1 className={styles.sectionTitle}>Tech Stack</h1>
      <p className={styles.sectionHint}>Skill bars shown under "Tech Stack" — name, proficiency %, and an icon.</p>

      {items.map((s, i) => (
        <div className={styles.card} key={i}>
          <CardHead
            label={s.name || "New skill"}
            index={i}
            total={items.length}
            onUp={() => setItems((prev) => reorder(prev, i, i - 1))}
            onDown={() => setItems((prev) => reorder(prev, i, i + 1))}
            onRemove={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
          />
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Name</label>
              <input className={styles.input} value={s.name} onChange={(e) => update(i, { name: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label>Proficiency % ({s.pct})</label>
              <input
                type="range" min={0} max={100} className={styles.input}
                value={s.pct}
                onChange={(e) => update(i, { pct: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Icon</label>
              <select
                className={styles.select}
                value={iconSelectValue(s.icon)}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "img") update(i, { icon: { kind: "img", src: s.icon.kind === "img" ? s.icon.src : "" } });
                  else update(i, { icon: { kind: v as (typeof SPECIAL_KINDS)[number] } });
                }}
              >
                <option value="img">Custom image (upload below)</option>
                {SPECIAL_KINDS.map((k) => (
                  <option key={k} value={k}>{k.toUpperCase()}</option>
                ))}
              </select>
            </div>
            {s.icon.kind === "img" && (
              <div className={styles.field}>
                <label>Upload icon</label>
                <div className={styles.fileRow}>
                  {s.icon.src && <img className={styles.thumb} src={s.icon.src} alt="" />}
                  <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onUploadIcon(i, e.target.files[0])} />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <button className={styles.addBtn} onClick={() => setItems((prev) => [...prev, { ...BLANK }])}>
        + Add skill
      </button>

      <SaveBar status={status} error={error} onSave={() => save(items)} />
    </div>
  );
}
