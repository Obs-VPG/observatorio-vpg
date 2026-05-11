import CaseLocationMap from "@/components/CaseLocationMap";
import CollapsibleBodyContent from "@/components/CollapsibleBodyContent";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import VictimProfile from "@/components/VictimProfile";
import { cn } from "@/lib/utils";
import { Person } from "@/payload-types";
import config from "@payload-config";
import { ExternalLink } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
const payload = await getPayload({ config });

export type ConflitoPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: ConflitoPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  // const doc = (await getDocBySlug('pages', slug)) as Page | null;
  // if (!doc) return { title: 'Observatório de Violência Política de Gênero' };
  return {
    title: `Observatório de Violência Política de Gênero`,
    // description: doc.description
  };
}

export default async function ConflitoPage({ params }: ConflitoPageProps) {
  const { slug } = await params;
  const res = await payload.find({
    collection: "cases",
    where: { slug: { equals: slug } },
  });
  if (!(res.docs?.length > 0)) return null;
  const doc = res.docs[0];
  const startDate = doc.startDate ? new Date(doc.startDate) : false;
  const endDate = doc.endDate ? new Date(doc.endDate) : false;
  let dateOptions =
    doc.dateAccuracy === "day"
      ? { year: "numeric", month: "numeric", day: "numeric" }
      : doc.dateAccuracy === "month"
        ? { year: "numeric", month: "numeric" }
        : { year: "numeric" };
  return (
    <div className="mx-auto w-full px-6 py-8 md:px-10 lg:py-12 xl:px-16 xl:py-20">
      {startDate ? (
        <p
          className={cn(
            "text-everglade mb-2 text-center text-sm font-medium tracking-wider uppercase md:mb-3 lg:text-base xl:mb-5",
          )}
        >
          {startDate ? (
            <span>
              {startDate.toLocaleDateString("pt-BR", dateOptions as any)}
            </span>
          ) : null}
          {endDate && !doc.isActive ? (
            <span>
              {" "}
              - {endDate.toLocaleDateString("pt-BR", dateOptions as any)}
            </span>
          ) : null}
          {doc.isActive ? <span>- Presente</span> : null}
        </p>
      ) : null}
      <h1
        className={cn(
          "mb-8 text-center text-3xl leading-[1.15] font-bold text-balance md:text-4xl lg:mb-10 lg:text-5xl xl:mb-16 xl:text-[5svw]",
        )}
      >
        {doc.name}
      </h1>
      <CollapsibleBodyContent text={doc.description} />

      <div className="my-12 grid items-center gap-6 md:grid-cols-2 lg:my-24 xl:my-32">
        <div className="bg-light-green relative h-full min-h-64 w-full overflow-hidden rounded border xl:min-h-112">
          <CaseLocationMap doc={doc} />
        </div>

        {/* Caracteristicas */}
        <div className="flex flex-col flex-wrap gap-4 md:gap-6">
          {/* Vítima */}
          <div>
            <p className="text-muted-foreground mb-1.5 text-xs tracking-wider uppercase md:mb-2">
              Quem sofreu essa violência
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {doc?.victim
                ? doc?.victim?.map((victim, index) => {
                    return (
                      <HoverCard
                        key={`${doc.id}-badge-victim-${index}-${(victim as Person).id}`}
                      >
                        <HoverCardTrigger>
                          <Badge
                            className="cursor-help py-0.5 md:h-auto md:px-3 md:text-sm"
                            variant={"secondary"}
                          >
                            {(victim as Person).name}
                          </Badge>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <VictimProfile victim={victim as Person} />
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })
                : null}
            </div>
          </div>
          {/* Intersecções */}
          {doc?.intersectionNames && doc.intersectionNames.length > 0 ? (
            <div>
              <p className="text-muted-foreground mb-1.5 text-xs tracking-wider uppercase md:mb-2">
                Intersecções do conflito
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {doc?.intersectionNames?.map((intersection, index) => {
                  return (
                    <Badge
                      key={`${doc.id}-badge-intersection-${index}-${intersection}`}
                      className="py-0.5 md:h-auto md:px-3 md:text-sm"
                    >
                      {intersection}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Tipos de Violência */}

          {doc?.typeNames && doc.typeNames.length > 0 ? (
            <div>
              <p className="text-muted-foreground mb-1.5 text-xs tracking-wider uppercase md:mb-2">
                Tipos de violência
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {doc?.typeNames?.map((typeName, index) => {
                  return (
                    <Badge
                      key={`${doc.id}-badge-type-${index}-${typeName}`}
                      className="py-0.5 md:h-auto md:px-3 md:text-sm"
                    >
                      {typeName}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ) : null}
          {/* Atores */}

          {doc?.actorNames && doc.actorNames.length > 0 ? (
            <div>
              <p className="text-muted-foreground mb-1.5 text-xs tracking-wider uppercase md:mb-2">
                Atores envolvidos
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {doc?.actorNames?.map((typeName, index) => {
                  return (
                    <Badge
                      key={`${doc.id}-badge-type-${index}-${typeName}`}
                      className="py-0.5 md:h-auto md:px-3 md:text-sm"
                    >
                      {typeName}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ) : null}
          {/* Esfera */}
          <div>
            <p className="text-muted-foreground mb-1.5 text-xs tracking-wider uppercase md:mb-2">
              Esfera do ocorrido
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="px-3 py-0.5 wrap-break-word whitespace-normal md:h-auto md:text-sm">
                {doc.sphere === "Outro" ? doc.sphereOther : doc.sphere}
              </Badge>
            </div>
          </div>
        </div>
        {/* Caracteristicas - END */}
      </div>
      {doc.refs && doc.refs.length > 0 ? (
        <>
          <div className="mb-4 text-xl font-bold">Referências</div>
          <div className="grid gap-6 xl:gap-8">
            {doc.refs.map((ref) => {
              return (
                <Link
                  key={ref.id}
                  href={ref.url}
                  target="_blank"
                  className="group"
                >
                  <p className="decoration-yellow-orange max-w-4xl leading-snug text-pretty decoration-2 underline-offset-2 group-hover:underline md:mb-0.5 md:text-lg">
                    {ref.description}{" "}
                    <ExternalLink className="text-yellow-orange -mt-2 ml-1 inline-block size-3 shrink-0" />
                  </p>

                  <p className="text-muted-foreground group-hover:text-everglade text-xs leading-tight opacity-80 md:text-sm">
                    {ref.url && ref.url?.length > 96
                      ? ref.url?.slice(0, 96) + "..."
                      : ref.url}
                  </p>
                </Link>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
