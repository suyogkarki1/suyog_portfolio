import { Socials } from "./Socials";
import styles from "@/styles/Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.big} data-reveal>
        Let&apos;s build <span className={styles.stroke}>something.</span>
      </h2>
      <a className={styles.mail} data-reveal href="https://mail.google.com/mail/u/0/?fs=1&to=suyogkarki2@gmail.com&tf=cm" target="_blank" rel="noopener">
        suyogkarki2@gmail.com
        <svg viewBox="0 0 24 24">
          <path d="M5 12h12m0 0l-5-5m5 5l-5 5" stroke="#E0F11F" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <div data-reveal><Socials /></div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© 2026 <b>Suyog Karki</b> — Kathmandu, Nepal</span>
      <span>Trained on curiosity. <b>Validated on stubbornness.</b></span>
    </footer>
  );
}
