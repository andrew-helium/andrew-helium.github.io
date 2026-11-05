import { VibeProject } from '../types/project';

export const INITIAL_PROJECTS: VibeProject[] = [
  {
    id: 'll-proj-1',
    title: 'Urban Microclimate Sensor Explorer',
    description:
      'Interactive spatial dashboard visualizing courtyard heat islands and airflow readings collected across campus walkabouts.',
    url: 'https://urban-microclimate-studio.lovable.app',
    platform: 'Lovable',
    author: 'Maya Lin & Devon Brooks',
    category: 'Spatial Sensing',
    promptNotes:
      'Build a warm, playful spatial sensor explorer where researchers can compare courtyard temperature curves by hour of day with interactive heat contours.',
    createdAt: '2026-10-28',
    previewStyle: 'spatial',
    featured: true,
  },
  {
    id: 'll-proj-2',
    title: 'Pollinator Acoustic Field Synthesizer',
    description:
      'Browser-based spectrogram and harmonic clustering sandbox for tagging wingbeat frequencies in community garden audio logs.',
    url: 'https://claude.site/artifacts/b4e8f912-7c3a-410d-9e12-88a41b2c901f',
    platform: 'Claude',
    author: 'Dr. Aris Thorne',
    category: 'Bioacoustics',
    promptNotes:
      'Create a single-file interactive React artifact that plots wingbeat frequency harmonics between 120Hz and 400Hz with scrubbable audio markers.',
    createdAt: '2026-10-24',
    previewStyle: 'waveform',
  },
  {
    id: 'll-proj-3',
    title: 'Participatory Transit Sketchpad',
    description:
      'Co-design web canvas allowing neighborhood workshop participants to drag bus stops, bike lanes, and shade canopies onto street grids.',
    url: 'https://transit-sketchpad-lab.lovable.app',
    platform: 'Lovable',
    author: 'Elena Rostova',
    category: 'Civic Co-Design',
    promptNotes:
      'Design a tactile street-grid remix tool with draggable bus stops, tree canopy counters, and instant walkability feedback.',
    createdAt: '2026-10-19',
    previewStyle: 'canvas',
  },
  {
    id: 'll-proj-4',
    title: 'Mycelium Network Growth Simulator',
    description:
      'Cellular automata playground modeling nutrient transport efficiency and branching resilience in fungal substrate experiments.',
    url: 'https://claude.site/artifacts/9c11d42a-3f80-4b75-812c-52e90f7a3310',
    platform: 'Claude',
    author: 'Samir Patel',
    category: 'Biological Systems',
    promptNotes:
      'Simulate branching mycelial hyphae seeking nutrient nodes on a 2D petri dish with adjustable moisture and branching angle sliders.',
    createdAt: '2026-10-12',
    previewStyle: 'network',
  },
  {
    id: 'll-proj-5',
    title: 'Circular Material Passport Tracker',
    description:
      'Lightweight studio inventory tool tracking reclaimed timber, bio-resins, and 3D-printed offcuts across student fabrication prototypes.',
    url: 'https://material-passport-livinglab.lovable.app',
    platform: 'Lovable',
    author: 'Hana Kim',
    category: 'Material Ecology',
    promptNotes:
      'Make a studio material passport catalogue where makers log reclaimed wood and bio-plastic batches with lifecycle reuse timelines.',
    createdAt: '2026-10-05',
    previewStyle: 'dashboard',
  },
  {
    id: 'll-proj-6',
    title: 'Field Interview Motif Mapper',
    description:
      'Qualitative research card sorter that groups resident interview quotes into emergent themes and visual affinity clusters.',
    url: 'https://claude.site/artifacts/3d77a901-6a21-4f99-b801-19c83e4410ab',
    platform: 'Claude',
    author: 'Lucas Vance & Priya Nair',
    category: 'Qualitative Tools',
    promptNotes:
      'Build an affinity clustering board for field interview snippets with color-coded theme groupings and exportable synthesis notes.',
    createdAt: '2026-09-29',
    previewStyle: 'notebook',
  },
];
