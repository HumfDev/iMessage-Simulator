import { useRef, type CSSProperties } from 'react';
import type { SceneState } from '@/types/conversation';
import { PhoneSkeleton } from './PhoneSkeleton';
import { MessageViewport } from './MessageViewport';
import { MessageThread } from './MessageThread';
import { ComposerOverlay } from './ComposerOverlay';

type Props = {
  scene: SceneState;
  className?: string;
  style?: CSSProperties;
};

/**
 * Skeleton PNG is the full UI (header, status bar, input bar).
 * We only ADD: message bubbles, typing dots, and typewriter text in the input.
 */
export function PhoneScreen({ scene, className, style }: Props) {
  const messageScrollRef = useRef<HTMLDivElement>(null);

  const showComposer =
    scene.phase === 'outgoing_compose' ||
    (scene.composerText.length > 0 && scene.showComposerCaret);

  return (
    <PhoneSkeleton className={className} style={style}>
      <MessageViewport ref={messageScrollRef}>
        <MessageThread scene={scene} scrollRef={messageScrollRef} />
      </MessageViewport>
      <ComposerOverlay
        text={scene.composerText}
        showCaret={scene.showComposerCaret}
        visible={showComposer}
      />
    </PhoneSkeleton>
  );
}
