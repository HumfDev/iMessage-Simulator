/**
 * Skeleton file is 1024×1024 square. Stage container matches PNG (1:1);
 * MESSAGE_VIEWPORT % account for letterbox inside object-contain.
 */
export const SKELETON_FILE_WIDTH = 1024;
export const SKELETON_FILE_HEIGHT = 1024;

/** Measured bezel edges in iphone-skeleton.png */
export const SKELETON_PHONE_LEFT_PX = 110;
export const SKELETON_PHONE_RIGHT_PX = 907;
export const SKELETON_PHONE_TOP_PX = 40;
export const SKELETON_PHONE_BOTTOM_PX = 1023;

export const SKELETON_VISUAL_PHONE_WIDTH =
  SKELETON_PHONE_RIGHT_PX - SKELETON_PHONE_LEFT_PX + 1;
export const SKELETON_VISUAL_PHONE_HEIGHT =
  SKELETON_PHONE_BOTTOM_PX - SKELETON_PHONE_TOP_PX + 1;

/** Phone screen width as a fraction of the square PNG (≈0.778) */
export const PHONE_WIDTH_IN_SQUARE_RATIO =
  SKELETON_VISUAL_PHONE_WIDTH / SKELETON_FILE_WIDTH;

/** Square PNG aspect — matches object-contain container, not portrait phone */
export const SKELETON_ASPECT = 1;

/**
 * cqw is % of square phone-canvas width; base ≈ 501 so 17px at 390px logical phone width
 * (390 / 0.778)
 */
export const TYPOGRAPHY_BASE_WIDTH =
  390 / PHONE_WIDTH_IN_SQUARE_RATIO;

/** Phone render height as a fraction of stage height */
export const PHONE_STAGE_HEIGHT_RATIO = 0.78;

/** px at design width → scales with .phone-canvas (container-name: phone) */
export function skeletonCqw(px: number): string {
  return `calc(${px} / ${TYPOGRAPHY_BASE_WIDTH} * 100cqw)`;
}

/** Message area (% of square — 15% + 70% = 85%, inside screen bezels) */
export const MESSAGE_VIEWPORT = {
  top: '33%',
  left: '15%',
  width: '70%',
  height: '50%',
};

/** Small cqw inset so typing/bubbles don't touch bezel edge */
export const MESSAGE_EDGE_INSET_CQW = 2;

/** Composer pill text lane (measured from iphone-skeleton.png @ 1024²) */
export const COMPOSER_TEXT = {
  top: '92.58%',
  left: '24%',
  width: '55%',
  height: '3.52%',
};
