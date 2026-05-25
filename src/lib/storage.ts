import type { Conversation } from '@/types/conversation';
import { createDefaultConversation, DEFAULT_SETTINGS } from '@/lib/defaults';

const STORAGE_KEY = 'chatui-conversation';

function normalizeConversation(raw: Partial<Conversation>): Conversation {
  const base = createDefaultConversation();
  return {
    contact: {
      name: raw.contact?.name ?? base.contact.name,
      avatarSrc: raw.contact?.avatarSrc ?? '',
    },
    messages: Array.isArray(raw.messages) ? raw.messages : base.messages,
    settings: { ...DEFAULT_SETTINGS, ...raw.settings },
  };
}

export function loadConversation(): Conversation {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultConversation();
    const parsed = JSON.parse(raw) as Partial<Conversation>;
    if (!parsed.contact || !Array.isArray(parsed.messages)) {
      return createDefaultConversation();
    }
    return normalizeConversation(parsed);
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    return createDefaultConversation();
  }
}

export function saveConversation(conversation: Conversation): void {
  try {
    const payload = JSON.stringify(conversation);
    if (payload.length > 4_000_000) {
      console.warn('Conversation too large to save; skipping localStorage persist.');
      return;
    }
    localStorage.setItem(STORAGE_KEY, payload);
  } catch {
    // QuotaExceededError — clear corrupt/oversized entry and continue
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
}
