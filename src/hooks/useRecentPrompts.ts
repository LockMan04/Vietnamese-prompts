import { useState, useCallback, useEffect } from 'react';
import type { Prompt } from '../types';
import { STORAGE_KEYS } from '../constants';

const RECENT_PROMPTS_KEY = STORAGE_KEYS.RECENT_PROMPTS;
const MAX_RECENT_PROMPTS = 20; // Giới hạn số lượng recent prompts

interface RecentPromptItem {
  prompt: Prompt;
  viewedAt: number; // Timestamp
}

const getRecentPrompts = (): RecentPromptItem[] => {
  try {
    const item = window.localStorage.getItem(RECENT_PROMPTS_KEY);
    if (!item) return [];
    
    const parsed = JSON.parse(item);
    // Validate và filter out invalid items
    return parsed
      .filter((item: RecentPromptItem) => item && item.prompt && item.viewedAt)
      .sort((a: RecentPromptItem, b: RecentPromptItem) => b.viewedAt - a.viewedAt)
      .slice(0, MAX_RECENT_PROMPTS);
  } catch (error) {
    console.warn(`Error reading localStorage key "${RECENT_PROMPTS_KEY}":`, error);
    return [];
  }
};

export const useRecentPrompts = () => {
  const [recentPrompts, setRecentPrompts] = useState<RecentPromptItem[]>(getRecentPrompts());

  // Sync với localStorage khi component mount
  useEffect(() => {
    setRecentPrompts(getRecentPrompts());
  }, []);

  const addRecentPrompt = useCallback((prompt: Prompt) => {
    setRecentPrompts(prev => {
      // Remove prompt nếu đã tồn tại (để tránh duplicate)
      const filtered = prev.filter(item => item.prompt.id !== prompt.id);
      
      // Thêm prompt mới vào đầu với timestamp hiện tại
      const newList = [
        {
          prompt,
          viewedAt: Date.now(),
        },
        ...filtered,
      ].slice(0, MAX_RECENT_PROMPTS); // Giới hạn số lượng

      // Save to localStorage
      try {
        window.localStorage.setItem(RECENT_PROMPTS_KEY, JSON.stringify(newList));
      } catch (error) {
        console.warn(`Error setting localStorage key "${RECENT_PROMPTS_KEY}":`, error);
      }

      return newList;
    });
  }, []);

  const removeRecentPrompt = useCallback((promptId: string) => {
    setRecentPrompts(prev => {
      const newList = prev.filter(item => item.prompt.id !== promptId);
      
      try {
        window.localStorage.setItem(RECENT_PROMPTS_KEY, JSON.stringify(newList));
      } catch (error) {
        console.warn(`Error setting localStorage key "${RECENT_PROMPTS_KEY}":`, error);
      }

      return newList;
    });
  }, []);

  const clearRecentPrompts = useCallback(() => {
    setRecentPrompts([]);
    try {
      window.localStorage.removeItem(RECENT_PROMPTS_KEY);
    } catch (error) {
      console.warn(`Error removing localStorage key "${RECENT_PROMPTS_KEY}":`, error);
    }
  }, []);

  const getRecentPromptIds = useCallback(() => {
    return recentPrompts.map(item => item.prompt.id);
  }, [recentPrompts]);

  return {
    recentPrompts,
    addRecentPrompt,
    removeRecentPrompt,
    clearRecentPrompts,
    getRecentPromptIds,
  };
};

