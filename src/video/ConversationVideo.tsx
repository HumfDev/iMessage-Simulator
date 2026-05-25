import { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import type { Conversation } from '@/types/conversation';
import { AnimationStage } from '@/components/animation/AnimationStage';

export type ConversationVideoProps = {
  conversation: Conversation;
};

export const ConversationVideo: React.FC<ConversationVideoProps> = ({
  conversation,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = useMemo(() => (frame / fps) * 1000, [frame, fps]);

  return (
    <AnimationStage
      conversation={conversation}
      timeMs={timeMs}
      exportSize
    />
  );
};
