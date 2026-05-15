import { DefinedTerm } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";
const payload = await getPayload({ config });

export type GlossarioProps = {};
const filtersMap = {
  intersection: "Intersecção",
  offenseType: "Tipo de Violência",
  actors: "Atores",
  genderIdentity: "Identidade de gênero",
  racialIdentity: "Identidade étnico-racial",
  ageGroup: "Faixa etária",
};
export default async function Glossario(props: GlossarioProps) {
  const termos = await payload.find({
    collection: "definedTerms",
    where: { description: { exists: true } },
    pagination: false,
  });
  if (!termos.docs) return null;
  console.log(termos.docs);
  const groups = Object.groupBy(termos.docs, (e) => e.additionalType);
  console.log(groups);
  return (
    <div className="grid px-6 py-8 text-balance md:px-10 lg:py-12 xl:px-16 xl:py-20">
      {Object.keys(groups).map((key) => {
        // @ts-ignore
        const group = groups[key];
        return (
          <div className="grid">
            <h2 className="sticky top-14 z-2 flex items-center gap-6 bg-linear-to-b from-[#fff] via-[#fff] to-transparent pt-6 pb-12 text-sm tracking-widest uppercase md:text-base">
              <div className="bg-yellow-orange size-2 rounded-full"></div>{" "}
              {filtersMap[key as "racialIdentity"]}
            </h2>
            {group?.map((termo: DefinedTerm) => {
              return (
                <div key={`${termo.id}`} className="mb-[25vh]">
                  <h3 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
                    {termo.name.toLocaleLowerCase()}
                  </h3>
                  <p className="text-muted-foreground max-w-prose text-lg leading-relaxed font-thin md:text-xl lg:text-2xl">
                    {termo.description}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
