import { useCallback, useEffect, useRef, useState } from 'react';
import type { Conversation } from '@/types/conversation';
import { getTotalDurationMs } from '@/lib/timeline';

export function usePlayback(conversation: Conversation) {
  const [timeMs, setTimeMs] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  const totalMs = getTotalDurationMs(conversation);

  const restart = useCallback(() => {
    setTimeMs(0);
    setPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setPlaying((p) => {
      if (!p) lastRef.current = performance.now();
      return !p;
    });
  }, []);

  useEffect(() => {
    if (!playing) return;

    const tick = (now: number) => {
      const delta = now - lastRef.current;
      lastRef.current = now;
      setTimeMs((t) => {
        const next = t + delta;
        if (next >= totalMs) {
          setPlaying(false);
          return totalMs;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, totalMs]);

  useEffect(() => {
    if (timeMs > totalMs) setTimeMs(totalMs);
  }, [totalMs, timeMs]);

  return {
    timeMs,
    setTimeMs,
    playing,
    setPlaying,
    totalMs,
    togglePlay,
    restart,
  };
}
