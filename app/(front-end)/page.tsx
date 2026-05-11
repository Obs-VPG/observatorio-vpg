import config from "@payload-config";
import { Metadata } from "next";
import { getPayload } from "payload";

const payload = await getPayload({ config });

export const metadata: Metadata = {
  title: "Observatório de Violência Política de Gênero",
};
export default async function Page() {
  return <></>;
}
