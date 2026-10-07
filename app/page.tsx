import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">HAFSAAMU · RESEARCH</p>
        <h1>Research,<br />ideas to reality.</h1>
        <p className="hero-copy">
          Exploring artificial intelligence, economic systems and the ideas
          that could shape how intelligent systems interact with the real world.
        </p>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="core">A</div>
          <span className="dot dot-one" />
          <span className="dot dot-two" />
          <span className="dot dot-three" />
        </div>
      </section>

      <section className="intro">
        <p>
          Hafsaamu Research is an independent space for documenting research,
          prototypes, experiments and technical thinking.
        </p>
      </section>

      <section className="research-section">
        <div className="section-heading">
          <p className="eyebrow">LATEST RESEARCH</p>
          <h2>Ideas in progress.</h2>
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="featured-card">
            <div className="featured-art">
              <div className="art-grid" />
              <div className="art-circle" />
              <div className="art-line" />
            </div>
            <div className="featured-content">
              <p className="meta">{featured.category} · {featured.date}</p>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <span className="read-link">Read research →</span>
            </div>
          </Link>
        )}

        <div className="post-grid">
          {posts.slice(1).map((post) => (
            <Link href={`/blog/${post.slug}`} className="post-card" key={post.slug}>
              <p className="meta">{post.category} · {post.date}</p>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span>Read →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}