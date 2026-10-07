import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hafsaamu Research",
  description: "Research, experiments and ideas around AI, economics and adaptive systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">Hafsaamu Research</Link>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/blog">Research</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Hafsaamu Research</span>
          <span>Research • AI • Economics • Systems</span>
        </footer>
      </body>
    </html>
  );
}