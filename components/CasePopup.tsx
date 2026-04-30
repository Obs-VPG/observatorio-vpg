'use client';

import { Case } from '@/payload-types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';
import CaseInfo from './CaseInfo';

export type CasePopupProps = { CASE: Case };

export default function CasePopup({ CASE }: CasePopupProps) {
  return (
    <div
      key={CASE.id}
      className="group relative font-sans flex w-56 cursor-pointer flex-col rounded-sm border bg-white shadow-lg  @container group-[.maplibregl-popup-anchor-bottom-left]:rounded-bl-none group-[.maplibregl-popup-anchor-bottom-right]:rounded-br-none group-[.maplibregl-popup-anchor-top-left]:rounded-tl-none group-[.maplibregl-popup-anchor-top-right]:rounded-tr-none p-3 md:p-4"
    >
      <CaseInfo data={CASE} />
    </div>
  );
}
