
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const latest = posts.slice(1);

  return (
    <main className="research-home">

      {/* HERO */}
      <section className="research-hero">
        <div className="hero-inner">
          <p className="eyebrow">HAFSAAMU RESEARCH</p>

          <h1>
            A New Way
            <br />
            To Share Prosperity.
          </h1>

          <p className="hero-description aies-description">
  When a customer buys a ₹100 product, the seller earns
  a profit. AIES aims to give the customer an equal profit
  benefit — if the seller earns ₹20, the customer gets ₹20 too.
</p>

          <Link href="/blog" className="primary-link">
            Explore our research →
          </Link>
        </div>

        
<div className="hero-visual">
  <img
    src="/media/solar%20system.svg"
    alt="Solar System"
    className="solar-system-art"
  />
</div>

      </section>

      {/* INTRODUCTION */}
      <section className="research-intro">
        <p className="eyebrow">ABOUT OUR WORK</p>

        <h2>
          Turning research
          <br />
          into real-world possibilities.
        </h2>

        <p>
          Hafsaamu Research is an independent research initiative
          documenting ideas, experiments, prototypes and technical
          developments across intelligent systems and economics.
        </p>
      </section>

            {/* HAFSAAMU PRODUCTS */}
      <section className="products-section">
        <div className="products-heading">
          <p className="eyebrow">BUILT BY HAFSAAMU</p>
          <h2>Ideas becoming intelligent systems.</h2>
          <p>
            Independent products and research systems designed
            to solve real-world problems through technology.
          </p>
        </div>

        <div className="products-grid">

          {/* AIES */}
          <Link href="/blog/introducing-aies" className="product-card">
            <div className="product-top">
              <span>01 / ECONOMIC SYSTEM</span>
              <span>↗</span>
            </div>

            <div className="product-visual aies-product-visual">
              <div className="product-orbit">
                <div className="product-orbit-core">A</div>
              </div>
            </div>

            <div className="product-info">
              <h3>AIES Hafsaamu</h3>
              <p>
                Exploring a new economic model built around
                equal profits and intelligent capital allocation.
              </p>
              <span>Explore AIES →</span>
            </div>
          </Link>

          {/* HOTELIX */}
          <Link href="/hotelix" className="product-card">
            <div className="product-top">
              <span>02 / HOTEL INTELLIGENCE</span>
              <span>↗</span>
            </div>

            <div className="product-visual hotelix-product-visual">
              <div className="hotelix-visual-content">
                <span className="hotelix-visual-label">
                  FINANCIAL INTELLIGENCE
                </span>
                <div className="hotelix-chart">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hotelix-visual-footer">
                  <span>REVENUE</span>
                  <span>ML / FORECASTING</span>
                </div>
              </div>
            </div>

            <div className="product-info">
              <h3>Hafsaamu Hotelix</h3>
              <p>
                Local-first financial intelligence that helps
                hotels understand performance and predict future trends.
              </p>
              <span>Explore Hotelix →</span>
            </div>
          </Link>

        </div>
      </section>

      {/* FEATURED RESEARCH */}
      {featured && (
        <section className="featured-research">
          <div className="section-top">
            <p className="eyebrow">FEATURED RESEARCH</p>
            <Link href="/blog">View all research →</Link>
          </div>

          <Link
            href={`/blog/${featured.slug}`}
            className="featured-layout"
          >
            <div className="featured-visual">
  {featured.slug === "introducing-aies" ? (
    <img
      src="/media/aies-thumbnail.jpg"
      alt="A Vision for an Equal Profits Economy"
      className="featured-thumbnail"
    />
  ) : (
    <>
      <div className="featured-grid" />
      <div className="featured-orbit orbit-one" />
      <div className="featured-orbit orbit-two" />
      <div className="featured-symbol">A</div>
    </>
  )}
</div>

            <div className="featured-info">
              <p className="meta">
                {featured.category} · {featured.date}
              </p>

              <h2>{featured.title}</h2>

              <p>{featured.excerpt}</p>

              <span className="read-link">
                Read research →
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* RESEARCH AREAS */}
      <section className="research-areas">
        <p className="eyebrow">AREAS OF EXPLORATION</p>
        <h2>Research across disciplines.</h2>

        <div className="areas-grid">
          <div className="area-item">
            <span>01</span>
            <h3>Artificial Intelligence</h3>
            <p>
              Machine learning, intelligent models and
              computational systems.
            </p>
          </div>

          <div className="area-item">
            <span>02</span>
            <h3>Economic Systems</h3>
            <p>
              Exploring economic models, allocation and
              alternative systems of exchange.
            </p>
          </div>

          <div className="area-item">
            <span>03</span>
            <h3>Research & Simulation</h3>
            <p>
              Experiments, simulations and ideas
              developed through research.
            </p>
          </div>
        </div>
      </section>

        {/* LATEST ARTICLES */}
        <section className="latest-research">
          <div className="section-top">
            <div>
              <p className="eyebrow">LATEST PUBLICATIONS</p>
              <h2>Recent research.</h2>
            </div>

            <Link href="/blog">All articles →</Link>
          </div>

          <div className="latest-grid">
            {latest.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                className="latest-card"
                key={post.slug}
              >
              
  {post.image && (
    <img
      src={post.image}
      alt={post.title}
      className="latest-thumbnail"
    />
  )}

              <p className="meta">
                {post.category} · {post.date}
              </p>

              <h3>{post.title}</h3>

              <p>{post.excerpt}</p>

              <span>Read article →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section className="research-closing">
        <p className="eyebrow">HAFSAAMU RESEARCH</p>
        <h2>Ideas are only the beginning.</h2>
        <Link href="/blog">Discover our work →</Link>
      </section>

    </main>
  );
}
