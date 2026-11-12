
import Link from "next/link";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import styles from "./hotelix.module.css";
import HotelixPreview from "./hotelix-preview";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

const DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1Ykdw-DpfYAjVepWsYoDjSO0uLUsSQFcP";

const features = [
  {
    number: "01",
    title: "Local-First Privacy",
    description:
      "Your financial data stays on your computer. No mandatory cloud subscriptions or external data sharing.",
  },
  {
    number: "02",
    title: "Custom Machine Learning",
    description:
      "Hotelix trains machine learning models using your hotel's own revenue and expense history.",
  },
  {
    number: "03",
    title: "Simple Daily Workflow",
    description:
      "Record room revenue, F&B sales, staff salaries and operational costs, or import historical data through CSV.",
  },
  {
    number: "04",
    title: "Intelligent Forecasting",
    description:
      "Generate estimates for expected revenue and occupancy using your hotel's historical data.",
  },
];

export default function HotelixPage() {
  return (
    <main className={`${styles.page} ${manrope.variable} ${plexMono.variable}`}>
      <header className={styles.header}>
        <Link href="/hotelix" className={styles.logo}>
          &gt; HAFSAAMU_HOTELIX<span className={styles.cursor}>_</span>
        </Link>
        <span className={styles.version}>[ V1.2.0 ]</span>
      </header>

      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>HAFSAAMU RESEARCH / HOTELIX</p>

          <h1 className={styles.animatedTitle}>
  <span className={styles.fromLeft}>Your Hotel.</span>
  <span className={styles.fromRight}>Your Data.</span>
  <span className={styles.fromLeft}>Your Financial Forecasts.</span>
</h1>
          <p className={styles.intro}>
            Hafsaamu Hotelix is a local-first machine learning system that
            turns your daily financial records into intelligent revenue and
            occupancy predictions.
          </p>

          <a href="#download" className={styles.button}>
            Download Hotelix V1.2.0 ↓
          </a>

          <Link href="/hotelix/docs" className={styles.documentationLink}>
            <span className={styles.typingText}>
              Read Hotelix Documentation
            </span>
            <span className={styles.animatedArrow}>↗</span>
          </Link>

          <p className={styles.note}>
            Windows 10/11 · Local installation · No mandatory cloud account
          </p>
        </section>

        <hr className={styles.separator} />

        <section className={styles.problemGrid}>
          <article>
            <h2>The Problem.</h2>
            <p>
              Every hotel generates vital financial data every day. But most
              independent hotels lack the tools to turn that raw data into
              clear, future-facing intelligence.
            </p>
          </article>

          <article>
            <h2>The Solution.</h2>
            <p>
              Every hotel should be able to build its own financial
              intelligence system using its own operating environment.
              Hotelix learns from historical data while keeping records on
              the local computer.
            </p>
          </article>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>
            Key Features <span>[ V1 ]</span>
          </h2>

          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article className={styles.featureCard} key={feature.number}>
                <h3>
                  {feature.number}. {feature.title}
                </h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
        <HotelixPreview />
        

        {/* Latest Release */}
        <section id="download" className={styles.release}>
          <p className={styles.eyebrow}>LATEST PUBLIC RELEASE</p>

          <div className={styles.releaseHeader}>
            <div>
              <h2>Hotelix V1.2.0</h2>
              <p>
                Your hotel's financial intelligence system. Ready for local
                Windows installation.
              </p>
            </div>
            <span className={styles.releaseBadge}>PUBLIC BETA</span>
          </div>

          <div className={styles.releaseMeta}>
            <span>VERSION: 1.2.0</span>
            <span>PLATFORM: WINDOWS 10/11</span>
            <span>PYTHON: 3.12</span>
          </div>

          <a
            href={DOWNLOAD_URL}
            className={styles.button}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Windows Installer ↓
          </a>

          <p className={styles.note}>
            ZIP package · Google Drive · Free to download
          </p>

          <div className={styles.releaseSteps}>
            <h3>Getting Started</h3>
            <ol>
              <li>Download the Hotelix V1.2.0 ZIP package.</li>
              <li>Extract the ZIP into a folder on your Windows computer.</li>
              <li>Install Python 3.12 (64-bit), if not already installed.</li>
              <li>Run install_windows.bat to install dependencies.</li>
              <li>Run run_windows.bat to launch Hotelix.</li>
            </ol>
          </div>

          <p className={styles.releaseDisclaimer}>
            Hotelix V1.2.0 is a local-first public beta. Forecasts are
            estimates based on available hotel data and should support,
            not replace, business decisions.
          </p>
        </section>

        <section id="apply" className={styles.apply}>
          <p className={styles.eyebrow}>EARLY ACCESS PROGRAM</p>
          <h2>Help Us Build the Future of Hotel Intelligence.</h2>
          <p>
            We are inviting independent hotel owners, managers and finance
            teams to test Hotelix and share real-world feedback. Your
            experience will help shape future releases.
          </p>
          <a
            href="mailto:hello@hafsaamu.world?subject=Hotelix%20Early%20Access"
            className={styles.button}
          >
            Contact Hafsaamu
          </a>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>© 2026 Hafsaamu. All rights reserved.</p>
        <p>Intelligent Financial Predictions for Hotels.</p>
        <a href="https://hafsaamu.world">www.hafsaamu.world</a>
      </footer>
    </main>
  );
}
