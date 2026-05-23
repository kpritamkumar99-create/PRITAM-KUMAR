export interface VideoIdea {
  id: number;
  title: string;
  hook: string;
  concept: string;
  script: string;
  shotBreakdown: string[];
  cameraAngles: string;
  bRollIdeas: string;
  editingStyle: string;
  caption: string;
  hashtags: string[];
  thumbnailIdea: string;
  bgMusicStyle: string;
  transitions: string;
  colorGradingStyle: string;
  cta: string;
  postingTime: string;
  targetAudience: string;
  viralPsychology: string;
  conversionStrategy: string;
  aiToolsUsed: string[];
}

export interface BonusSection {
  id: string;
  title: string;
  icon: string;
  content: string[];
  checklist?: string[];
  tips?: string[];
}

export interface CustomScriptResponse {
  hook: string;
  script: string;
  shotBreakdown: string[];
  clientStrategy: string;
  hashtags: string;
  bRollSuggestions: string;
  caption: string;
  isDemoMode?: boolean;
}
