"use client";

import { DefinedTerm, Person } from "@/payload-types";
import GlossarioHoverInfo from "./GlossarioHoverInfo";

export type VictimProfileProps = { victim: Person };

export default function VictimProfile({ victim }: VictimProfileProps) {
  return (
    <div>
      <h3 className="mb-3 font-bold md:text-lg">{victim.name}</h3>
      <div className="grid gap-2">
        {victim.filiation ? (
          <div className="">
            <p className="text-muted-foreground mb-0.5 text-[10px] tracking-wider uppercase">
              Filiação
            </p>
            <p className="text-sm">{victim.filiation}</p>
          </div>
        ) : null}

        {victim.occupation ? (
          <div className="">
            <p className="text-muted-foreground mb-0.5 text-[10px] tracking-wider uppercase">
              Cargo/ocupação
            </p>
            <p className="text-sm">{victim.occupation}</p>
          </div>
        ) : null}

        {victim.genderIdentity ? (
          <div className="">
            <p className="text-muted-foreground mb-0.5 flex gap-2 text-[10px] tracking-wider uppercase">
              Identidade de Gênero <GlossarioHoverInfo />
            </p>
            <p className="text-sm">
              {(victim.genderIdentity as DefinedTerm).name}
            </p>
          </div>
        ) : null}

        {victim.sexualOrientation ? (
          <div className="">
            <p className="text-muted-foreground mb-0.5 flex gap-2 text-[10px] tracking-wider uppercase">
              Orientação Sexual <GlossarioHoverInfo />
            </p>
            <p className="text-sm">
              {(victim.sexualOrientation as DefinedTerm).name}
            </p>
          </div>
        ) : null}
        {victim.racialIdentity ? (
          <div className="">
            <p className="text-muted-foreground mb-0.5 flex gap-2 text-[10px] tracking-wider uppercase">
              Identidade étnico-racial <GlossarioHoverInfo />
            </p>
            <p className="text-sm">
              {(victim.racialIdentity as DefinedTerm).name}
            </p>
          </div>
        ) : null}
        {(victim.racialIdentity === "69f149c82d5e7b3179a34da8" ||
          (victim.racialIdentity as DefinedTerm).id ===
            "69f149c82d5e7b3179a34da8") &&
        victim.indigenousEthnicGroup ? (
          <div className="">
            <p className="text-muted-foreground mb-0.5 text-[10px] tracking-wider uppercase">
              Etnia Indígena
            </p>
            <p className="text-sm">{victim.indigenousEthnicGroup}</p>
          </div>
        ) : null}
        {victim.quilombola ? (
          <div className="">
            <p className="text-muted-foreground mb-0.5 text-[10px] tracking-wider uppercase">
              Quilombola
            </p>
            <p className="text-sm">Sim</p>
          </div>
        ) : null}
        {victim.ageGroup ? (
          <div className="">
            <p className="text-muted-foreground mb-0.5 text-[10px] tracking-wider uppercase">
              Faixa Etária
            </p>
            <p className="text-sm">{(victim.ageGroup as DefinedTerm).name}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
