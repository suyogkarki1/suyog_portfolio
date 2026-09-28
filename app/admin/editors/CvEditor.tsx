"use client";

import { useState } from "react";
import { fileToBase64 } from "@/app/admin/shared";
import styles from "@/styles/Admin.module.css";

export default function CvEditor() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function onUpload(file: File) {
    if (file.type !== "application/pdf") {
      setStatus("error");
      setError("Please upload a PDF file.");
      return;
    }
    setStatus("saving");
    setError("");
    try {
      const base64 = await fileToBase64(file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: "cv", base64 }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed.");
      setStatus("saved");
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Upload failed.");
    }
  }

  return (
    <div>
      <h1 className={styles.sectionTitle}>CV File</h1>
      <p className={styles.sectionHint}>
        Replaces the PDF linked from the "My Resume" button on the homepage. The link itself never changes — only the file behind it.
      </p>
      <div className={styles.card}>
        <div className={styles.field}>
          <label>Upload new CV (PDF)</label>
          <input type="file" accept="application/pdf" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
        </div>
        {status === "saving" && <span className={styles.sectionHint}>Uploading…</span>}
        {status === "saved" && <span className={styles.saved}>Uploaded — the live site will update automatically in ~1–2 min.</span>}
        {status === "error" && <span className={styles.errorMsg}>{error}</span>}
      </div>
    </div>
  );
}
