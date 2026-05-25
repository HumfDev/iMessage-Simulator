type Props = {
  playing: boolean;
  timeMs: number;
  totalMs: number;
  exporting: boolean;
  exportStatus: string | null;
  onPlay: () => void;
  onRestart: () => void;
  onExport: () => void;
};

function formatTime(ms: number): string {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, '0')}`;
}

export function PlaybackBar({
  playing,
  timeMs,
  totalMs,
  exporting,
  exportStatus,
  onPlay,
  onRestart,
  onExport,
}: Props) {
  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-3">
      <div className="flex w-full flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onPlay}
          className="min-w-[120px] rounded-xl bg-[#007AFF] px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-[#0066DD]"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Restart
        </button>
        <button
          type="button"
          onClick={onExport}
          disabled={exporting || totalMs === 0}
          className="min-w-[140px] rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-emerald-700 disabled:opacity-50"
        >
          {exporting ? 'Exporting…' : 'Export Video'}
        </button>
      </div>
      <p className="text-sm text-gray-500">
        {formatTime(timeMs)} / {formatTime(totalMs)} · 1920×1080 green screen MP4
      </p>
      {exportStatus && (
        <p
          className={`max-w-md text-center text-xs ${
            exportStatus.startsWith('Error') ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          {exportStatus}
        </p>
      )}
    </div>
  );
}
