export enum NavView {
  Dashboard = 'DASHBOARD',
  Sounds = 'SOUNDS',
  Sleep = 'SLEEP',
  AiCoach = 'AI_COACH',
  Journal = 'JOURNAL',
}

export interface Sound {
  id: string;
  name: string;
  // FIX: Changed type from React.FC to React.ComponentType to be compatible with lucide-react icons.
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  src: string;
}

export enum SleepStage {
    Awake = 'AWAKE',
    Light = 'LIGHT',
    Deep = 'DEEP',
    REM = 'REM',
}

export interface SleepStageData {
    stage: SleepStage;
    duration: number; // in minutes
}

export interface SleepData {
    totalSleepTime: number; // in minutes
    stages: SleepStageData[];
    sleepScore: number;
    awakenings: number;
}

export interface DreamEntry {
  id: string;
  date: string;
  text: string;
}
