
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./industry-search.module.css";

const industries = [
  {
    name: "Hospitality",
    keywords: ["hotel", "hotels", "hospitality", "hotelix"],
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

const suggestions = ["Hotel", "Retail", "Healthcare", "Manufacturing"];

export default function IndustrySearch() {
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return [];

    return industries.filter((industry) => {
      const searchableText = [
        industry.name,
        industry.product,
        industry.category,
        ...industry.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(value);
    });
  }, [query]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) {
      setSearchActive(false);
      return;
    }

    setQuery(query.trim());
    setSearchActive(true);
  }

  function handleSuggestion(item: string) {
    setQuery(item);
    setSearchActive(true);
  }

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

        <div className={styles.searchArea}>
          <form
            className={styles.searchBox}
            onSubmit={handleSearch}
          >
            <span className={styles.searchIcon}>⌕</span>

            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchActive(true);
              }}
              placeholder="Which industry are you exploring today?"
              aria-label="Search industries"
            />

            <button
              type="submit"
              aria-label="Search"
            >
              →
            </button>
          </form>

          <div className={styles.suggestions}>
            <span>Explore:</span>

            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSuggestion(item)}
                className={
                  query.toLowerCase() === item.toLowerCase()
                    ? styles.activeSuggestion
                    : ""
                }
              >
                {item}
              </button>
            ))}
          </div>

          {searchActive && query.trim() && (
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
                        Explore ↗
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
                  <h3>
                    Something new is waiting to be explored.
                  </h3>
                  <p>
                    We haven't listed this industry yet.
                    Stay connected as Hafsaamu explores more possibilities.
                  </p>
                  <span>
                    MORE INDUSTRIES ARE ON THE HORIZON.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
