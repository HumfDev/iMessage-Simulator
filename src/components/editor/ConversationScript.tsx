import type { Message } from '@/types/conversation';

type Props = {
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
};

function newId(): string {
  return crypto.randomUUID();
}

export function ConversationScript({ messages, onMessagesChange }: Props) {
  const addLine = (side: 'incoming' | 'outgoing') => {
    onMessagesChange([
      ...messages,
      { id: newId(), side, type: 'text', text: '' },
    ]);
  };

  const updateText = (index: number, text: string) => {
    const msg = messages[index];
    if (msg.type !== 'text') return;
    const next = [...messages];
    next[index] = { ...msg, text };
    onMessagesChange(next);
  };

  const remove = (index: number) => {
    onMessagesChange(messages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="mb-1 text-base font-semibold text-gray-900">
        Conversation
      </h2>
      <p className="mb-3 text-xs text-gray-500">
        Add lines in order. Them = gray bubbles, Me = blue bubbles.
      </p>
      <div className="flex flex-col gap-2">
        {messages.map((msg, i) => {
          if (msg.type !== 'text') return null;
          return (
          <div
            key={msg.id}
            className={`flex gap-2 rounded-lg border p-2 ${
              msg.side === 'incoming'
                ? 'border-gray-200 bg-gray-50'
                : 'border-blue-100 bg-blue-50/50'
            }`}
          >
            <span
              className={`mt-2 w-12 shrink-0 text-xs font-semibold ${
                msg.side === 'incoming' ? 'text-gray-500' : 'text-[#007AFF]'
              }`}
            >
              {msg.side === 'incoming' ? 'Them' : 'Me'}
            </span>
            <textarea
              value={msg.text}
              onChange={(e) => updateText(i, e.target.value)}
              rows={2}
              placeholder={
                msg.side === 'incoming' ? 'Their message...' : 'Your message...'
              }
              className="min-h-[44px] flex-1 resize-y rounded-md border border-gray-200 bg-white px-2 py-1.5 text-sm"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="shrink-0 self-start px-1 text-xs text-gray-400 hover:text-red-500"
              aria-label="Remove line"
            >
              ×
            </button>
          </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => addLine('incoming')}
          className="flex-1 rounded-lg border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          + Their line
        </button>
        <button
          type="button"
          onClick={() => addLine('outgoing')}
          className="flex-1 rounded-lg bg-[#007AFF] py-2 text-sm font-medium text-white hover:bg-[#0066DD]"
        >
          + My line
        </button>
      </div>
    </div>
  );
}
