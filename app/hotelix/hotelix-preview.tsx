
import Link from "next/link";
import styles from "./hotelix-preview.module.css";

export default function HotelixPreview() {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <span className={styles.eyebrow}>EXPLORE HOTELIX</span>
        <h2>See your hotel&apos;s data in action.</h2>
        <p>
          Explore how Hotelix turns daily records into clearer
          insights and illustrative forecasts.
        </p>
      </div>

      <div className={styles.preview}>
        <div className={styles.toolbar}>
          <div className={styles.dots}>
            <i />
            <i />
            <i />
          </div>
          <span>Hotelix · Interactive preview</span>
          <span className={styles.version}>V1.2.0</span>
        </div>

        <div className={styles.frame}>
          <iframe
            src="/hotelix-demo"
            title="Hotelix interactive product demo"
            loading="lazy"
          />
        </div>
      </div>

      <div className={styles.bottom}>
        <p>Browser-based simulation · No real ML training</p>
        <Link href="/hotelix-demo">
          Open interactive demo <span>↗</span>
        </Link>
      </div>
    </section>
  );
}
