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
      <div className="mb-[20vh] px-6 py-16 md:hidden md:px-10 xl:px-16">
        <h1 className="text-[15svw] font-medium lg:text-9xl">Glossário</h1>
        <p className="text-muted-foreground">
          Confira a definição de termos que são usados nos cadastros de casos de
          violência política de gênero neste site.
        </p>
      </div>

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
