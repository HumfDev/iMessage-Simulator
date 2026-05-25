import { forwardRef, type ReactNode } from 'react';
import {
  MESSAGE_EDGE_INSET_CQW,
  MESSAGE_VIEWPORT,
  skeletonCqw,
} from '@/lib/skeletonLayout';
import './imessage.css';

type Props = {
  children: ReactNode;
};

export const MessageViewport = forwardRef<HTMLDivElement, Props>(
  function MessageViewport({ children }, ref) {
    const edgeInset = `${MESSAGE_EDGE_INSET_CQW}cqw`;

    return (
      <div
        ref={ref}
        className="absolute overflow-x-hidden overflow-y-auto bg-transparent"
        style={{
          top: MESSAGE_VIEWPORT.top,
          left: MESSAGE_VIEWPORT.left,
          width: MESSAGE_VIEWPORT.width,
          height: MESSAGE_VIEWPORT.height,
          paddingLeft: edgeInset,
          paddingRight: edgeInset,
        }}
      >
        <div
          className="flex min-h-full flex-col justify-start"
          style={{
            gap: skeletonCqw(3),
            paddingTop: skeletonCqw(2),
            paddingBottom: skeletonCqw(10),
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);
