import { SOCIALS } from "@/lib/data";
import { SocialIcon } from "./Icons";

export function Socials() {
  return (
    <div className="socials">
      {SOCIALS.map((s) => (
        <a
          key={s.tip}
          className="soc"
          data-tip={s.tip}
          href={s.href}
          target={s.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener"
          aria-label={s.tip}
        >
          <SocialIcon name={s.icon} />
        </a>
      ))}
    </div>
  );
}
