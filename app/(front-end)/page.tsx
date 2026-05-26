import Hero from "@/components/Homepage/Hero";
import LastCases from "@/components/Homepage/LastCases";
import { Page } from "@/payload-types";
import config from "@payload-config";
import { Metadata } from "next";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export const metadata: Metadata = {
  title: "Observatório de Violência Política de Gênero",
};

export default async function IndexPage({}) {
  const data = await payload.findGlobal({
    slug: "config",
    depth: 3,
    select: { homepage: true },
  });
  const doc = data.homepage as Page;
  if (!doc) return "Not found.";
  const { docs: cases } = await payload.find({
    collection: "cases",
    limit: 5,
    sort: "-createdAt",
  });
  return (
    <>
      <Hero />
      <LastCases cases={cases} />
    </>
  );
}
