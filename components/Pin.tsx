import { cn } from '@/lib/utils';

export default function Pin({ isActive = false }) {
  return (
    <div className="size-6 group flex items-center justify-center">
      <div
        className={cn(
          'size-2 group-hover:size-5 duration-75 ease-in-out rounded-full cursor-pointer bg-everglade',
          isActive && 'bg-yellow-orange-500 size-5 z-20'
        )}
      ></div>
    </div>
  );
}
