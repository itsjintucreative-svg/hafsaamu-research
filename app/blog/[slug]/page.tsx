import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const html = await markdownToHtml(post.content);

  return (
    <main className="article-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link><span>›</span>
        <Link href="/blog">Research</Link><span>›</span>
        <span>{post.category}</span>
      </div>

      <header className="article-header">
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="article-deck">{post.excerpt}</p>
        <p className="byline">{post.date} · {post.author}</p>
      </header>

     {slug === "introducing-aies" ? (
  <div className="article-thumbnail">
    <img
      src="/media/aies-thumbnail.jpg"
      alt="A Vision for an Equal Profits Economy"
    />
  </div>
) : post.image ? (
  <div className="article-cover">
    <img
      src={post.image}
      alt={post.title}
    />
  </div>
) : null}

      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      {slug === "aies-v1-research-simulation" && (
  <section className="aies-demo-section">
    <div className="aies-demo-heading">
      <p className="eyebrow">INTERACTIVE EXPERIENCE</p>
      <h2>Experience AIES V1</h2>
      <p>
        Explore the AIES Hafsaamu user journey
        through an interactive simulation.
      </p>
    </div>

    <iframe
      src="/aies-demo/index.html"
      title="AIES Hafsaamu Interactive Demo"
      className="aies-demo-frame"
      loading="lazy"
      allow="clipboard-write"
    />
  </section>
)}
    </main>
  );
}