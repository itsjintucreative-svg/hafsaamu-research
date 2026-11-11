
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./products-showcase.module.css";

const products = [
  {
    number: "01",
    category: "ECONOMIC SYSTEM",
    name: "AIES Hafsaamu.",
    headline: "A different vision for the economy.",
    description:
      "Exploring an economic model built around equal profits and intelligent capital allocation.",
    action: "Explore AIES",
    href: "/blog/introducing-aies",
    visual: "aies",
    command: "A NEW WAY TO SHARE PROSPERITY",
  },
  {
    number: "02",
    category: "HOTEL INTELLIGENCE",
    name: "Hafsaamu Hotelix.",
    headline: "Understand what comes next.",
    description:
      "Local-first financial intelligence helping hotels understand performance and forecast trends.",
    action: "Explore Hotelix",
    href: "/hotelix",
    visual: "hotelix",
    command: "FINANCIAL INTELLIGENCE",
  },
];

export default function ProductsShowcase() {
  const [active, setActive] = useState(0);

  const product = products[active];
  const next = () => setActive((current) => (current + 1) % products.length);

  return (
    <section className={styles.showcase}>
      <div className={styles.header}>
        <p>BUILT BY HAFSAAMU</p>
        <span>INDEPENDENT SYSTEMS / 2026</span>
      </div>

      <div className={styles.stage}>
        <div className={styles.stack}>
          <div className={styles.backCard} />
          <div className={styles.middleCard} />

          <article
            key={product.number}
            className={`${styles.frontCard} ${styles[product.visual]}`}
          >
            <div className={styles.cardTop}>
              <span className={styles.brand}>HAFSAAMU</span>
              <span>{product.category}</span>
            </div>

            <div className={styles.cardContent}>
              <span className={styles.cardNumber}>
                SYSTEM / {product.number}
              </span>

              <h2>{product.headline}</h2>

              <p className={styles.command}>
                &gt; {product.command} _
              </p>
            </div>

            <div className={styles.cardBottom}>
              <span>{product.name}</span>
              <span>{product.number} / 02</span>
            </div>
          </article>
        </div>

        <div className={styles.controls}>
          <div className={styles.progress}>
            <span>{product.number}</span>
            <span>/ 02</span>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next product"
          >
            <span>»</span>
          </button>
        </div>
      </div>

      <div className={styles.productDetails}>
        <div>
          <p className={styles.detailLabel}>{product.category}</p>
          <h3>{product.name}</h3>
          <p className={styles.description}>{product.description}</p>
        </div>

        <Link href={product.href}>
          {product.action} <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
