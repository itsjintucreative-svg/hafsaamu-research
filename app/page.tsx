
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
            Exploring ideas.
            <br />
            Building the future.
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
              <div className="featured-grid" />
              <div className="featured-orbit orbit-one" />
              <div className="featured-orbit orbit-two" />
              <div className="featured-symbol">A</div>
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
