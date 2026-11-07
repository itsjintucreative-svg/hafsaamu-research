
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllHotelixDocs,
  getHotelixDocBySlug,
} from "@/lib/hotelix-docs";
import { markdownToHtml } from "@/lib/markdown";
import DocsReader from "./DocsReader";
import styles from "../docs.module.css";

export function generateStaticParams() {
  return getAllHotelixDocs().map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function HotelixDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getHotelixDocBySlug(slug);

  if (!doc) notFound();

  const html = await markdownToHtml(doc.content);

  return (
    <main className={styles.docsPage}>
      <header className={styles.topbar}>
        <Link href="/hotelix" className={styles.brand}>
          HAFSAAMU <span>HOTELIX</span>
        </Link>

        <div className={styles.topbarRight}>
          <Link href="/hotelix/docs">DOCUMENTATION</Link>
          <span className={styles.version}>MVP 1.0</span>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <p className={styles.sidebarLabel}>GETTING STARTED</p>

          <Link href="/hotelix" className={styles.sidebarLink}>
            ← Hotelix Home
          </Link>

          <Link href="/hotelix/docs" className={styles.sidebarLink}>
            ← All Documentation
          </Link>

          <p className={styles.sidebarLabel}>DOCUMENTATION</p>

          <Link
            href={`/hotelix/docs/${doc.slug}`}
            className={styles.sidebarActive}
          >
            <span className={styles.sidebarDot} />
            {doc.title}
          </Link>

          <div className={styles.sidebarBottom}>
            <span>BUILT BY</span>
            <strong>HAFSAAMU RESEARCH</strong>
          </div>
        </aside>

        <section className={styles.content}>
          <div className={styles.breadcrumb}>
            <Link href="/hotelix">Hotelix</Link>
            <span>/</span>
            <Link href="/hotelix/docs">Documentation</Link>
            <span>/</span>
            <span>{doc.title}</span>
          </div>

          <header className={styles.intro}>
            <p className={styles.eyebrow}>
              HOTELIX / {doc.category}
            </p>

            <h1>{doc.title}</h1>

            <p className={styles.description}>
              {doc.excerpt}
            </p>

            <p className={styles.docMeta}>
              {doc.date} · {doc.author}
            </p>
          </header>

          <DocsReader html={html} />

          <footer className={styles.footer}>
            <span>HAFSAAMU HOTELIX</span>
            <span>LOCAL-FIRST FINANCIAL INTELLIGENCE</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
