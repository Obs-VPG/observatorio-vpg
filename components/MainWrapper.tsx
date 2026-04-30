'use client';

import Logo from '@/components/Logo';
import { MainMap } from '@/components/MainMap';
import { ScrollArea } from '@/components/ui/scroll-area';
import { casesToGeoJSON, cn } from '@/lib/utils';
import { MenuIcon, X } from 'lucide-react';
import { useState } from 'react';
import Logos from './Logos';
import Nav from './Nav';
import { Case } from '@/payload-types';
import CaseInfo from './CaseInfo';
import MapComponent from './Map';

export interface DataPointInterface {
  id: number;
  category: number;
  country: string;
  project_status: number;
  status: number;
  reaction: number;
  locale: string;
  headline: string;
  name: string;
  slug: string;
  general: any;
  commodity: string[];
  company: string[];
  type: string[];
}
export type MainWrapperProps = {
  cases: Case[];
};

export default function MainWrapper({ cases }: MainWrapperProps) {
  const [showMap, useShowMap] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<Case | null>(null);
  return (
    <div className="md:flex h-svh">
      <div className="md:hidden p-3 pb-0">
        <Nav />
      </div>
      <div
        className={cn(
          'w-full md:w-1/2 lg:w-2/5 max-w-xl shrink-0 bg-everglade-50',
          showMap && 'hidden md:block'
        )}
      >
        <ScrollArea className="h-svh w-full border-l p-3">
          <div className="grid gap-2">
            <div className={cn('w-full border border-dashed p-4  bg-white')}>
              <Logo className="w-full max-w-sm" />
              {/* <h1 className="font-medium text-2xl text-foreground mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1> */}
              <p className="font-normal text-muted-foreground">
                Suscipit nesciunt alias necessitatibus molestias vero quas quae
                rem nihil at corrupti assumenda maiores nisi eius iste obcaecati
                aspernatur enim.
              </p>
            </div>
            <div className="w-full border border-dashed p-4 grid gap-8 bg-white relative">
              {cases?.map((CASE, index) => {
                return (
                  <div
                    key={`list-${CASE.id}-${index}`}
                    className=""
                    onMouseEnter={() => setSelectedPoint(CASE)}
                    onMouseLeave={() => setSelectedPoint(null)}
                  >
                    <CaseInfo data={CASE} size="md" />
                  </div>
                );
              })}
            </div>
            <p className="uppercase text-xs tracking-widest mt-3 mx-2 relative z-3 text-muted-foreground">
              Realização
            </p>
            <div className="border border-dashed p-4 px-1 bg-white relative overflow-hidden">
              <div className="absolute left-1 top-0 h-full w-36 bg-linear-to-r from-white to-transparent z-2 pointer-events-none"></div>
              <div className="absolute right-1 top-0 h-full w-36 bg-linear-to-l from-white to-transparent z-2 pointer-events-none"></div>
              <Logos />
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="w-full h-[calc(100svh-94px)] md:h-full p-3">
        <MapComponent
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          data={cases}
        />
        {/* <MainMap
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          data={casesToGeoJSON(cases)}
        /> */}
      </div>
    </div>
  );
}
