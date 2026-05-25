import { COMPOSER_TEXT, skeletonCqw } from '@/lib/skeletonLayout';

type Props = {
  text: string;
  showCaret: boolean;
  visible: boolean;
};

/** Typewriter text centered in the skeleton composer pill */
export function ComposerOverlay({ text, showCaret, visible }: Props) {
  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute flex items-center overflow-hidden"
      style={{
        top: COMPOSER_TEXT.top,
        left: COMPOSER_TEXT.left,
        width: COMPOSER_TEXT.width,
        height: COMPOSER_TEXT.height,
        paddingLeft: skeletonCqw(25),
        fontSize: skeletonCqw(17),
        fontWeight: 400,
        color: '#1C1C1E',
        letterSpacing: '-0.022em',
      }}
    >
      <span className="min-w-0 truncate whitespace-pre">{text}</span>
      {showCaret && (
        <span
          className="ml-px shrink-0 animate-pulse bg-[#007AFF]"
          style={{ width: skeletonCqw(1.5), height: skeletonCqw(17) }}
        />
      )}
    </div>
  );
}
