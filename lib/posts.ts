
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
  const files = fs.readdirSync(postsDirectory).filter((file) =>
    file.endsWith(".md")
  );

  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, file);
      const source = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(source);

      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        author: data.author,
        excerpt: data.excerpt,
        image: data.image || undefined,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    author: data.author,
    excerpt: data.excerpt,
    image: data.image || undefined,
    content,
  };
}
