import './imessage.css';

export function TypingIndicator() {
  return (
    <div className="typing-row">
      <div className="typing-bubble">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="typing-dot animate-bounce-dot"
            style={{ animationDelay: `${i * 300}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
