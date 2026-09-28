import { SITE } from "@/lib/data";
import { renderBold } from "@/lib/richText";
import { Socials } from "./Socials";
import styles from "@/styles/Contact.module.css";

export default function Contact() {
  const email = SITE.contact.email;
  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.big} data-reveal>
        Let&apos;s build <span className={styles.stroke}>something.</span>
      </h2>
      <a className={styles.mail} data-reveal href={`https://mail.google.com/mail/u/0/?fs=1&to=${email}&tf=cm`} target="_blank" rel="noopener">
        {email}
        <svg viewBox="0 0 24 24">
          <path d="M5 12h12m0 0l-5-5m5 5l-5 5" stroke="#E0F11F" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div data-reveal><Socials /></div>
    </section>
  );
}

const FOOTER_LINKS = [
  ["home", "Home"],
  ["about", "About"],
  ["stack", "Tech Stack"],
  ["projects", "Projects"],
  ["values", "Values"],
  ["contact", "Contact"],
] as const;

export function Footer({ goTo }: { goTo: (id: string) => void }) {
  const email = SITE.contact.email;
  return (
    <footer className={styles.footer}>
      <div className={styles.footTop}>
        <div className={styles.footBrand}>
          <a
            className={styles.footLogo}
            href="#home"
            onClick={(e) => { e.preventDefault(); goTo("home"); }}
          >
            SUY0G<em>.99</em>
          </a>
          <p>{renderBold(SITE.footer.tagline)}</p>
        </div>

        <div className={styles.footCol}>
          <h4>Navigate</h4>
          <ul>
            {FOOTER_LINKS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); goTo(id); }}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footCol}>
          <h4>Say hello</h4>
          <a className={styles.footMail} href={`https://mail.google.com/mail/u/0/?fs=1&to=${email}&tf=cm`} target="_blank" rel="noopener">
            {email}
          </a>
          <span className={styles.footLoc}>{SITE.footer.location}</span>
          <Socials />
        </div>
      </div>

      <div className={styles.footBottom}>
        <span>© {new Date().getFullYear()} <b>{SITE.footer.name}</b>. All rights reserved.</span>
        <button className={styles.toTop} onClick={() => goTo("home")}>
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
