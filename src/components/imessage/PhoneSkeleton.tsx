import type { CSSProperties, ReactNode } from 'react';
import skeletonImg from '@/assets/iphone-skeleton.png';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Portrait container; phone-canvas fills it so cqw matches rendered phone width.
 * Square skeleton PNG is letterboxed inside via object-contain.
 */
export function PhoneSkeleton({ children, className = '', style }: Props) {
  return (
    <div className={`relative ${className}`} style={style}>
      <img
        src={skeletonImg}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
      />
      <div className="phone-canvas pointer-events-none absolute inset-0">
        {children}
      </div>
    </div>
  );
}
