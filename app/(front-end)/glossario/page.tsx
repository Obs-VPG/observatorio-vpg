import { definedTermsOptions } from "@/collections/DefinedTerms";
import GlossaryTerm from "@/components/GlossaryTerm";
import GlossaryTermCategory from "@/components/GlossaryTermCategory";
import { getDocBySlug } from "@/lib/local-api";
import { mapArray } from "@/lib/utils";
import { DefinedTerm } from "@/payload-types";
import config from "@payload-config";
import Link from "next/link";
import { getPayload } from "payload";
const payload = await getPayload({ config });

export type GlossarioProps = {};
const filtersMap = mapArray(definedTermsOptions, "value", "label");
export default async function Glossario(props: GlossarioProps) {
  const page = await getDocBySlug("pages", "glossario");
  const termos = await payload.find({
    collection: "definedTerms",
    where: { description: { exists: true } },
    pagination: false,
    // sort: "-additionalType",
  });
  if (!termos.docs) return null;
  const groups = Object.groupBy(termos.docs, (e) => e.additionalType);
  return (
    <>
      <h1 className="my-40 mb-16 px-6 text-[15svw] font-black md:hidden md:px-10 lg:text-9xl xl:px-16">
        Glossário
      </h1>

      <div className="grid px-6 text-balance md:px-10 lg:py-12 xl:px-16">
        {Object.keys(groups).map((key) => {
          // @ts-ignore
          const group = groups[key];
          if (!(group.length > 0)) return null;
          console.log(key);
          return (
            <GlossaryTermCategory
              filtersMap={filtersMap}
              group={group}
              groupKeys={Object.keys(groups)}
              key={key}
              groupKey={key}
            />
          );
        })}
      </div>
    </>
  );
}
