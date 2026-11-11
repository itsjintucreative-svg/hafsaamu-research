
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  image?: string;
  content: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, file);
    const source = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(source);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      category: data.category || "Research",
      author: data.author || "Hafsaamu",
      excerpt: data.excerpt || "",
      image: data.image || undefined,
      content,
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    category: data.category || "Research",
    author: data.author || "Hafsaamu",
    excerpt: data.excerpt || "",
    image: data.image || undefined,
    content,
  };
}
