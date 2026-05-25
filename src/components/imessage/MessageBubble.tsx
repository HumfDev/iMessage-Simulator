import type { VisibleMessage } from '@/types/conversation';
import './imessage.css';

type Props = {
  message: VisibleMessage;
};

export function MessageBubble({ message }: Props) {
  const isOutgoing = message.side === 'outgoing';

  if (message.type === 'image') {
    return (
      <div
        className={`bubble-row ${isOutgoing ? 'bubble-row--outgoing' : 'bubble-row--incoming'}`}
      >
        <img
          src={message.src}
          alt=""
          className={`bubble-image ${isOutgoing ? 'bubble-image--outgoing' : 'bubble-image--incoming'}`}
        />
      </div>
    );
  }

  return (
    <div
      className={`bubble-row ${isOutgoing ? 'bubble-row--outgoing !flex-col !items-end' : 'bubble-row--incoming !flex-col !items-start'}`}
    >
      <div
        className={`bubble-body ${isOutgoing ? 'bubble-body--outgoing' : 'bubble-body--incoming'}`}
      >
        {message.text}
      </div>
      {isOutgoing && message.showDelivered && (
        <span className="bubble-delivered">Delivered</span>
      )}
    </div>
  );
}
