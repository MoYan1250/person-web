import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const empty = {
  views: 0,
  total: 0,
  cachedAt: new Date().toISOString(),
};

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const headers = new Headers({
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
  });

  if (path) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return NextResponse.json(
      {
        path: normalizedPath,
        views: empty.views,
        cachedAt: empty.cachedAt,
      },
      { headers },
    );
  }

  return NextResponse.json(
    {
      metric: "sessions",
      label: "Total Sessions",
      total: empty.total,
      cachedAt: empty.cachedAt,
    },
    { headers },
  );
}
