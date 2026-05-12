import MapPage from "@/components/MapPage";
import config from "@payload-config";
import { Metadata } from "next";
import { getPayload, Where } from "payload";

const payload = await getPayload({ config });

export const metadata: Metadata = {
  title: "Observatório de Violência Política de Gênero",
};

export type MapPageProps = {
  searchParams: Promise<{
    q: string;
    filters: string;
  }>;
};

export default async function Page({
  searchParams: searchParamsPromise,
}: MapPageProps) {
  const { q: query, filters } = await searchParamsPromise;

  const queryOr: Where = {
    or: [
      {
        name: {
          like: query,
        },
      },
      {
        description: {
          like: query,
        },
      },
    ],
  };

  const filtersData = await payload.find({
    collection: "definedTerms",
    pagination: false,
    select: { name: true, additionalType: true, slug: true },
    where: {
      or: [
        { additionalType: { equals: "offenseType" } },
        { additionalType: { equals: "intersection" } },
      ],
    },
  });

  const offenseTypeSlugs = filtersData.docs
    ?.filter((d) => d.additionalType === "offenseType")
    .map((d) => d.slug);
  const intersectionSlugs = filtersData.docs
    ?.filter((d) => d.additionalType === "intersection")
    .map((d) => d.slug);

  const intersections = filters
    ? filters.split(",").filter((f) => intersectionSlugs.includes(f))
    : [];

  const offenseTypes = filters
    ? filters.split(",").filter((f) => offenseTypeSlugs.includes(f))
    : [];

  const filtersIn: Where = filters
    ? {
        and: [
          ...(intersections.length > 0
            ? intersections.map((slug) => ({
                "intersections.slug": {
                  equals: slug,
                },
              }))
            : []),

          ...(offenseTypes.length > 0
            ? offenseTypes.map((slug) => ({
                "offenseType.slug": {
                  equals: slug,
                },
              }))
            : []),
        ],
      }
    : {};

  const casesData = await payload.find({
    collection: "cases",
    pagination: false,
    select: {
      name: true,
      description: true,
      geo: true,
      slug: true,
      startDate: true,
      endDate: true,
      dateAccuracy: true,
      isActive: true,
      typeNames: true,
      intersectionNames: true,
    },
    ...(query || filters
      ? {
          where: {
            ...(query ? queryOr : {}),
            ...filtersIn,
          },
        }
      : {}),
  });
  if (!casesData.docs) return;
  return (
    <>
      <MapPage cases={casesData.docs} filters={filtersData.docs} />
    </>
  );
}
