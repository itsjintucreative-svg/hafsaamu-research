
import Link from "next/link";
import { getAllHotelixDocs } from "@/lib/hotelix-docs";
import styles from "./docs.module.css";

export default function HotelixDocsPage() {
  const docs = getAllHotelixDocs();

  return (
    <main className={styles.docsPage}>
      <header className={styles.topbar}>
        <Link href="/hotelix" className={styles.brand}>
          HAFSAAMU <span>HOTELIX</span>
        </Link>

        <div className={styles.topbarRight}>
          <span>DOCUMENTATION</span>
          <span className={styles.version}>MVP 1.0</span>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>GETTING STARTED</p>

          <Link href="/hotelix" className={styles.sidebarLink}>
            ← Hotelix Home
          </Link>

          <p className={styles.sidebarLabel}>DOCUMENTATION</p>

          {docs.map((doc) => (
            <Link
              href={`/hotelix/docs/${doc.slug}`}
              className={styles.sidebarActive}
              key={doc.slug}
            >
              <span className={styles.sidebarDot} />
              {doc.title}
            </Link>
          ))}

          <div className={styles.sidebarBottom}>
            <span>BUILT BY</span>
            <strong>HAFSAAMU RESEARCH</strong>
          </div>
        </aside>

        <section className={styles.content}>
          <div className={styles.breadcrumb}>
            <Link href="/hotelix">Hotelix</Link>
            <span>/</span>
            <span>Documentation</span>
          </div>

          <div className={styles.intro}>
            <p className={styles.eyebrow}>
              HAFSAAMU HOTELIX / DOCUMENTATION
            </p>

            <h1>
              Understand your
              <br />
              financial intelligence system.
            </h1>

            <p className={styles.description}>
              Everything you need to install, understand and use
              Hafsaamu Hotelix — from daily financial records
              to hotel-specific machine learning predictions.
            </p>
          </div>

          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>YOUR DOCUMENTATION</p>
              <h2>Explore the guides.</h2>
            </div>

            <span>{String(docs.length).padStart(2, "0")} DOCUMENTS</span>
          </div>

          <div className={styles.docList}>
            {docs.map((doc, index) => (
              <Link
                href={`/hotelix/docs/${doc.slug}`}
                className={styles.docCard}
                key={doc.slug}
              >
                <div className={styles.docNumber}>
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className={styles.docInfo}>
                  <p className={styles.docMeta}>
                    {doc.category} · {doc.date}
                  </p>

                  <h3>{doc.title}</h3>

                  <p>{doc.excerpt}</p>

                  <span>Read documentation →</span>
                </div>

                <div className={styles.docArrow}>↗</div>
              </Link>
            ))}
          </div>

          {docs.length === 0 && (
            <p className={styles.empty}>
              Documentation is being prepared.
            </p>
          )}

          <footer className={styles.footer}>
            <span>HAFSAAMU HOTELIX</span>
            <span>LOCAL-FIRST FINANCIAL INTELLIGENCE</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
