import MapPage from "@/components/MapPage";
import { getYearBoundaryISO } from "@/lib/utils";
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
    intersection: string;
    offenseType: string;
    startDate: string;
    endDate: string;
  }>;
};

export default async function Page({
  searchParams: searchParamsPromise,
}: MapPageProps) {
  const {
    q: query,
    intersection,
    offenseType,
    startDate,
    endDate,
  } = await searchParamsPromise;

  let queryOr: Where = {
    or: [],
  };

  if (query) {
    queryOr.or = [
      ...(queryOr.or as Where[]),
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
    ];
  }
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

  const intersections = intersection ? intersection.split(",") : [];

  const offenseTypes = offenseType ? offenseType.split(",") : [];

  const filtersIn: Where =
    offenseTypes.length > 0 || intersections.length > 0
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

  const queryStart = startDate
    ? getYearBoundaryISO(Number(startDate), "min")
    : null;

  const queryEnd = endDate ? getYearBoundaryISO(Number(endDate), "max") : null;

  let dateFilter: Where = {};

  if (queryStart && !queryEnd) {
    queryOr.or = [
      ...(queryOr.or as Where[]),
      {
        startDate: { greater_than_equal: queryStart },
      },
      {
        endDate: { exists: true, greater_than_equal: queryStart },
        startDate: { less_than: queryStart },
      },
      {
        startDate: { less_than: queryStart },
        isActive: { equals: true },
      },
    ];
  }

  if (queryEnd && !queryStart) {
    queryOr.or = [
      ...(queryOr.or as Where[]),
      {
        startDate: { less_than_equal: queryEnd },
      },
    ];
  }

  if (queryEnd && queryStart) {
    queryOr.or = [
      ...(queryOr.or as Where[]),
      {
        startDate: {
          greater_than_equal: queryStart,
          less_than_equal: queryEnd,
        },
      },
      {
        startDate: {
          less_than: queryStart,
        },
        endDate: { exists: true, greater_than_equal: queryStart },
      },
      {
        startDate: {
          less_than: queryStart,
        },
        isActive: { equals: true },
      },
    ];
  }

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
    ...(query ||
    offenseTypes.length > 0 ||
    intersections.length > 0 ||
    queryStart ||
    queryEnd
      ? {
          where: {
            ...(query || queryStart || queryEnd ? queryOr : {}),
            ...filtersIn,
            ...dateFilter,
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
