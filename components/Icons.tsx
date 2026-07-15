/** Shared inline SVG marks: social icons + brand-accurate custom stack icons. */

export function SocialIcon({ name }: { name: "github" | "linkedin" | "mail" | "instagram" }) {
  switch (name) {
    case "github":
      return (
        <svg viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.6-3.9-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 015.8 0C17.2 4.6 18.2 5 18.2 5c.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.5 11.5 0 007.8-10.9C23.5 5.7 18.3.5 12 .5z" /></svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9z" /></svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.2l-8 5-8-5V6l8 5 8-5v2.2z" /></svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7z" />
          <path fillRule="evenodd" d="M12 7.8a4.2 4.2 0 110 8.4 4.2 4.2 0 010-8.4zm0 2a2.2 2.2 0 100 4.4 2.2 2.2 0 000-4.4z" />
          <circle cx="17.1" cy="6.9" r="1.3" />
        </svg>
      );
  }
}

export function SqlIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <ellipse cx="12" cy="5" rx="8" ry="3" fill="none" stroke="#c7a500" strokeWidth="1.8" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" fill="none" stroke="#c7a500" strokeWidth="1.8" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" fill="none" stroke="#c7a500" strokeWidth="1.8" />
    </svg>
  );
}
export function PbiIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="12" width="4.5" height="9" rx="1" fill="#F2C811" />
      <rect x="9.75" y="7" width="4.5" height="14" rx="1" fill="#e0b000" />
      <rect x="16.5" y="2" width="4.5" height="19" rx="1" fill="#c79600" />
    </svg>
  );
}
export function XlsIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="18" rx="3" fill="#217346" />
      <path d="M8 8l3.2 4L8 16h2.6l1.9-2.6L14.4 16H17l-3.2-4L17 8h-2.6l-1.9 2.6L10.6 8z" fill="#fff" />
    </svg>
  );
}
