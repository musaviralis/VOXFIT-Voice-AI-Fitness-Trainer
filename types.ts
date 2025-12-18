export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  notes: string;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  warmup: string;
  exercises: Exercise[];
  cooldown: string;
}

export interface WorkoutPlan {
  title: string;
  description: string;
  days: WorkoutDay[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ContentIdea {
  title: string;
  hook: string;
  script: string;
  caption: string;
  visualPrompt: string;
}

export enum FitnessGoal {
  HYPERTROPHY = 'Hypertrophy (Muscle Growth)',
  STRENGTH = 'Strength (Powerlifting focus)',
  FAT_LOSS = 'Fat Loss (Metabolic Conditioning)',
  GENERAL = 'General Fitness & Longevity'
}

export enum ExperienceLevel {
  BEGINNER = 'Beginner (< 1 year)',
  INTERMEDIATE = 'Intermediate (1-3 years)',
  ADVANCED = 'Advanced (3+ years)'
}

export type SupportedLanguage = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}
