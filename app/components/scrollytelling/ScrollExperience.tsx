
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ScrollExperience.module.css";

export default function ScrollExperience() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 70,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-intro",
          start: "top 80%",
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-stage",
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
        },
      });

      timeline
        .to(".story-line-one", {
          opacity: 0,
          y: -60,
          duration: 1,
        })
        .fromTo(
          ".story-line-two",
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 1 },
          "<"
        )
        .to(".story-line-two", {
          opacity: 0,
          y: -60,
          duration: 1,
        })
        .fromTo(
          ".story-line-three",
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 1 },
          "<"
        )
        .to(".story-orb", {
          scale: 1.8,
          rotate: 180,
          duration: 2,
          ease: "none",
        }, 0);

      gsap.from("[data-card]", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-insights",
          start: "top 75%",
        },
      });

      gsap.from("[data-final]", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".story-final",
          start: "top 75%",
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className={styles.experience}>
      <section className={`${styles.intro} story-intro`}>
        <span data-reveal className={styles.eyebrow}>
          HAFSAAMU RESEARCH / 001
        </span>

        <h1 data-reveal>
          Every industry
          <br />
          generates data.
        </h1>

        <p data-reveal>
          But data alone doesn't tell the whole story.
          Understanding what lies beneath it changes everything.
        </p>

        <span data-reveal className={styles.scrollHint}>
          SCROLL TO EXPLORE ↓
        </span>
      </section>

      <section className={`${styles.stage} story-stage`}>
        <div className={styles.orbWrap}>
          <div className={`${styles.orb} story-orb`} />
        </div>

        <div className={styles.stageContent}>
          <span className={styles.eyebrow}>
            FROM DATA TO UNDERSTANDING
          </span>

          <h2 className="story-line-one">
            Data is everywhere.
          </h2>

          <h2 className="story-line-two">
            Patterns are hidden.
          </h2>

          <h2 className="story-line-three">
            Insights change decisions.
          </h2>
        </div>

        <span className={styles.stageNumber}>01 — 03</span>
      </section>

      <section className={`${styles.insights} story-insights`}>
        <span className={styles.eyebrow}>THE POWER OF RESEARCH</span>

        <h2>
          Look beyond
          <br />
          the numbers.
        </h2>

        <div className={styles.cards}>
          <article data-card className={styles.card}>
            <span>01 / DISCOVER</span>
            <h3>Understand patterns.</h3>
            <p>Find meaningful relationships hidden inside industry data.</p>
          </article>

          <article data-card className={styles.card}>
            <span>02 / ANALYZE</span>
            <h3>Explore possibilities.</h3>
            <p>Use evidence and research to understand changing conditions.</p>
          </article>

          <article data-card className={styles.card}>
            <span>03 / UNDERSTAND</span>
            <h3>Make informed decisions.</h3>
            <p>Turn research into practical knowledge and better estimates.</p>
          </article>
        </div>
      </section>

      <section className={`${styles.final} story-final`}>
        <span data-final className={styles.eyebrow}>
          HAFSAAMU RESEARCH
        </span>

        <h2 data-final>
          The story doesn't
          <br />
          end with data.
        </h2>

        <p data-final>
          It begins with understanding.
        </p>

        <a data-final href="/blog">
          Explore research <span>↗</span>
        </a>
      </section>
    </main>
  );
}
