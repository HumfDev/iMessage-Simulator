import type { CSSProperties } from 'react';
import type { Conversation } from '@/types/conversation';
import { CHROMA_GREEN, EXPORT_HEIGHT, EXPORT_WIDTH } from '@/lib/constants';
import {
  PHONE_STAGE_HEIGHT_RATIO,
  SKELETON_ASPECT,
} from '@/lib/skeletonLayout';
import { getSceneState } from '@/lib/timeline';
import { PhoneScreen } from '@/components/imessage/PhoneScreen';

type Props = {
  conversation: Conversation;
  timeMs: number;
  /** When true, renders at full 1920×1080 export size */
  exportSize?: boolean;
};

/** Portrait phone fills stage height; square asset shown via object-contain */
const phoneFitStyle: CSSProperties = {
  height: `${PHONE_STAGE_HEIGHT_RATIO * 100}%`,
  width: 'auto',
  maxWidth: '100%',
  aspectRatio: SKELETON_ASPECT,
};

function StageFrame({
  children,
  exportSize,
}: {
  children: React.ReactNode;
  exportSize: boolean;
}) {
  return (
    <div
      className="relative overflow-visible"
      style={
        exportSize
          ? {
              width: EXPORT_WIDTH,
              height: EXPORT_HEIGHT,
              background: CHROMA_GREEN,
            }
          : {
              aspectRatio: `${EXPORT_WIDTH} / ${EXPORT_HEIGHT}`,
              width: '100%',
              background: CHROMA_GREEN,
            }
      }
    >
      {children}
    </div>
  );
}

export function AnimationStage({
  conversation,
  timeMs,
  exportSize = false,
}: Props) {
  const scene = getSceneState(conversation, timeMs);

  return (
    <StageFrame exportSize={exportSize}>
      <PhoneScreen
        scene={scene}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={phoneFitStyle}
      />
    </StageFrame>
  );
}
