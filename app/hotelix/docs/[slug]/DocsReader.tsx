
"use client";

import { useEffect, useState } from "react";
import styles from "../docs.module.css";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function DocsReader({ html }: { html: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const article = document.getElementById("hotelix-article");
    if (!article) return;

    const elements = Array.from(
      article.querySelectorAll("h2, h3")
    );

    const usedIds = new Set<string>();

    const items = elements.map((element) => {
      const text = element.textContent?.trim() || "Section";

      const baseId =
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-") || "section";

      let id = baseId;
      let count = 2;

      while (usedIds.has(id)) {
        id = `${baseId}-${count++}`;
      }

      usedIds.add(id);
      element.id = id;

      return {
        id,
        text,
        level: element.tagName === "H3" ? 3 : 2,
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [html]);

  return (
    <div className={styles.readerGrid}>
      <article
        id="hotelix-article"
        className={`${styles.readerArticle} prose`}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <aside className={styles.tocPanel}>
        <p className={styles.tocLabel}>ON THIS PAGE</p>

        {headings.length > 0 ? (
          <nav aria-label="Table of contents">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`${styles.tocLink} ${
                  activeId === heading.id ? styles.tocActive : ""
                }`}
                data-level={heading.level}
                onClick={() => setActiveId(heading.id)}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        ) : (
          <p className={styles.tocEmpty}>
            No sections available.
          </p>
        )}
      </aside>
    </div>
  );
}
