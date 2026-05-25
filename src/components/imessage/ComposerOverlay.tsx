import { COMPOSER_TEXT, skeletonCqw } from '@/lib/skeletonLayout';

type Props = {
  text: string;
  showCaret: boolean;
  visible: boolean;
};

/** Adds typewriter text inside the skeleton input — does not replace the bar */
export function ComposerOverlay({ text, showCaret, visible }: Props) {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute flex items-center overflow-hidden bg-transparent"
      style={{
        bottom: COMPOSER_TEXT.bottom,
        left: COMPOSER_TEXT.left,
        width: COMPOSER_TEXT.width,
        height: COMPOSER_TEXT.height,
        fontSize: skeletonCqw(17),
        fontWeight: 400,
        lineHeight: 1.3,
        color: '#1C1C1E',
        letterSpacing: '-0.022em',
      }}
    >
      <span className="min-w-0 truncate whitespace-pre">{text}</span>
      {showCaret && (
        <span
          className="ml-px inline-block shrink-0 animate-pulse bg-[#007AFF]"
          style={{ width: skeletonCqw(1.5), height: '1em' }}
        />
      )}
    </div>
  );
}
