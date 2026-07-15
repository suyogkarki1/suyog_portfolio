import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUY0G.99 — Suyog Karki · Data Science & Machine Learning",
  description:
    "Portfolio of Suyog Karki — data science student building end-to-end ML pipelines. Projects in healthcare risk, weather forecasting, churn, and computer vision.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
