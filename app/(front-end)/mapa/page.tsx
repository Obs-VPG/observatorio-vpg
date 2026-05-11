import MainWrapper from "@/components/MainWrapper";
import config from "@payload-config";
import { Metadata } from "next";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export const metadata: Metadata = {
  title: "Observatório de Violência Política de Gênero",
};
export default async function Page() {
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
  });
  return (
    <>
      <MainWrapper cases={casesData.docs} />
    </>
  );
}
