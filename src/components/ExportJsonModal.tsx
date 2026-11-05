import React, { useState } from 'react';
import { X, Copy, Check, Download, RotateCcw } from 'lucide-react';
import { VibeProject } from '../types/project';

interface ExportJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: VibeProject[];
  onResetDefaults: () => void;
}

export const ExportJsonModal: React.FC<ExportJsonModalProps> = ({
  isOpen,
  onClose,
  projects,
  onResetDefaults,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(projects, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'living-lab-projects.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-zinc-200 shadow-xl p-6 md:p-8 my-8">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100">
          <div>
            <h2
              id="export-modal-title"
              className="text-xl font-bold tracking-tight text-zinc-900"
            >
              Export Showcase Data (JSON)
            </h2>
            <p className="mt-1 text-xs md:text-sm text-zinc-600">
              Projects imported in your browser are saved to local storage. Copy or download this JSON to commit new additions directly to your repository.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close export modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
            <span className="font-mono">{projects.length} total projects</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-800 bg-[#FAF9F6] border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Copied JSON
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy JSON
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download .json
              </button>
            </div>
          </div>

          <pre className="w-full h-64 p-4 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-xs overflow-auto leading-relaxed">
            {jsonString}
          </pre>
        </div>

        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onResetDefaults();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Default Seed Projects
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
