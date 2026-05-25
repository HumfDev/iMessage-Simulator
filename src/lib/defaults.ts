import type { Conversation } from '@/types/conversation';

export const DEFAULT_SETTINGS: Conversation['settings'] = {
  incomingTypingMs: 1000,
  outgoingCharIntervalMs: 45,
  pauseAfterSendMs: 400,
  statusBarTime: '6:07',
};

export const SAMPLE_CONVERSATION: Conversation = {
  contact: {
    name: 'Kleo',
    avatarSrc: '',
  },
  messages: [
    {
      id: '1',
      side: 'incoming',
      type: 'text',
      text: 'what kind of role are you looking for?',
    },
    {
      id: '2',
      side: 'incoming',
      type: 'text',
      text: 'Looking for jobs now!',
    },
    {
      id: '3',
      side: 'outgoing',
      type: 'text',
      text: 'Quant, $150k+',
    },
  ],
  settings: { ...DEFAULT_SETTINGS },
};

export function createDefaultConversation(): Conversation {
  return JSON.parse(JSON.stringify(SAMPLE_CONVERSATION)) as Conversation;
}
