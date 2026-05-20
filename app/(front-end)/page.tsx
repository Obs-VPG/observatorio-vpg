import BlockRenderer from "@/components/blocks/BlockRenderer";
import Logo from "@/components/Logo";
import Logos from "@/components/Logos";
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
  return (
    <div className="flex h-[calc(100svh-4rem)] flex-col items-center justify-between">
      <div className="flex h-full flex-col items-center justify-center">
        <Logo className="max-w-5/6" />
      </div>

      <div className="grid py-8">
        <div className="border-everglade/5 relative overflow-hidden bg-[#fff] p-4 px-1">
          <div className="pointer-events-none absolute top-0 left-1 z-2 h-full w-36 bg-linear-to-r from-[#fff] to-transparent"></div>
          <div className="pointer-events-none absolute top-0 right-1 z-2 h-full w-36 bg-linear-to-l from-[#fff] to-transparent"></div>
          <Logos />
        </div>
      </div>
    </div>
  );
}
