import CaseLocationMap from "@/components/CaseLocationMap";
import CollapsibleBodyContent from "@/components/CollapsibleBodyContent";
import GlossarioInfoPopover from "@/components/GlossarioInfoPopover";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import VictimProfile from "@/components/VictimProfile";
import { cn } from "@/lib/utils";
import { Person } from "@/payload-types";
import config from "@payload-config";
import { ChevronRight, ExternalLink } from "lucide-react";
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
      ? { year: "numeric", month: "long", day: "numeric" }
      : doc.dateAccuracy === "month"
        ? { year: "numeric", month: "long" }
        : { year: "numeric" };
  return (
    <div className="mx-auto w-full px-6 pb-8 md:px-10 lg:pb-12 xl:px-16 xl:pb-20">
      <div className="flex flex-wrap items-center justify-center gap-2 gap-y-1 p-6 text-center text-xs uppercase opacity-30 duration-200 hover:opacity-100 lg:py-8">
        <Link href="/" className="text-everglade hover:text-everglade-600">
          Observatório de Violência Política de Gênero
        </Link>{" "}
        <ChevronRight className="size-4" />{" "}
        <Link href="/mapa" className="text-everglade hover:text-everglade-600">
          Mapa de conflitos
        </Link>{" "}
        <ChevronRight className="size-4" /> Caso
      </div>
      {startDate ? (
        <p
          className={cn(
            "mb-2 text-center text-base md:mb-2 md:text-lg lg:text-xl xl:mb-4",
          )}
        >
          {startDate ? (
            <span>
              {startDate.toLocaleDateString("pt-BR", dateOptions as any)}{" "}
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
          "text-everglade mx-auto mb-8 px-6 text-center text-[8svw] leading-none font-medium text-balance md:px-10 md:text-6xl lg:max-w-5/6 xl:px-16 xl:pt-16 xl:text-7xl",
        )}
      >
        {doc.name}
      </h1>
      <p className="text-muted-foreground mb-2 text-center text-xs tracking-wider uppercase lg:mb-4">
        Resumo
      </p>
      <CollapsibleBodyContent text={doc.description} />
      <div className="my-12 grid items-center gap-6 md:grid-cols-2 lg:my-20 xl:my-24">
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
                      <Popover
                        key={`${doc.id}-badge-victim-${index}-${(victim as Person).id}`}
                      >
                        <PopoverTrigger>
                          <Badge
                            className="cursor-help py-0.5 md:h-auto md:px-3 md:text-sm"
                            variant={"secondary"}
                          >
                            {(victim as Person).name}
                          </Badge>
                        </PopoverTrigger>
                        <PopoverContent>
                          <VictimProfile victim={victim as Person} />
                        </PopoverContent>
                      </Popover>
                    );
                  })
                : null}
            </div>
          </div>
          {/* Intersecções */}
          {doc?.intersectionNames && doc.intersectionNames.length > 0 ? (
            <div>
              <p className="text-muted-foreground mb-1.5 flex gap-2 text-xs tracking-wider uppercase md:mb-2">
                Intersecções do conflito <GlossarioInfoPopover />
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
              <p className="text-muted-foreground mb-1.5 flex gap-2 text-xs tracking-wider uppercase md:mb-2">
                Tipos de violência <GlossarioInfoPopover />
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
              <p className="text-muted-foreground mb-1.5 flex gap-2 text-xs tracking-wider uppercase md:mb-2">
                Atores envolvidos <GlossarioInfoPopover />
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
                {doc.sphere === "Outro" && doc.sphereOther
                  ? doc.sphereOther
                  : doc.sphere}
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
