/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Search,
  ArrowUpRight,
  Download,
  Link2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { INITIAL_PROJECTS } from './data/initialProjects';
import {
  VibeProject,
  VibePlatform,
  detectPlatformFromUrl,
} from './types/project';
import { ProjectPreviewArt } from './components/ProjectPreviewArt';
import { ImportProjectModal } from './components/ImportProjectModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ExportJsonModal } from './components/ExportJsonModal';

const STORAGE_KEY = 'living_lab_projects_v1';

type ActiveTab = 'projects' | 'publications' | 'team';
type PlatformFilter = 'All' | 'Claude' | 'Lovable' | 'Other';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('projects');
  const [projects, setProjects] = useState<VibeProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to initial seed projects
    }
    return INITIAL_PROJECTS;
  });

  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickUrl, setQuickUrl] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<VibeProject | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // Ignore storage quota errors
    }
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const handleImportProject = (
    newProj: Omit<VibeProject, 'id' | 'createdAt'>
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const created: VibeProject = {
      ...newProj,
      id: `ll-proj-${Date.now()}`,
      createdAt: today,
      isUserAdded: true,
    };
    setProjects((prev) => [created, ...prev]);
    setActiveTab('projects');
    showToast(`Added "${created.title}" from ${created.platform}`);
  };

  const handleQuickUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl.trim()) {
      setIsImportModalOpen(true);
      return;
    }

    const { platform, suggestedTitle } = detectPlatformFromUrl(quickUrl);
    const formattedUrl =
      quickUrl.trim().startsWith('http://') ||
      quickUrl.trim().startsWith('https://')
        ? quickUrl.trim()
        : `https://${quickUrl.trim()}`;

    const detectedPlatform: VibePlatform = platform || 'Claude';
    const title =
      suggestedTitle || `${detectedPlatform} Lab Prototype`;

    handleImportProject({
      title,
      description: `Interactive prototype imported directly via shareable ${detectedPlatform} link.`,
      url: formattedUrl,
      platform: detectedPlatform,
      author: 'Lab Member',
      category: 'Rapid Prototype',
      previewStyle: detectedPlatform === 'Lovable' ? 'spatial' : 'canvas',
      isUserAdded: true,
    });
    setQuickUrl('');
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project removed from showcase');
  };

  const handleResetDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset showcase to default seed projects');
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchesPlatform =
        platformFilter === 'All'
          ? true
          : platformFilter === 'Claude'
          ? proj.platform === 'Claude'
          : platformFilter === 'Lovable'
          ? proj.platform === 'Lovable'
          : proj.platform !== 'Claude' && proj.platform !== 'Lovable';

      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.description.toLowerCase().includes(q) ||
        proj.author.toLowerCase().includes(q) ||
        proj.category.toLowerCase().includes(q) ||
        proj.platform.toLowerCase().includes(q);

      return matchesPlatform && matchesQuery;
    });
  }, [projects, platformFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: projects.length,
      claude: projects.filter((p) => p.platform === 'Claude').length,
      lovable: projects.filter((p) => p.platform === 'Lovable').length,
      other: projects.filter(
        (p) => p.platform !== 'Claude' && p.platform !== 'Lovable'
      ).length,
    };
  }, [projects]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#18181B]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-zinc-200/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
          {/* Zone 1: Brand title, single text element */}
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('projects');
            }}
            className="font-display text-xl font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0"
          >
            Living Lab
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            className="flex items-center gap-6 text-sm font-medium text-zinc-600"
            aria-label="Primary Navigation"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('projects');
              }}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'projects'
                  ? 'text-zinc-900 border-blue-600 font-semibold'
                  : 'border-transparent hover:text-zinc-900'
              }`}
            >
              Projects
            </a>
            <a
              href="#publications"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('publications');
              }}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'publications'
                  ? 'text-zinc-900 border-blue-600 font-semibold'
                  : 'border-transparent hover:text-zinc-900'
              }`}
            >
              Publications
            </a>
            <a
              href="#team"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('team');
              }}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === 'team'
                  ? 'text-zinc-900 border-blue-600 font-semibold'
                  : 'border-transparent hover:text-zinc-900'
              }`}
            >
              Team
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Import Project
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 md:py-14">
        {activeTab === 'projects' ? (
          <>
            {/* Studio Hero & Instant Link Importer */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10 border-b border-zinc-200/80">
              <div className="lg:col-span-7 flex flex-col justify-center">
                <p className="text-xs font-semibold text-blue-600 tracking-wide">
                  Research Sandbox & Prototype Playground
                </p>
                <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-zinc-900 leading-[1.12] [text-wrap:balance]">
                  Where our lab vibe-codes experiments into living tools.
                </h1>
                <p className="mt-4 text-base text-zinc-600 leading-relaxed max-w-xl">
                  Explore interactive prototypes, field calculators, and simulations built rapidly by Living Lab researchers using Claude, Lovable, and modern vibe-coding workflows.
                </p>
              </div>

              {/* Quick Import Box from Claude / Lovable */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-semibold text-zinc-900">
                      Quick Import from Claude or Lovable
                    </span>
                    <span>Supports Claude · Lovable · v0</span>
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-600 leading-relaxed">
                    Paste a shareable Claude Artifact or Lovable app URL to post directly to the lab board, or open the full importer to add research notes.
                  </p>

                  <form onSubmit={handleQuickUrlSubmit} className="mt-4 space-y-2.5">
                    <div className="relative">
                      <Link2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={quickUrl}
                        onChange={(e) => setQuickUrl(e.target.value)}
                        placeholder="Paste claude.site/... or *.lovable.app link"
                        aria-label="Paste project URL for quick import"
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {quickUrl.trim() ? 'Instant Post Link' : 'Open Full Importer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsImportModalOpen(true)}
                        className="py-2.5 px-3.5 text-xs font-semibold text-zinc-700 bg-[#FAF9F6] hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                      >
                        + Add Details
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                  <span>
                    <strong className="font-mono text-zinc-800">{counts.all}</strong> active prototypes
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsExportModalOpen(true)}
                    className="inline-flex items-center gap-1 text-zinc-600 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export JSON
                  </button>
                </div>
              </div>
            </section>

            {/* Filter & Search Toolbar */}
            <section className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Interactive Segmented Filter Controls */}
              <div
                className="inline-flex items-center gap-1 p-1 bg-zinc-200/60 rounded-xl self-start"
                role="tablist"
                aria-label="Filter projects by vibe-coding tool"
              >
                {(
                  [
                    { id: 'All', label: `All (${counts.all})` },
                    { id: 'Claude', label: `Claude (${counts.claude})` },
                    { id: 'Lovable', label: `Lovable (${counts.lovable})` },
                    ...(counts.other > 0
                      ? [{ id: 'Other', label: `Other (${counts.other})` }]
                      : []),
                  ] as { id: PlatformFilter; label: string }[]
                ).map((tab) => {
                  const active = platformFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setPlatformFilter(tab.id)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, authors, topics..."
                  aria-label="Search projects"
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-zinc-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </section>

            {/* Project Showcase Grid */}
            {filteredProjects.length === 0 ? (
              <div className="mt-10 bg-white rounded-2xl border border-zinc-200/80 p-12 text-center">
                <h2 className="font-display text-lg font-bold text-zinc-900">
                  No matching projects found
                </h2>
                <p className="mt-1 text-sm text-zinc-600 max-w-md mx-auto">
                  Try clearing your search filter or import a new project from Claude or Lovable.
                </p>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPlatformFilter('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(true)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
                  >
                    Import a Project
                  </button>
                </div>
              </div>
            ) : (
              <section
                aria-label="Vibe-coded projects showcase"
                className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project) => {
                  const platformAccent =
                    project.platform === 'Claude'
                      ? 'text-[#C25E3E]'
                      : project.platform === 'Lovable'
                      ? 'text-rose-600'
                      : 'text-blue-600';

                  return (
                    <article
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group bg-white rounded-2xl border border-zinc-200/85 overflow-hidden flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5 hover:border-zinc-300 cursor-pointer"
                    >
                      <div>
                        {/* Visual Thumbnail Preview */}
                        <div className="h-44 w-full border-b border-zinc-100 overflow-hidden">
                          <ProjectPreviewArt
                            style={project.previewStyle}
                            platform={project.platform}
                            className="w-full h-full transition-transform duration-200 group-hover:scale-[1.02]"
                          />
                        </div>

                        <div className="p-5">
                          {/* Unboxed inline metadata with middle-dot separators */}
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
                            <span className={`font-semibold ${platformAccent}`}>
                              {project.platform}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{project.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono">{project.createdAt}</span>
                          </div>

                          <h2 className="mt-2 font-display text-lg font-bold tracking-tight text-zinc-900 group-hover:text-blue-600 transition-colors">
                            {project.title}
                          </h2>

                          <p className="mt-2 text-sm text-zinc-600 line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 py-3.5 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                        <span className="truncate">By {project.author}</span>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 font-semibold text-zinc-800 hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
                        >
                          Launch App
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </section>
            )}
          </>
        ) : (
          /* Coming Soon Placeholder Views for Publications and Team */
          <section className="my-12 max-w-xl mx-auto bg-white rounded-2xl border border-zinc-200/90 p-8 md:p-12 text-center shadow-xs">
            <p className="text-xs font-semibold text-blue-600">
              Living Lab · Coming Soon
            </p>
            <h1 className="mt-2 font-display text-2xl md:text-3xl font-bold text-zinc-900">
              {activeTab === 'publications'
                ? 'Publications & Papers'
                : 'Lab Team & Contributors'}
            </h1>
            <p className="mt-3 text-sm md:text-base text-zinc-600 leading-relaxed">
              {activeTab === 'publications'
                ? 'Our curated archive of Living Lab research papers, workshop proceedings, and open field reports is currently being assembled.'
                : 'Profiles for our principal investigators, graduate researchers, and student vibe-coders will be published here soon.'}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
              >
                Back to Vibe-Coded Projects
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-zinc-200/80 py-6 px-6 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-zinc-800">Living Lab</span> · Creative Research & Rapid Prototyping Showcase
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsImportModalOpen(true)}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Import from Claude / Lovable
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Export JSON
            </button>
          </div>
        </div>
      </footer>

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 text-white text-xs font-medium shadow-lg"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <ImportProjectModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportProject}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDelete={handleDeleteProject}
      />

      <ExportJsonModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        projects={projects}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
