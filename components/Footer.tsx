import { getPayload } from "payload";
import config from "@payload-config";
import FooterUI from "./FooterUI";

export type FooterServerProps = {};

export default async function FooterServer(props: FooterServerProps) {
  const payload = await getPayload({ config });
  const configData = await payload.findGlobal({
    slug: "config",
    select: { mainMenu: true },
  });

  return <FooterUI menu={configData.mainMenu}></FooterUI>;
}
