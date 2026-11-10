
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./industry-search.module.css";

const industries = [
  {
    name: "Hospitality",
    keywords: ["hotel", "hotels", "hospitality"],
    product: "Hafsaamu Hotelix",
    description:
      "Revenue and occupancy forecasting using historical hotel data.",
    status: "available",
    href: "/hotelix",
    category: "HOTEL INTELLIGENCE",
  },
  {
    name: "Retail",
    keywords: ["retail", "shop", "shops", "store", "stores"],
    product: "Retail Intelligence",
    description:
      "We're exploring intelligent solutions for retail businesses.",
    status: "coming",
    category: "RETAIL INTELLIGENCE",
  },
  {
    name: "Healthcare",
    keywords: ["healthcare", "health", "hospital", "medical"],
    product: "Healthcare Intelligence",
    description:
      "Exploring technology possibilities for healthcare.",
    status: "coming",
    category: "HEALTHCARE",
  },
  {
    name: "Manufacturing",
    keywords: ["manufacturing", "factory", "industry"],
    product: "Manufacturing Intelligence",
    description:
      "Exploring intelligent systems for manufacturing.",
    status: "coming",
    category: "INDUSTRIAL INTELLIGENCE",
  },
  {
    name: "Education",
    keywords: ["education", "school", "learning"],
    product: "Education Intelligence",
    description:
      "Exploring new possibilities in educational technology.",
    status: "coming",
    category: "EDUCATION",
  },
];

export default function IndustrySearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return [];

    return industries.filter((industry) => {
      return (
        industry.name.toLowerCase().includes(value) ||
        industry.keywords.some((keyword) =>
          keyword.includes(value)
        )
      );
    });
  }, [query]);

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.eyebrow}>HAFSAAMU RESEARCH</p>

        <h1 className={styles.headline}>
  <span className={styles.lineOne}>
    Your data has a story.
  </span>
  <span className={styles.lineTwo}>
    Discover what it can tell you.
  </span>
</h1>

        <p className={styles.description}>
          Exploring intelligent technology and research
          solutions built around different industries.
        </p>

        <div className={styles.searchArea}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>⌕</span>

            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Which industry are you exploring today?"
              aria-label="Search industries"
            />

            <button
              type="button"
              onClick={() => {
                if (!query.trim()) {
                  document.querySelector<HTMLInputElement>(
                    `.${styles.searchBox} input`
                  )?.focus();
                }
              }}
              aria-label="Focus search"
            >
              →
            </button>
          </div>

          <div className={styles.suggestions}>
            <span>Explore:</span>
            {["Hotel", "Retail", "Healthcare", "Manufacturing"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  type="button"
                >
                  {item}
                </button>
              )
            )}
          </div>

          {query.trim() && (
            <div className={styles.results}>
              <p className={styles.resultsLabel}>
                INDUSTRY DISCOVERY
              </p>

              {results.length > 0 ? (
                results.map((industry) => (
                  <div
                    key={industry.name}
                    className={styles.resultItem}
                  >
                    <div className={styles.resultInfo}>
                      <span className={styles.category}>
                        {industry.category}
                      </span>

                      <h3>{industry.product}</h3>

                      <p>{industry.description}</p>
                    </div>

                    {industry.status === "available" ? (
                      <Link
                        href={industry.href!}
                        className={styles.available}
                      >
                        Available ↗
                      </Link>
                    ) : (
                      <span className={styles.coming}>
                        Coming Soon
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className={styles.empty}>
                  <h3>Something new is waiting to be explored.</h3>
                  <p>
                    We haven't listed this industry yet.
                    Stay connected as Hafsaamu explores more possibilities.
                  </p>
                  <span>MORE INDUSTRIES ARE ON THE HORIZON.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <p className={styles.bottomNote}>
          Research · Technology · Possibilities
        </p>
      </div>
    </section>
  );
}
