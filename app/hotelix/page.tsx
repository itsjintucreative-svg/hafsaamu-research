
import Link from "next/link";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import styles from "./hotelix.module.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

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
      "Hotelix trains a machine learning model using your hotel's own revenue and expense history.",
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
      "Generate estimates for expected revenue, projected expenses and anticipated profits from your hotel's data.",
  },
];

export default function HotelixPage() {
  return (
    <main className={`${styles.page} ${manrope.variable} ${plexMono.variable}`}>
      <header className={styles.header}>
        <Link href="/hotelix" className={styles.logo}>
          &gt; HAFSAAMU_HOTELIX<span className={styles.cursor}>_</span>
        </Link>
        <span className={styles.version}>[ MVP 1.0 ]</span>
      </header>

      <div className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>HAFSAAMU RESEARCH / HOTELIX</p>

          <h1>
            Your Hotel.
            <br />
            Your Data.
            <br />
            Your Financial Forecasts.
          </h1>

          <p className={styles.intro}>
            Hafsaamu Hotelix is a local-first machine learning system that
            turns your daily financial records into intelligent revenue and
            expense predictions.
          </p>

          <a href="#apply" className={styles.button}>
            Apply for Early Access
          </a>
          <Link
  href="/hotelix/docs"
  className={styles.documentationLink}
>
  <span className={styles.typingText}>
    Read MVP 1 Documentation
  </span>
  <span className={styles.animatedArrow}>↗</span>
</Link>

          <p className={styles.note}>
            No credit card required. Local installation only.
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
            Key Features <span>[ MVP 1 ]</span>
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

        <section id="apply" className={styles.apply}>
          <p className={styles.eyebrow}>EARLY ACCESS PROGRAM</p>
          <h2>Help Us Build the Future of Hotel Intelligence.</h2>
          <p>
            We are inviting independent hotel owners, managers and finance
            teams to test Hotelix MVP 1. We provide the software; you provide
            real-world testing and feedback.
          </p>
          <a href="mailto:hello@hafsaamu.world?subject=Hotelix%20Early%20Access"
             className={styles.button}>
            Request MVP 1 Package
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
