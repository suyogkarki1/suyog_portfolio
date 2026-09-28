"use client";

import { useState } from "react";
import type { ValueItem } from "@/lib/data";
import { CardHead, SaveBar, reorder, useSectionSave } from "@/app/admin/shared";
import styles from "@/styles/Admin.module.css";

const GLYPHS = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8", "g9", "g10"] as const;
const BLANK: ValueItem = { t: "", line: ["", "", ""], glyph: "g1" };

export default function ValuesEditor({ initial }: { initial: ValueItem[] }) {
  const [items, setItems] = useState<ValueItem[]>(initial);
  const { save, status, error } = useSectionSave("values");

  function update(i: number, patch: Partial<ValueItem>) {
    setItems((prev) => prev.map((v, idx) => (idx === i ? { ...v, ...patch } : v)));
  }
  function updateLine(i: number, part: 0 | 1 | 2, text: string) {
    setItems((prev) =>
      prev.map((v, idx) => {
        if (idx !== i) return v;
        const line = [...v.line] as [string, string, string];
        line[part] = text;
        return { ...v, line };
      })
    );
  }

  return (
    <div>
      <h1 className={styles.sectionTitle}>Values</h1>
      <p className={styles.sectionHint}>
        The values scroll section. "Glyph" reuses one of the ten existing animated icons — adding a brand-new glyph shape still needs code.
      </p>

      {items.map((v, i) => (
        <div className={styles.card} key={i}>
          <CardHead
            label={v.t || "New value"}
            index={i}
            total={items.length}
            onUp={() => setItems((prev) => reorder(prev, i, i - 1))}
            onDown={() => setItems((prev) => reorder(prev, i, i + 1))}
            onRemove={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
          />
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Title</label>
              <input className={styles.input} value={v.t} onChange={(e) => update(i, { t: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label>Glyph</label>
              <select className={styles.select} value={v.glyph} onChange={(e) => update(i, { glyph: e.target.value as ValueItem["glyph"] })}>
                {GLYPHS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Line — before</label>
              <input className={styles.input} value={v.line[0]} onChange={(e) => updateLine(i, 0, e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Line — bold</label>
              <input className={styles.input} value={v.line[1]} onChange={(e) => updateLine(i, 1, e.target.value)} />
            </div>
            <div className={styles.field}>
              <label>Line — after</label>
              <input className={styles.input} value={v.line[2]} onChange={(e) => updateLine(i, 2, e.target.value)} />
            </div>
          </div>
        </div>
      ))}

      <button className={styles.addBtn} onClick={() => setItems((prev) => [...prev, { ...BLANK, line: [...BLANK.line] as [string, string, string] }])}>
        + Add value
      </button>

      <SaveBar status={status} error={error} onSave={() => save(items)} />
    </div>
  );
}
