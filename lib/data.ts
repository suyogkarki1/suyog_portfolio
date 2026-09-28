import projectsJson from "@/content/projects.json";
import stackJson from "@/content/stack.json";
import valuesJson from "@/content/values.json";
import socialsJson from "@/content/socials.json";
import certsJson from "@/content/certs.json";
import siteJson from "@/content/site.json";

export interface Project {
  short: string;
  title: string;
  tags: string[];
  points: string[];
  link: string;
}

export const PROJECTS: Project[] = projectsJson;

export type StackIcon =
  | { kind: "img"; src: string }
  | { kind: "sql" }
  | { kind: "pbi" }
  | { kind: "xls" }
  | { kind: "cv" };

export interface StackItem {
  icon: StackIcon;
  name: string;
  pct: number;
}

export const STACK: StackItem[] = stackJson as StackItem[];

export interface ValueItem {
  t: string;
  line: [string, string, string]; // before, bold, after
  glyph: "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8" | "g9" | "g10";
}

export const VALUES: ValueItem[] = valuesJson as ValueItem[];

export interface Social {
  tip: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "instagram";
}

export const SOCIALS: Social[] = socialsJson as Social[];

export interface Cert {
  id: string;
  label: string;
  src: string;
  cap: string;
}

export const CERTS: Cert[] = certsJson;

export interface SiteContent {
  hero: {
    eyebrow: string;
    nameFirst: string;
    nameLast: string;
    subtitle: string;
  };
  about: {
    bio: string[];
    education: { degree: string; affiliation: string; gpa: string }[];
  };
  contact: {
    email: string;
  };
  footer: {
    name: string;
    location: string;
    tagline: string;
  };
}

export const SITE: SiteContent = siteJson;
