export interface Prompt {
  id: string;
  category: string;
  title: string;
  prompt: string;
  type: 'text' | 'text-to-image' | 'text-to-video';
  image_before: string;
  image_after: string;
  description: string;
  tags: string;
  contributor: string;
}

export interface FilterOptions {
  category: string;
  type: string;
  searchTerm: string;
  showFavorites?: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
