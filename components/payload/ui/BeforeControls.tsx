"use client";

import { DynamicContentLink } from "@/components/DynamicContentLink";
import { useDocumentInfo, useField } from "@payloadcms/ui";
import { ExternalLink } from "lucide-react";
import type { BeforeDocumentControlsClientProps } from "payload";

export function VisitContent(props: BeforeDocumentControlsClientProps) {
  const { value: slug } = useField({ path: "slug" });
  const { collectionSlug } = useDocumentInfo();
  return (
    <DynamicContentLink
      slug={slug as string}
      collection={collectionSlug as string}
      target="_blank"
    >
      Visitar <ExternalLink className="size-4" />
    </DynamicContentLink>
  );
}
