"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";
import { CardHead, SaveBar, reorder, useSectionSave } from "@/app/admin/shared";
import styles from "@/styles/Admin.module.css";

const BLANK: Project = { short: "", title: "", tags: [], points: [], link: "" };

export default function ProjectsEditor({ initial }: { initial: Project[] }) {
  const [items, setItems] = useState<Project[]>(initial);
  const { save, status, error } = useSectionSave("projects");

  function update(i: number, patch: Partial<Project>) {
    setItems((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }

  return (
    <div>
      <h1 className={styles.sectionTitle}>Projects</h1>
      <p className={styles.sectionHint}>
        Each project becomes one hexagon on the football — the ball resizes and re-spaces the hexagons automatically to fit however many you have.
      </p>

      {items.map((p, i) => (
        <div className={styles.card} key={i}>
          <CardHead
            label={p.title || "New project"}
            index={i}
            total={items.length}
            onUp={() => setItems((prev) => reorder(prev, i, i - 1))}
            onDown={() => setItems((prev) => reorder(prev, i, i + 1))}
            onRemove={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
          />
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Short label (on the hexagon)</label>
              <input className={styles.input} value={p.short} onChange={(e) => update(i, { short: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label>Full title</label>
              <input className={styles.input} value={p.title} onChange={(e) => update(i, { title: e.target.value })} />
            </div>
          </div>
          <div className={styles.field}>
            <label>Tags (comma-separated)</label>
            <input
              className={styles.input}
              value={p.tags.join(", ")}
              onChange={(e) => update(i, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
            />
          </div>
          <div className={styles.field}>
            <label>Points (one per line)</label>
            <textarea
              className={styles.textarea}
              value={p.points.join("\n")}
              onChange={(e) => update(i, { points: e.target.value.split("\n") })}
            />
          </div>
          <div className={styles.field}>
            <label>Link</label>
            <input className={styles.input} value={p.link} onChange={(e) => update(i, { link: e.target.value })} />
          </div>
        </div>
      ))}

      <button className={styles.addBtn} onClick={() => setItems((prev) => [...prev, { ...BLANK }])}>
        + Add project
      </button>

      <SaveBar status={status} error={error} onSave={() => save(items)} />
    </div>
  );
}
