"use client";

import { useState } from "react";
import styles from "@/styles/Admin.module.css";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export function useSectionSave(section: string) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState("");

  async function save(data: unknown) {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Save failed.");
      setStatus("saved");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Save failed.");
    }
  }

  return { save, status, error };
}

export function SaveBar({
  status,
  error,
  onSave,
}: {
  status: SaveStatus;
  error: string;
  onSave: () => void;
}) {
  return (
    <div className={styles.saveBar}>
      <button className={styles.saveBtn} onClick={onSave} disabled={status === "saving"}>
        {status === "saving" ? "Saving…" : "Save"}
      </button>
      {status === "saved" && (
        <span className={styles.saved}>Saved — the live site will update automatically in ~1–2 min.</span>
      )}
      {status === "error" && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
}

export async function fileToBase64(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function reorder<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const copy = arr.slice();
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export function CardHead({
  label,
  index,
  total,
  onUp,
  onDown,
  onRemove,
}: {
  label: string;
  index: number;
  total: number;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) {
  return (
    <div className={styles.cardHead}>
      <b>{label}</b>
      <div className={styles.iconGroup}>
        <button type="button" className={styles.iconBtn} onClick={onUp} disabled={index === 0} title="Move up">↑</button>
        <button type="button" className={styles.iconBtn} onClick={onDown} disabled={index === total - 1} title="Move down">↓</button>
        <button type="button" className={styles.iconBtn} onClick={onRemove} title="Remove">✕</button>
      </div>
    </div>
  );
}
