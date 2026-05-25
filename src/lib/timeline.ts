import type { Conversation, SceneState } from '@/types/conversation';
import {
  DELIVERED_HOLD_MS,
  OUTGOING_IMAGE_COMPOSE_MS,
} from '@/lib/constants';

type Segment = {
  messageIndex: number;
  phase: SceneState['phase'];
  durationMs: number;
};

function buildSegments(conversation: Conversation): Segment[] {
  const { messages, settings } = conversation;
  const segments: Segment[] = [];

  messages.forEach((msg, index) => {
    if (msg.side === 'incoming') {
      segments.push({
        messageIndex: index,
        phase: 'incoming_typing',
        durationMs: settings.incomingTypingMs,
      });
      segments.push({
        messageIndex: index,
        phase: 'incoming_show',
        durationMs: settings.pauseAfterSendMs,
      });
    } else if (msg.type === 'text') {
      const chars = msg.text.length;
      const typeMs = Math.max(chars, 1) * settings.outgoingCharIntervalMs;
      segments.push({
        messageIndex: index,
        phase: 'outgoing_compose',
        durationMs: typeMs,
      });
      segments.push({
        messageIndex: index,
        phase: 'outgoing_send',
        durationMs: DELIVERED_HOLD_MS + settings.pauseAfterSendMs,
      });
    } else {
      segments.push({
        messageIndex: index,
        phase: 'outgoing_image',
        durationMs: OUTGOING_IMAGE_COMPOSE_MS + settings.pauseAfterSendMs,
      });
    }
  });

  return segments;
}

export function getTotalDurationMs(conversation: Conversation): number {
  return buildSegments(conversation).reduce((sum, s) => sum + s.durationMs, 0);
}

export function getTotalDurationFrames(conversation: Conversation, fps: number): number {
  const ms = getTotalDurationMs(conversation);
  return Math.max(1, Math.ceil((ms / 1000) * fps));
}

function findSegmentAtTime(
  segments: Segment[],
  timeMs: number,
): { segment: Segment | null; offsetMs: number; segmentStartMs: number } {
  let elapsed = 0;
  for (const segment of segments) {
    const end = elapsed + segment.durationMs;
    if (timeMs < end) {
      return { segment, offsetMs: timeMs - elapsed, segmentStartMs: elapsed };
    }
    elapsed = end;
  }
  const lastStart = segments.reduce((s, seg) => s + seg.durationMs, 0) - (segments.at(-1)?.durationMs ?? 0);
  return { segment: null, offsetMs: 0, segmentStartMs: lastStart };
}

export function getSceneState(conversation: Conversation, timeMs: number): SceneState {
  const { messages, settings } = conversation;
  const segments = buildSegments(conversation);
  const clampedTime = Math.max(0, Math.min(timeMs, getTotalDurationMs(conversation)));
  const { segment, offsetMs } = findSegmentAtTime(segments, clampedTime);

  const visibleMessages: SceneState['visibleMessages'] = [];
  let showIncomingTyping = false;
  let composerText = '';
  let showComposerCaret = false;
  let phase: SceneState['phase'] = 'idle';
  let activeMessageIndex = -1;

  if (!segment) {
    messages.forEach((m) => visibleMessages.push({ ...m }));
    return {
      phase: 'idle',
      visibleMessages,
      showIncomingTyping: false,
      composerText: '',
      showComposerCaret: false,
      activeMessageIndex: messages.length - 1,
    };
  }

  activeMessageIndex = segment.messageIndex;
  phase = segment.phase;

  for (let i = 0; i < segment.messageIndex; i++) {
    visibleMessages.push({ ...messages[i] });
  }

  const current = messages[segment.messageIndex];

  if (segment.phase === 'incoming_typing') {
    showIncomingTyping = true;
  } else if (segment.phase === 'incoming_show') {
    visibleMessages.push({ ...current });
  } else if (segment.phase === 'outgoing_compose' && current.type === 'text') {
    const charsToShow = Math.min(
      current.text.length,
      Math.floor(offsetMs / settings.outgoingCharIntervalMs),
    );
    composerText = current.text.slice(0, charsToShow);
    showComposerCaret = true;
  } else if (segment.phase === 'outgoing_send' && current.type === 'text') {
    const showDelivered = offsetMs < DELIVERED_HOLD_MS;
    visibleMessages.push({ ...current, showDelivered });
  } else if (segment.phase === 'outgoing_image') {
    if (offsetMs >= OUTGOING_IMAGE_COMPOSE_MS) {
      visibleMessages.push({ ...current });
    }
  }

  return {
    phase,
    visibleMessages,
    showIncomingTyping,
    composerText,
    showComposerCaret,
    activeMessageIndex,
  };
}
