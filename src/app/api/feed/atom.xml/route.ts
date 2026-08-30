import { DATA, getEmail } from "@/data";
import { getBlogIndex, sortIndexByDate } from "@/lib/blog-index";

export const dynamic = "force-static";

export async function GET() {
  const posts = sortIndexByDate(getBlogIndex());
  const authorEmail = extractEmailAddress(getEmail());

  const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${DATA.name} - Diary</title>
  <subtitle>${DATA.description}</subtitle>
  <link href="${DATA.url}/diary" rel="self"/>
  <link href="${DATA.url}"/>
  <id>${DATA.url}/diary</id>
  <author>
    <name>${DATA.name}</name>
    <email>${authorEmail}</email>
  </author>
  <updated>${new Date().toISOString()}</updated>
  ${posts
    .map((post) => {
      const postUrl = `${DATA.url}/diary/${post.slug}`;
      const publishedDate = new Date(post.date).toISOString();

      return `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${postUrl}"/>
    <id>${postUrl}</id>
    <published>${publishedDate}</published>
    <updated>${publishedDate}</updated>
    <author>
      <name>${DATA.name}</name>
      <email>${authorEmail}</email>
    </author>
    <summary>${escapeXml(post.summary || "")}</summary>
  </entry>`;
    })
    .join("")}
</feed>`;

  return new Response(atomFeed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function extractEmailAddress(emailUrl: string): string {
  return emailUrl.replace(/^mailto:/i, "");
}
