"use client";

import { useState } from "react";
import type { Social } from "@/lib/data";
import { CardHead, SaveBar, reorder, useSectionSave } from "@/app/admin/shared";
import styles from "@/styles/Admin.module.css";

const ICONS = ["github", "linkedin", "mail", "instagram"] as const;
const BLANK: Social = { tip: "", href: "", icon: "github" };

export default function SocialsEditor({ initial }: { initial: Social[] }) {
  const [items, setItems] = useState<Social[]>(initial);
  const { save, status, error } = useSectionSave("socials");

  function update(i: number, patch: Partial<Social>) {
    setItems((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  return (
    <div>
      <h1 className={styles.sectionTitle}>Socials</h1>
      <p className={styles.sectionHint}>Shown in the hero and contact section. Icon must be one of the built-in icon shapes.</p>

      {items.map((s, i) => (
        <div className={styles.card} key={i}>
          <CardHead
            label={s.tip || "New social"}
            index={i}
            total={items.length}
            onUp={() => setItems((prev) => reorder(prev, i, i - 1))}
            onDown={() => setItems((prev) => reorder(prev, i, i + 1))}
            onRemove={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
          />
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Label (tooltip)</label>
              <input className={styles.input} value={s.tip} onChange={(e) => update(i, { tip: e.target.value })} />
            </div>
            <div className={styles.field}>
              <label>Icon</label>
              <select className={styles.select} value={s.icon} onChange={(e) => update(i, { icon: e.target.value as Social["icon"] })}>
                {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label>Link (URL)</label>
            <input className={styles.input} value={s.href} onChange={(e) => update(i, { href: e.target.value })} />
          </div>
        </div>
      ))}

      <button className={styles.addBtn} onClick={() => setItems((prev) => [...prev, { ...BLANK }])}>
        + Add social
      </button>

      <SaveBar status={status} error={error} onSave={() => save(items)} />
    </div>
  );
}
