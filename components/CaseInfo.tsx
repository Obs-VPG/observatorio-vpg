'use client';

import { Case } from '@/payload-types';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Pin } from 'lucide-react';

export type CaseInfoProps = { data: Case; size?: 'md' | 'sm' };

export default function CaseInfo({ data, size = 'sm' }: CaseInfoProps) {
  const [min, max] = size === 'md' ? [120, 130] : [78, 84];
  return (
    <div className={cn('flex cursor-pointer flex-col')}>
      <h2
        className={cn(
          'mb-1 text-base font-bold leading-tight',
          size === 'md' && 'text-xl text-balance'
        )}
      >
        {data.name}
      </h2>
      <p
        className={cn(
          'text-muted-foreground leading-snug text-sm mb-2',
          size === 'md' && 'text-base'
        )}
      >
        {data.description.length > max
          ? data.description.slice(0, min) + '...'
          : data.description}
      </p>
      <div className={cn(size === 'md' && 'flex gap-2 items-center')}>
        <Link href={`/conflito/${data.slug}`} title={data.name}>
          <Button
            size={size === 'md' ? 'default' : 'sm'}
            className={cn('w-full', size === 'md' && 'w-auto')}
            variant={'secondary'}
          >
            Acessar caso
          </Button>
        </Link>
        {size === 'md' && (
          <Button variant={'outline'}>
            <Pin />
            Centralizar no mapa
          </Button>
        )}
      </div>
    </div>
  );
}
