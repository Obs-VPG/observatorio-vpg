"use server";

import { CollectionSlug, getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });
export async function getDocBySlug(
  collectionSlug: CollectionSlug,
  slug: string,
) {
  const data = await payload.find({
    collection: collectionSlug,
    where: { slug: { equals: slug } },
    depth: 2,
    pagination: false,
    limit: 1,
  });
  if (!(data.docs.length > 0)) return null;
  return data.docs[0];
}
