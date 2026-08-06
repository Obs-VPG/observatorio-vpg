

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import { Users } from "./collections/Users";

import { en } from "@payloadcms/translations/languages/en";
import { pt } from "@payloadcms/translations/languages/pt";
import { DefinedTerms } from "./collections/DefinedTerms";
import { Cases } from "./collections/Cases";
import { Persons } from "./collections/Persons";
import { Pages } from "./collections/Pages";
import { Config } from "./collections/Config";
import { Posts } from "./collections/Posts";

export default buildConfig({
  maxDepth: 3,
  admin: {
    autoRefresh: true,
    autoLogin:
      process.env.NODE_ENV === "development"
        ? {
            email: process.env.DEV_EMAIL || "",
            password: process.env.DEV_PASS || "",
            prefillOnly: true,
          }
        : false,
    components: {
      // beforeDashboard: ['@/components/payload/BeforeDashboard'],
      graphics: {
        Icon: "@/components/payload/PayloadIcon",
        Logo: "@/components/payload/PayloadLogo",
      },
      // Nav: '@/components/payload/Nav#Nav'
    },
    meta: {
      title: "Painel de administração",
      titleSuffix: " - Observatório de Violência Política de Gênero",
      description:
        "Uma iniciativa do Núcleo de Estudos Interdisciplinares sobre a Mulher da UFBA.",
      //   icons: [
      //     {
      //       rel: 'icon',
      //       type: 'image/png',
      //       url: '/icon.png'
      //     }
      //   ]
    },
  },
  i18n: {
    fallbackLanguage: "pt", // default
    supportedLanguages: { en, pt },
  },
  editor: lexicalEditor(),
  globals: [Config],
  collections: [Pages, Posts, Cases, DefinedTerms, Users, Persons],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url:
      process.env.NODE_ENV === "production"
        ? process.env.DATABASE_URL || ""
        : process.env.DATABASE_URL_DEV || "",
  }),
  //   email: resendAdapter({
  //     defaultFromAddress: 'onboarding@resend.dev',
  //     defaultFromName: 'Site INCT Antirracismo',
  //     apiKey: process.env.RESEND_API_KEY || ''
  //   }),

});
