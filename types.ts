
export interface AITool {
  name: string;
  description: string;
  bestFeatures: string[];
  link: string;
  rank: number;
  freeTierInfo: string;
}

export interface GroundingSource {
  title?: string;
  uri: string;
}

export interface RankingState {
  tools: AITool[];
  sources: GroundingSource[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}
