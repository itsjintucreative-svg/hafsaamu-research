
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import IndustrySearch from "./components/industry-search";
import ProductsShowcase from "./components/products-showcase";

export default function Home() {
  const posts = getAllPosts();

  const featured = posts[0];
  const latest = posts.slice(1);

  const featuredImage =
    featured?.image ||
    (featured?.slug === "introducing-aies"
      ? "/media/aies-equal-profits-system.jpg"
      : null);

  return (
    <main className="research-home">
      <IndustrySearch />

      {/* LATEST RESEARCH */}
      {featured && (
        <section className="journal-section">

          <div className="journal-heading">
            <div>
              <p className="eyebrow">HAFSAAMU JOURNAL</p>
              <h2>Latest research.</h2>
            </div>

            <Link href="/blog" className="journal-explore">
              Explore all research <span>↗</span>
            </Link>
          </div>

          {/* FEATURED ARTICLE */}
          <div className="journal-lead">

            <article className="journal-featured">
              <Link
                href={`/blog/${featured.slug}`}
                className="journal-featured-image"
              >
                {featuredImage ? (
                  <img
                    src={featuredImage}
                    alt={featured.title}
                  />
                ) : (
                  <div className="journal-image-placeholder">
                    <span>H.</span>
                    <small>HAFSAAMU RESEARCH</small>
                  </div>
                )}
              </Link>

              <div className="journal-featured-content">
                <p className="journal-meta">
                  {featured.category} <span>·</span> {featured.date}
                </p>

                <Link href={`/blog/${featured.slug}`}>
                  <h3>{featured.title}</h3>
                </Link>

                <p className="journal-excerpt">
                  {featured.excerpt}
                </p>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="journal-read-link"
                >
                  Read research <span>↗</span>
                </Link>
              </div>
            </article>

          </div>

          {/* ALL REMAINING ARTICLES */}
          {latest.length > 0 && (
            <div className="journal-more">
              {latest.map((post) => (
                <article
                  className="journal-more-story"
                  key={post.slug}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="journal-more-image"
                  >
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="journal-image-placeholder">
                        <span>H.</span>
                      </div>
                    )}
                  </Link>

                  <p className="journal-meta">
                    {post.category} <span>·</span> {post.date}
                  </p>

                  <Link href={`/blog/${post.slug}`}>
                    <h3>{post.title}</h3>
                  </Link>

                  <p className="journal-excerpt">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="journal-read-link"
                  >
                    Read article <span>↗</span>
                  </Link>
                </article>
              ))}
            </div>
          )}

        </section>
      )}

      {/* HAFSAAMU PRODUCTS */}
      <ProductsShowcase />

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

      {/* CLOSING */}
      <section className="research-closing">
        <p className="eyebrow">HAFSAAMU RESEARCH</p>
        <h2>Ideas are only the beginning.</h2>
        <Link href="/blog">Discover our work →</Link>
      </section>

    </main>
  );
}
