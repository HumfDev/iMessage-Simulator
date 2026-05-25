export type MessageSide = 'incoming' | 'outgoing';
export type MessageType = 'text' | 'image';

export type Message =
  | { id: string; side: 'incoming'; type: 'text'; text: string }
  | { id: string; side: 'incoming'; type: 'image'; src: string }
  | { id: string; side: 'outgoing'; type: 'text'; text: string }
  | { id: string; side: 'outgoing'; type: 'image'; src: string };

export type ConversationSettings = {
  incomingTypingMs: number;
  outgoingCharIntervalMs: number;
  pauseAfterSendMs: number;
  statusBarTime: string;
};

export type Contact = {
  name: string;
  avatarSrc: string;
};

export type Conversation = {
  contact: Contact;
  messages: Message[];
  settings: ConversationSettings;
};

export type VisibleMessage = Message & { showDelivered?: boolean };

export type ScenePhase =
  | 'idle'
  | 'incoming_typing'
  | 'incoming_show'
  | 'outgoing_compose'
  | 'outgoing_send'
  | 'outgoing_image';

export type SceneState = {
  phase: ScenePhase;
  visibleMessages: VisibleMessage[];
  showIncomingTyping: boolean;
  composerText: string;
  showComposerCaret: boolean;
  activeMessageIndex: number;
};
