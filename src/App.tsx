import { useCallback, useEffect, useState } from 'react';
import type { Conversation } from '@/types/conversation';
import { loadConversation, saveConversation } from '@/lib/storage';
import { usePlayback } from '@/hooks/usePlayback';
import { ConversationScript } from '@/components/editor/ConversationScript';
import { AnimationStage } from '@/components/animation/AnimationStage';
import { PlaybackBar } from '@/components/animation/PlaybackBar';

export default function App() {
  const [conversation, setConversation] = useState<Conversation>(() =>
    loadConversation(),
  );
  const [exporting, setExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const { timeMs, playing, setPlaying, totalMs, togglePlay, restart } =
    usePlayback(conversation);

  useEffect(() => {
    try {
      saveConversation(conversation);
    } catch {
      /* storage full — app still works */
    }
  }, [conversation]);

  const update = useCallback((patch: Partial<Conversation>) => {
    setConversation((c) => ({ ...c, ...patch }));
  }, []);

  const handlePlay = () => {
    if (timeMs >= totalMs && totalMs > 0) {
      restart();
      setPlaying(true);
      return;
    }
    togglePlay();
  };

  const handleExport = async () => {
    setExporting(true);
    setExportStatus('Rendering video (may take a minute)…');
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error ?? `Export failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'imessage-animation.mp4';
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus('Downloaded imessage-animation.mp4');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Export failed';
      setExportStatus(
        `Error: ${msg}. Run "npm run dev" and try again, or use "npm run render" in terminal.`,
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="w-full shrink-0 border-b border-gray-200 bg-white p-6 lg:w-[400px] lg:border-b-0 lg:border-r lg:overflow-y-auto">
        <h1 className="mb-1 text-xl font-bold text-gray-900">
          iMessage Animation
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Write the conversation, play the animation, export an MP4.
        </p>
        <ConversationScript
          messages={conversation.messages}
          onMessagesChange={(messages) => update({ messages })}
        />
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 overflow-visible bg-[#F5F5F7] p-6">
        <div className="w-full max-w-4xl max-h-[480px] overflow-visible rounded-2xl shadow-xl">
          <AnimationStage conversation={conversation} timeMs={timeMs} />
        </div>
        <PlaybackBar
          playing={playing}
          timeMs={timeMs}
          totalMs={totalMs}
          exporting={exporting}
          exportStatus={exportStatus}
          onPlay={handlePlay}
          onRestart={restart}
          onExport={handleExport}
        />
      </main>
    </div>
  );
}
