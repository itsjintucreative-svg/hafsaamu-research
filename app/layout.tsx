
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hafsaamu Research",
  description:
    "Research, experiments and ideas around AI, economics and adaptive systems.",
};

const socials = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/hafsaamu_hotelix/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jintuali/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.2 8.5H2.5V21h2.7V8.5ZM3.85 2a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM21.5 13.8c0-3.75-2-5.5-4.65-5.5a4 4 0 0 0-3.6 2V8.5h-2.7V21h2.7v-6.2c0-1.65.32-3.25 2.35-3.25 2 0 2.02 1.88 2.02 3.36V21h2.72l1.16-7.2Z"
        />
      </svg>
    ),
  },
  {
    name: "X",
    url: "https://x.com/hafsaamu",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.43L5.55 22H2.4l7.25-8.3L1.9 2h6.4l4.43 6.78L18.9 2Zm-1.1 18h1.73L7.38 3.88H5.52L17.8 20Z"
        />
      </svg>
    ),
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            Hafsaamu Research
          </Link>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/blog">Research</Link>
          </nav>
        </header>

        {children}

        <footer className="hafsaamu-footer">
          <div className="footer-main">
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                Hafsaamu
              </Link>
              <p>Ideas today. Possibilities tomorrow.</p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4>Explore</h4>
                <Link href="/">Home</Link>
                <Link href="/blog">Research</Link>
              </div>

              <div className="footer-column">
                <h4>Products</h4>
                <Link href="/hotelix">Hotelix</Link>
              </div>

              <div className="footer-column">
                <h4>Connect</h4>

                <div className="connect-icons">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Hafsaamu Research
            </span>

            <div className="social-icons">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <span>Built for curious minds.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
