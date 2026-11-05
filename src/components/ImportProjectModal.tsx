import React, { useState } from 'react';
import { X, Link2, Check, Sparkles } from 'lucide-react';
import {
  VibePlatform,
  VibeProject,
  PreviewStyle,
  detectPlatformFromUrl,
} from '../types/project';

interface ImportProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (project: Omit<VibeProject, 'id' | 'createdAt'>) => void;
}

const PLATFORMS: VibePlatform[] = ['Claude', 'Lovable', 'v0', 'Bolt', 'Other'];

const PREVIEW_STYLES: { id: PreviewStyle; label: string }[] = [
  { id: 'spatial', label: 'Spatial Map' },
  { id: 'waveform', label: 'Audio / Signal' },
  { id: 'canvas', label: 'Interactive Canvas' },
  { id: 'network', label: 'Network Graph' },
  { id: 'dashboard', label: 'Data Dashboard' },
  { id: 'notebook', label: 'Synthesis Board' },
];

export const ImportProjectModal: React.FC<ImportProjectModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<VibePlatform>('Claude');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Interactive Prototype');
  const [description, setDescription] = useState('');
  const [promptNotes, setPromptNotes] = useState('');
  const [previewStyle, setPreviewStyle] = useState<PreviewStyle>('canvas');
  const [autoDetected, setAutoDetected] = useState<VibePlatform | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setError(null);
    const { platform: detected, suggestedTitle } = detectPlatformFromUrl(value);
    if (detected) {
      setPlatform(detected);
      setAutoDetected(detected);
    } else {
      setAutoDetected(null);
    }
    if (suggestedTitle && !title.trim()) {
      setTitle(suggestedTitle);
    }
  };

  const handleFillSample = (sampleType: 'Claude' | 'Lovable') => {
    setError(null);
    if (sampleType === 'Claude') {
      const sampleUrl = 'https://claude.site/artifacts/7e21c840-5b19-4c88-a102-66f3901a4d22';
      setUrl(sampleUrl);
      setPlatform('Claude');
      setAutoDetected('Claude');
      setTitle('Soil Moisture Telemetry Visualizer');
      setAuthor('Jordan Rivera');
      setCategory('Ecological Sensing');
      setDescription(
        'Interactive single-page artifact plotting greenhouse moisture probes across 14 beds with irrigation threshold alerts.'
      );
      setPromptNotes(
        'Create an interactive chart of greenhouse soil moisture levels over 7 days with a slider to test drought threshold alerts.'
      );
      setPreviewStyle('waveform');
    } else {
      const sampleUrl = 'https://soundscape-archive-livinglab.lovable.app';
      setUrl(sampleUrl);
      setPlatform('Lovable');
      setAutoDetected('Lovable');
      setTitle('Campus Soundscape Pinboard');
      setAuthor('Sora Takahashi');
      setCategory('Civic Media');
      setDescription(
        'Community map where students drop 15-second ambient field recordings and tag acoustic comfort ratings.'
      );
      setPromptNotes(
        'Build a cozy collaborative sound map for our research lab where users pin field recordings and filter by time of day.'
      );
      setPreviewStyle('spatial');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    const cleanTitle = title.trim();
    const cleanDesc = description.trim();
    const cleanAuthor = author.trim() || 'Lab Contributor';

    if (!cleanUrl) {
      setError('Please paste a link to your Claude Artifact, Lovable app, or project URL.');
      return;
    }
    if (!cleanTitle) {
      setError('Please enter a project title.');
      return;
    }
    if (!cleanDesc) {
      setError('Please add a brief description of what your project does.');
      return;
    }

    const formattedUrl =
      cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')
        ? cleanUrl
        : `https://${cleanUrl}`;

    onImport({
      title: cleanTitle,
      description: cleanDesc,
      url: formattedUrl,
      platform,
      author: cleanAuthor,
      category: category.trim() || 'Research Prototype',
      promptNotes: promptNotes.trim() || undefined,
      previewStyle,
      isUserAdded: true,
    });

    // Reset fields
    setUrl('');
    setTitle('');
    setAuthor('');
    setDescription('');
    setPromptNotes('');
    setAutoDetected(null);
    setError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 backdrop-blur-xs p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-zinc-200 shadow-xl p-6 md:p-8 my-8">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-zinc-100">
          <div>
            <h2
              id="import-modal-title"
              className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900"
            >
              Import Vibe-Coded Project
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Paste a shareable link from Claude, Lovable, or another coding tool to post it to the Living Lab showcase.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-800 rounded-lg hover:bg-zinc-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick-fill test presets */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 bg-[#FAF9F6] px-3.5 py-2.5 rounded-xl border border-zinc-200/80 text-xs text-zinc-600">
          <span className="font-medium text-zinc-700">
            Want to test importing right now?
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleFillSample('Claude')}
              className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-800 hover:border-orange-400 hover:text-orange-700 font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              Prefill Claude Artifact
            </button>
            <button
              type="button"
              onClick={() => handleFillSample('Lovable')}
              className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-zinc-800 hover:border-rose-400 hover:text-rose-700 font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              Prefill Lovable App
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
              {error}
            </div>
          )}

          {/* Step 1: Project URL with smart detection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="project-url"
                className="block text-xs font-semibold text-zinc-800"
              >
                Project Share Link (Claude Artifact, Lovable URL, etc.) *
              </label>
              {autoDetected && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600">
                  <Check className="w-3.5 h-3.5" />
                  Auto-detected {autoDetected}
                </span>
              )}
            </div>
            <div className="relative">
              <Link2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="project-url"
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://claude.site/artifacts/... or https://your-app.lovable.app"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Step 2: Platform Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
              Vibe Coding App
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PLATFORMS.map((item) => {
                const active = platform === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPlatform(item)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title & Author row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="project-title"
                className="block text-xs font-semibold text-zinc-800 mb-1.5"
              >
                Project Title *
              </label>
              <input
                id="project-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Acoustic Pollinator Tracker"
                className="w-full px-3.5 py-2 text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="project-author"
                className="block text-xs font-semibold text-zinc-800 mb-1.5"
              >
                Creator / Researcher
              </label>
              <input
                id="project-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., Alex Chen"
                className="w-full px-3.5 py-2 text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Category & Preview Thumbnail Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="project-category"
                className="block text-xs font-semibold text-zinc-800 mb-1.5"
              >
                Research Topic
              </label>
              <input
                id="project-category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Spatial Sensing, Civic Tool"
                className="w-full px-3.5 py-2 text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="project-preview-style"
                className="block text-xs font-semibold text-zinc-800 mb-1.5"
              >
                Card Visual Style
              </label>
              <select
                id="project-preview-style"
                value={previewStyle}
                onChange={(e) => setPreviewStyle(e.target.value as PreviewStyle)}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
              >
                {PREVIEW_STYLES.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="project-desc"
              className="block text-xs font-semibold text-zinc-800 mb-1.5"
            >
              What does this project do? *
            </label>
            <textarea
              id="project-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the experiment or prototype..."
              className="w-full px-3.5 py-2 text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white resize-none"
            />
          </div>

          {/* Optional Prompt Notes */}
          <div>
            <label
              htmlFor="project-prompt"
              className="block text-xs font-semibold text-zinc-800 mb-1.5"
            >
              Vibe Prompt or Build Note (Optional)
            </label>
            <input
              id="project-prompt"
              type="text"
              value={promptNotes}
              onChange={(e) => setPromptNotes(e.target.value)}
              placeholder="Share the prompt or idea that sparked this build..."
              className="w-full px-3.5 py-2 text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Post to Living Lab
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
