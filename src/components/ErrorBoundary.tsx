import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      const isQuota = this.state.error.name === 'QuotaExceededError';
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-lg font-semibold text-gray-900">
            {isQuota ? 'Storage full' : 'Something went wrong'}
          </h1>
          <p className="max-w-md text-sm text-gray-600">
            {isQuota
              ? 'Saved conversation data is too large (often from big photos). Clear site data for this page or remove image attachments, then refresh.'
              : this.state.error.message}
          </p>
          <button
            type="button"
            className="rounded-lg bg-[#007AFF] px-4 py-2 text-sm font-medium text-white"
            onClick={() => {
              try {
                localStorage.removeItem('chatui-conversation');
              } catch {
                /* ignore */
              }
              window.location.reload();
            }}
          >
            Clear saved data & reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
