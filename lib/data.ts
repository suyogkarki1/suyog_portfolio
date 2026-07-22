export interface Project {
  short: string;
  title: string;
  tags: string[];
  points: string[];
  link: string;
}

export const PROJECTS: Project[] = [
  {
    short: "Diabetes",
    title: "Diabetes Risk Detection — Gradient Boosting",
    tags: ["Python", "Scikit-learn", "Streamlit", "Pandas", "Seaborn"],
    points: [
      "15,000+ patient records with a brutal 98:2 class imbalance — handled with stratified splits and sample-weighted training across five classifiers.",
      "Train-only statistics (Chi-square, Cramér\u2019s V, Welch\u2019s t, Cohen\u2019s d) to kill test-set leakage; Gradient Boosting picked via cross-validated PR-AUC → 0.99 balanced accuracy.",
      "A second model without the glucose reading still screened at 99% balanced accuracy — deployed both as a live Streamlit app.",
    ],
    link: "https://github.com/suyogkarki1/Diabetes-Detection-Using-Gradient-Boosting.git",
  },
  {
    short: "SkyCast",
    title: "Kathmandu Rain Prediction — SkyCast",
    tags: ["Python", "Random Forest", "SARIMA", "Streamlit"],
    points: [
      "10 years of Kathmandu weather (3,468 records, 14 meteorological variables) cleaned and engineered for supervised classification.",
      "Four models benchmarked with stratified 6-fold CV; Random Forest won at 84% accuracy / 0.90 ROC-AUC.",
      "Bootstrap-resampled 2026 monthly rain probabilities with uncertainty bounds + a SARIMA seasonal forecast, all in an interactive app.",
    ],
    link: "https://github.com/suyogkarki1/Rain-Prediction-",
  },
  {
    short: "Churn",
    title: "Customer Churn Prediction",
    tags: ["Python", "Gradient Boosting", "EDA", "Feature Engineering"],
    points: [
      "10,000 European bank customers analysed for behavioural churn patterns across credit score, balance, and product usage.",
      "Engineered BalancePerProduct and AgeGroup features; 86.35% accuracy / 0.87 ROC-AUC after benchmarking simpler baselines.",
      "Age and NumOfProducts emerged as the strongest signals — retention teams should watch older single-product customers.",
    ],
    link: "https://github.com/suyogkarki1/customer-churn-prediction",
  },
  {
    short: "Health",
    title: "Smart Healthcare & Lifestyle Prediction",
    tags: ["Python", "Logistic Regression", "Cross-validation"],
    points: [
      "5,000 patient records: blood pressure, cholesterol, BMI, smoking, chest pain severity.",
      "99.4% accuracy / 0.999 ROC-AUC — then validated with cross-validation to rule out leakage instead of just celebrating the number.",
      "Age, BMI, and smoking ranked as the strongest heart-disease predictors for early screening.",
    ],
    link: "https://github.com/suyogkarki1/Smart-Healthcare-and-Lifestyle-Prediction",
  },
  {
    short: "ID · OCR",
    title: "UAE ID Card Number Extraction Pipeline",
    tags: ["YOLOv11", "OpenCV", "Tesseract OCR", "PostgreSQL"],
    points: [
      "Custom-annotated 424 ID card images on Ultralytics HUB with the ID-number field as a dedicated detection class.",
      "Custom YOLO model hit 99.5% mAP50 and 95% recall on ID-number localisation.",
      "OpenCV + Tesseract OCR pipeline with regex cleaning, persisted to PostgreSQL with conflict-safe deduplication.",
    ],
    link: "https://github.com/suyogkarki1/object_detection.git",
  },
];

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

export const STACK: StackItem[] = [
  { icon: { kind: "img", src: "/icons/py.png" }, name: "Python", pct: 75 },
  { icon: { kind: "sql" }, name: "SQL", pct: 60 },
  { icon: { kind: "img", src: "/icons/pandas.png" }, name: "Pandas", pct: 85 },
  { icon: { kind: "img", src: "/icons/numpy.png" }, name: "NumPy", pct: 83 },
  { icon: { kind: "img", src: "/icons/mpl.png" }, name: "Matplotlib", pct: 89 },
  { icon: { kind: "img", src: "/icons/sns.png" }, name: "Seaborn", pct: 85 },
  { icon: { kind: "img", src: "/icons/skl.png" }, name: "Scikit-learn", pct: 78 },
  { icon: { kind: "pbi" }, name: "Power BI", pct: 60 },
  { icon: { kind: "xls" }, name: "Excel", pct: 75 },
  { icon: { kind: "img", src: "/icons/git.png" }, name: "Git & GitHub", pct: 80 },
  { icon: { kind: "img", src: "/icons/st.png" }, name: "Streamlit", pct: 20 },
  { icon: { kind: "cv" }, name: "OpenCV · YOLO · OCR", pct: 55 },
];

export interface ValueItem {
  t: string;
  line: [string, string, string]; // before, bold, after
  glyph: "g1"|"g2"|"g3"|"g4"|"g5"|"g6"|"g7"|"g8"|"g9"|"g10";
}

export const VALUES: ValueItem[] = [
  { t: "Curiosity Before Conclusions", line: ["Better answers begin with ", "better questions", "."], glyph: "g1" },
  { t: "Context Before Calculation", line: ["Numbers do not speak clearly ", "without context", "."], glyph: "g2" },
  { t: "Quality Before Quantity", line: ["More data cannot repair ", "poor data", "."], glyph: "g3" },
  { t: "Simplicity With Purpose", line: ["Complexity should ", "earn its place", "."], glyph: "g4" },
  { t: "Evidence Over Assumption", line: ["The goal is not to be right — it is to discover ", "what is true", "."], glyph: "g5" },
  { t: "Honesty Over Impressive Metrics", line: ["One impressive number can hide ", "many failures", "."], glyph: "g6" },
  { t: "Adapt Without Ego", line: ["Keep the objective. ", "Change the route", "."], glyph: "g7" },
  { t: "Explain What I Build", line: ["Understanding should ", "travel with the prediction", "."], glyph: "g8" },
  { t: "Remember the Human Behind the Data", line: ["Data points may carry ", "real consequences", "."], glyph: "g9" },
  { t: "Stay Unfinished", line: ["There is no permanent finish line ", "in a changing world", "."], glyph: "g10" },
];

export const SOCIALS = [
  { tip: "GitHub", href: "https://github.com/suyogkarki1", icon: "github" },
  { tip: "LinkedIn", href: "https://www.linkedin.com/in/suyog-karki-8544a033a/", icon: "linkedin" },
  { tip: "Gmail", href: "https://mail.google.com/mail/u/0/?fs=1&to=suyogkarki2@gmail.com&tf=cm", icon: "mail" },
  { tip: "Instagram", href: "https://www.instagram.com/ssuy0_99/", icon: "instagram" },
] as const;

export const CERTS = [
  { id: "ads", label: "DataCamp · Associate Data Scientist", src: "/certs/ads.jpg", cap: "Associate Data Scientist · DataCamp · May 2026" },
  { id: "sql", label: "DataCamp · SQL Associate", src: "/certs/sql.jpg", cap: "SQL Associate · DataCamp · June 2026" },
  { id: "sklearn", label: "DataCamp · Supervised Learning with scikit-learn", src: "/certs/sklearn.jpg", cap: "Supervised Learning with scikit-learn · DataCamp · May 2026" },
] as const;
