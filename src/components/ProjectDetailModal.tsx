import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Trash2 } from 'lucide-react';
import { VibeProject } from '../types/project';
import { ProjectPreviewArt } from './ProjectPreviewArt';

interface ProjectDetailModalProps {
  project: VibeProject | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(project.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const platformColor =
    project.platform === 'Claude'
      ? 'text-[#C25E3E]'
      : project.platform === 'Lovable'
      ? 'text-rose-600'
      : 'text-blue-600';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-zinc-200 shadow-xl overflow-hidden my-8">
        <div className="relative h-52 w-full border-b border-zinc-100">
          <ProjectPreviewArt
            style={project.previewStyle}
            platform={project.platform}
            className="w-full h-full"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white text-zinc-700 hover:text-zinc-950 rounded-xl border border-zinc-200/80 shadow-xs transition-colors cursor-pointer"
            aria-label="Close project details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Unboxed metadata line per Zero-Pill rule */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span className={`font-semibold ${platformColor}`}>
              Built with {project.platform}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>By {project.author}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{project.createdAt}</span>
          </div>

          <h2
            id="detail-modal-title"
            className="mt-2 text-2xl font-bold tracking-tight text-zinc-900"
          >
            {project.title}
          </h2>

          <p className="mt-3 text-sm md:text-base text-zinc-600 leading-relaxed">
            {project.description}
          </p>

          {project.promptNotes && (
            <div className="mt-5 p-4 rounded-xl bg-[#FAF9F6] border border-zinc-200/80">
              <div className="text-xs font-semibold text-zinc-700 mb-1">
                Vibe Prompt & Studio Notes
              </div>
              <p className="text-xs md:text-sm text-zinc-600 italic leading-relaxed">
                "{project.promptNotes}"
              </p>
            </div>
          )}

          <div className="mt-5 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-between gap-3">
            <div className="truncate text-xs font-mono text-zinc-600">
              {project.url}
            </div>
            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Link
                </>
              )}
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              {project.isUserAdded && (
                <button
                  type="button"
                  onClick={() => {
                    onDelete(project.id);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove Project
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors whitespace-nowrap"
              >
                Open Live Project
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
