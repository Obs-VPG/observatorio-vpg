"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type DynamicContentLinkProps = {
  slug: string;
  collection: string;
  children: React.ReactNode | undefined;
  href?: string;
  className?: string;
  onClick?: any;
  target?: any;
};

export const collectionMap: any = {
  cases: "/conflito",
  pages: "",
};

export function DynamicContentLink(props: DynamicContentLinkProps) {
  const { slug, collection, children, href } = props;
  const { lang } = useParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (lang && !href) {
      if (collectionMap[collection] !== undefined) {
        setUrl(`/${lang}${collectionMap[collection]}/${slug}`);
      } else {
        setUrl(`/${lang}/${collection}/${slug}`);
      }
    } else if (!href) {
      if (collectionMap[collection] !== undefined) {
        setUrl(`/pt-BR${collectionMap[collection]}/${slug}`);
      } else {
        setUrl(`/pt-BR/${collection}/${slug}`);
      }
    }
  }, [lang]);
  return (
    <Link {...props} href={href || url}>
      {children}
    </Link>
  );
}
