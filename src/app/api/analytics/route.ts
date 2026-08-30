// app/api/analytics/route.ts
// Fetch total GA4 sessions securely via service account
// Also supports fetching page views for specific paths.
// GA4 client is loaded lazily so missing credentials (or Workers
// gRPC incompatibilities) do not break the rest of the site.

import { revalidateTag, unstable_cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CACHE_DURATION = 3600; // 1 hour in seconds

type AnalyticsClient = {
  runReport: (request: {
    property: string;
    dateRanges: Array<{ startDate: string; endDate: string }>;
    dimensions?: Array<{ name: string }>;
    metrics: Array<{ name: string }>;
    dimensionFilter?: unknown;
  }) => Promise<
    Array<{
      rows?: Array<{
        metricValues?: Array<{ value?: string }>;
      }>;
    }>
  >;
};

function getCredentials() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const privateKey = (process.env.GA4_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!propertyId || !clientEmail || !privateKey) {
    return null;
  }

  return { propertyId, clientEmail, privateKey };
}

let analyticsClient: AnalyticsClient | null = null;

async function getAnalyticsClient(): Promise<AnalyticsClient | null> {
  const credentials = getCredentials();
  if (!credentials) {
    return null;
  }

  if (analyticsClient) {
    return analyticsClient;
  }

  try {
    const [{ BetaAnalyticsDataClient }, { GoogleAuth }] = await Promise.all([
      import("@google-analytics/data"),
      import("google-auth-library"),
    ]);

    const auth = new GoogleAuth({
      credentials: {
        client_email: credentials.clientEmail,
        private_key: credentials.privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    analyticsClient = new BetaAnalyticsDataClient({
      // Type assertion needed due to version mismatch between google-auth-library versions
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      auth: auth as any,
    }) as unknown as AnalyticsClient;

    return analyticsClient;
  } catch (err) {
    console.error("Failed to initialize GA4 client:", err);
    return null;
  }
}

interface CachedData<T> {
  value: T;
  cachedAt: string;
}

function emptyCachedValue(): CachedData<number> {
  return {
    value: 0,
    cachedAt: new Date().toISOString(),
  };
}

async function fetchPageViews(path: string): Promise<CachedData<number>> {
  const credentials = getCredentials();
  const analyticsDataClient = await getAnalyticsClient();
  if (!credentials || !analyticsDataClient) {
    return emptyCachedValue();
  }

  const pageViewsResponse = await analyticsDataClient.runReport({
    property: `properties/${credentials.propertyId}`,
    dateRanges: [{ startDate: "2025-01-01", endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    dimensionFilter: {
      filter: {
        fieldName: "pagePath",
        stringFilter: {
          matchType: "EXACT",
          value: path,
        },
      },
    },
  });

  const value = pageViewsResponse[0]?.rows?.[0]?.metricValues?.[0]?.value
    ? Number(pageViewsResponse[0].rows[0].metricValues[0].value)
    : 0;

  return {
    value,
    cachedAt: new Date().toISOString(),
  };
}

async function getCachedPageViews(path: string): Promise<CachedData<number>> {
  return unstable_cache(
    () => fetchPageViews(path),
    ["ga4-page-views", path],
    {
      revalidate: CACHE_DURATION,
      tags: ["ga4-analytics", `ga4-page-${path}`],
    },
  )();
}

async function fetchTotalSessions(): Promise<CachedData<number>> {
  const credentials = getCredentials();
  const analyticsDataClient = await getAnalyticsClient();
  if (!credentials || !analyticsDataClient) {
    return emptyCachedValue();
  }

  const sessionsResponse = await analyticsDataClient.runReport({
    property: `properties/${credentials.propertyId}`,
    dateRanges: [{ startDate: "2025-01-01", endDate: "today" }],
    metrics: [{ name: "sessions" }],
  });

  const value = sessionsResponse[0]?.rows?.[0]?.metricValues?.[0]?.value
    ? Number(sessionsResponse[0].rows[0].metricValues[0].value)
    : 0;

  return {
    value,
    cachedAt: new Date().toISOString(),
  };
}

const getCachedTotalSessions = unstable_cache(
  fetchTotalSessions,
  ["ga4-total-sessions"],
  {
    revalidate: CACHE_DURATION,
    tags: ["ga4-analytics", "ga4-sessions"],
  },
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get("path");

    const headers = new Headers({
      "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=300`,
    });

    if (path) {
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      const pageViewsData = await getCachedPageViews(normalizedPath);

      return NextResponse.json(
        {
          path: normalizedPath,
          views: pageViewsData.value,
          cachedAt: pageViewsData.cachedAt,
        },
        { headers },
      );
    }

    const sessionsData = await getCachedTotalSessions();

    return NextResponse.json(
      {
        metric: "sessions",
        label: "Total Sessions",
        total: sessionsData.value,
        cachedAt: sessionsData.cachedAt,
      },
      { headers },
    );
  } catch (err: unknown) {
    console.error("GA4 API Error:", err);
    return NextResponse.json({
      metric: "sessions",
      label: "Total Sessions",
      total: 0,
      views: 0,
      cachedAt: new Date().toISOString(),
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const revalidateSecret = process.env.REVALIDATE_SECRET;

    if (revalidateSecret && body.secret !== revalidateSecret) {
      return NextResponse.json(
        { error: "Invalid revalidation secret" },
        { status: 401 },
      );
    }

    revalidateTag("ga4-analytics", "max");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: "Analytics cache has been revalidated",
    });
  } catch (err: unknown) {
    console.error("Revalidation Error:", err);
    return NextResponse.json(
      {
        error: "Failed to revalidate cache",
        detail: String(err),
      },
      { status: 500 },
    );
  }
}
