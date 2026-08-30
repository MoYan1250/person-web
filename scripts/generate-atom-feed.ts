import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { siteConfig } from "../src/data/site";

const AUTHOR_NAME = "Shang-Jing Lyu";
const AUTHOR_EMAIL = "ziknsodardow@gmail.com";
const FEED_SUBTITLE =
  "A personal index of who I am, what I make, and what I write.";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function loadZhPosts() {
  const dir = path.join(process.cwd(), "content", "blog", "zh");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  return files
    .map((file) => {
      const slug = path.basename(file, path.extname(file));
      const source = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(source);
      return {
        slug,
        title: String(data.title || slug),
        summary: String(data.summary || ""),
        date: String(data.date || ""),
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

function generateAtomFeed(): string {
  const posts = loadZhPosts();
  const diaryUrl = `${siteConfig.url}/zh/diary`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${AUTHOR_NAME} - Diary</title>
  <subtitle>${FEED_SUBTITLE}</subtitle>
  <link href="${diaryUrl}" rel="self"/>
  <link href="${siteConfig.url}/zh"/>
  <id>${diaryUrl}</id>
  <author>
    <name>${AUTHOR_NAME}</name>
    <email>${AUTHOR_EMAIL}</email>
  </author>
  <updated>${new Date().toISOString()}</updated>
  ${posts
    .map((post) => {
      const postUrl = `${siteConfig.url}/zh/diary/${post.slug}`;
      const publishedDate = new Date(post.date).toISOString();

      return `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${postUrl}"/>
    <id>${postUrl}</id>
    <published>${publishedDate}</published>
    <updated>${publishedDate}</updated>
    <author>
      <name>${AUTHOR_NAME}</name>
      <email>${AUTHOR_EMAIL}</email>
    </author>
    <summary>${escapeXml(post.summary)}</summary>
  </entry>`;
    })
    .join("")}
</feed>`;
}

const outFile = path.join(process.cwd(), "public", "api", "feed", "atom.xml");
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, generateAtomFeed(), "utf-8");
