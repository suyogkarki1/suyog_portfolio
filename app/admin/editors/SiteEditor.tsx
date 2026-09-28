"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/data";
import { CardHead, SaveBar, useSectionSave } from "@/app/admin/shared";
import styles from "@/styles/Admin.module.css";

const BLANK_EDU = { degree: "", affiliation: "", gpa: "" };

export default function SiteEditor({ initial }: { initial: SiteContent }) {
  const [site, setSite] = useState<SiteContent>(initial);
  const { save, status, error } = useSectionSave("site");

  return (
    <div>
      <h1 className={styles.sectionTitle}>Hero &amp; Site Text</h1>
      <p className={styles.sectionHint}>
        Wrap any word in <code>**double asterisks**</code> to make it bold, same as the live site.
      </p>

      <div className={styles.card}>
        <div className={styles.cardHead}><b>Hero</b></div>
        <div className={styles.field}>
          <label>Eyebrow</label>
          <input className={styles.input} value={site.hero.eyebrow} onChange={(e) => setSite((s) => ({ ...s, hero: { ...s.hero, eyebrow: e.target.value } }))} />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>First name</label>
            <input className={styles.input} value={site.hero.nameFirst} onChange={(e) => setSite((s) => ({ ...s, hero: { ...s.hero, nameFirst: e.target.value } }))} />
          </div>
          <div className={styles.field}>
            <label>Last name</label>
            <input className={styles.input} value={site.hero.nameLast} onChange={(e) => setSite((s) => ({ ...s, hero: { ...s.hero, nameLast: e.target.value } }))} />
          </div>
        </div>
        <div className={styles.field}>
          <label>Subtitle</label>
          <textarea className={styles.textarea} value={site.hero.subtitle} onChange={(e) => setSite((s) => ({ ...s, hero: { ...s.hero, subtitle: e.target.value } }))} />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}><b>About — bio</b></div>
        <div className={styles.field}>
          <label>Paragraphs (one per line, blank line = new paragraph)</label>
          <textarea
            className={styles.textarea}
            style={{ minHeight: "10rem" }}
            value={site.about.bio.join("\n\n")}
            onChange={(e) => setSite((s) => ({ ...s, about: { ...s.about, bio: e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) } }))}
          />
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}><b>About — education</b></div>
        {site.about.education.map((ed, i) => (
          <div key={i} style={{ marginBottom: "0.75rem", paddingBottom: "0.75rem", borderBottom: i < site.about.education.length - 1 ? "1px solid var(--line)" : "none" }}>
            <CardHead
              label={ed.degree || "New entry"}
              index={i}
              total={site.about.education.length}
              onUp={() => setSite((s) => {
                if (i === 0) return s;
                const edu = s.about.education.slice();
                [edu[i - 1], edu[i]] = [edu[i], edu[i - 1]];
                return { ...s, about: { ...s.about, education: edu } };
              })}
              onDown={() => setSite((s) => {
                if (i === s.about.education.length - 1) return s;
                const edu = s.about.education.slice();
                [edu[i + 1], edu[i]] = [edu[i], edu[i + 1]];
                return { ...s, about: { ...s.about, education: edu } };
              })}
              onRemove={() => setSite((s) => ({ ...s, about: { ...s.about, education: s.about.education.filter((_, idx) => idx !== i) } }))}
            />
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Degree / school</label>
                <input className={styles.input} value={ed.degree} onChange={(e) => setSite((s) => {
                  const edu = s.about.education.slice(); edu[i] = { ...edu[i], degree: e.target.value };
                  return { ...s, about: { ...s.about, education: edu } };
                })} />
              </div>
              <div className={styles.field}>
                <label>GPA</label>
                <input className={styles.input} value={ed.gpa} onChange={(e) => setSite((s) => {
                  const edu = s.about.education.slice(); edu[i] = { ...edu[i], gpa: e.target.value };
                  return { ...s, about: { ...s.about, education: edu } };
                })} />
              </div>
            </div>
            <div className={styles.field}>
              <label>Affiliation / years</label>
              <input className={styles.input} value={ed.affiliation} onChange={(e) => setSite((s) => {
                const edu = s.about.education.slice(); edu[i] = { ...edu[i], affiliation: e.target.value };
                return { ...s, about: { ...s.about, education: edu } };
              })} />
            </div>
          </div>
        ))}
        <button
          className={styles.addBtn}
          onClick={() => setSite((s) => ({ ...s, about: { ...s.about, education: [...s.about.education, { ...BLANK_EDU }] } }))}
        >
          + Add education entry
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}><b>Contact &amp; footer</b></div>
        <div className={styles.field}>
          <label>Contact email</label>
          <input className={styles.input} value={site.contact.email} onChange={(e) => setSite((s) => ({ ...s, contact: { email: e.target.value } }))} />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Footer name</label>
            <input className={styles.input} value={site.footer.name} onChange={(e) => setSite((s) => ({ ...s, footer: { ...s.footer, name: e.target.value } }))} />
          </div>
          <div className={styles.field}>
            <label>Footer location</label>
            <input className={styles.input} value={site.footer.location} onChange={(e) => setSite((s) => ({ ...s, footer: { ...s.footer, location: e.target.value } }))} />
          </div>
        </div>
        <div className={styles.field}>
          <label>Footer tagline</label>
          <input className={styles.input} value={site.footer.tagline} onChange={(e) => setSite((s) => ({ ...s, footer: { ...s.footer, tagline: e.target.value } }))} />
        </div>
      </div>

      <SaveBar status={status} error={error} onSave={() => save(site)} />
    </div>
  );
}
