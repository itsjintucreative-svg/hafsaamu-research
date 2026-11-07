
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "hotelix-docs");

export type HotelixDoc = {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  content: string;
};

export function getAllHotelixDocs(): HotelixDoc[] {
  if (!fs.existsSync(docsDirectory)) return [];

  const files = fs.readdirSync(docsDirectory)
    .filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const fullPath = path.join(docsDirectory, file);
    const source = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(source);

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category,
      author: data.author,
      excerpt: data.excerpt,
      content,
    };
  }).sort((a, b) => b.date.localeCompare(a.date));
}

export function getHotelixDocBySlug(
  slug: string
): HotelixDoc | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const fullPath = path.join(docsDirectory, `${slug}.md`);

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
    content,
  };
}
