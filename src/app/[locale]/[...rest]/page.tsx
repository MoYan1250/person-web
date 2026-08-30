import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

export default function CatchAllPage() {
  notFound();
}
