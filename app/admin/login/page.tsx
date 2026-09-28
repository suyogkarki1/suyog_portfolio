"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/styles/Admin.module.css";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Login failed.");
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginCard} onSubmit={onSubmit}>
        <h1>Admin login</h1>
        <div className={styles.field}>
          <label>Password</label>
          <input
            className={styles.input}
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <button className={styles.saveBtn} style={{ width: "100%", marginTop: "0.5rem" }} disabled={loading}>
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
