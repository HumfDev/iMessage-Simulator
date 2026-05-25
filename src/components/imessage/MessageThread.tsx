import { useEffect, type RefObject } from 'react';
import type { SceneState } from '@/types/conversation';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

type Props = {
  scene: SceneState;
  scrollRef: RefObject<HTMLDivElement | null>;
};

export function MessageThread({ scene, scrollRef }: Props) {
  useEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;
    viewport.scrollTop = viewport.scrollHeight;
  }, [
    scene.visibleMessages.length,
    scene.showIncomingTyping,
    scene.composerText,
    scene.phase,
    scrollRef,
  ]);

  return (
    <>
      {scene.visibleMessages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {scene.showIncomingTyping && <TypingIndicator />}
      <div className="h-px shrink-0" aria-hidden />
    </>
  );
}
