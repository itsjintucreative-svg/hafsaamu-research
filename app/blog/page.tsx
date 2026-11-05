
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="blog-index">
      <div className="page-intro">
        <p className="eyebrow">HAFSAAMU · RESEARCH</p>
        <h1>Research &amp; ideas.</h1>
        <p>
          Articles documenting AIES, artificial intelligence, economics,
          experiments and the process of turning an idea into a working system.
        </p>
      </div>

      <div className="article-list">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            className={`article-row ${
              post.slug === "introducing-aies" ? "article-row-featured" : ""
            }`}
            key={post.slug}
          >
            {post.slug === "introducing-aies" && (
              <div className="article-row-image">
                <img
                  src="/media/aies-thumbnail.jpg"
                  alt="A Vision for an Equal Profits Economy"
                />
              </div>
            )}

            <div className="article-row-content">
              <p className="meta">
                {post.category} · {post.date}
              </p>

              <h2>{post.title}</h2>

              <p>{post.excerpt}</p>

              <span className="article-read">Read article →</span>
            </div>

            <span className="arrow">↗</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
