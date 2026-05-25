import { Composition } from 'remotion';
import { ConversationVideo } from './ConversationVideo';
import type { Conversation } from '@/types/conversation';
import { EXPORT_FPS, EXPORT_HEIGHT, EXPORT_WIDTH } from '@/lib/constants';
import { getTotalDurationFrames } from '@/lib/timeline';
import { SAMPLE_CONVERSATION } from '@/lib/defaults';

export const RemotionRoot: React.FC = () => {
  const durationInFrames = getTotalDurationFrames(
    SAMPLE_CONVERSATION,
    EXPORT_FPS,
  );

  return (
    <>
      <Composition
        id="ConversationVideo"
        component={ConversationVideo}
        durationInFrames={durationInFrames}
        fps={EXPORT_FPS}
        width={EXPORT_WIDTH}
        height={EXPORT_HEIGHT}
        defaultProps={{ conversation: SAMPLE_CONVERSATION }}
        calculateMetadata={({ props }: { props: { conversation: Conversation } }) => {
          const conv = props.conversation;
          return {
            durationInFrames: getTotalDurationFrames(conv, EXPORT_FPS),
          };
        }}
      />
    </>
  );
};
