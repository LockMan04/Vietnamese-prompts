
import { useState, useEffect, useMemo } from 'react';
import { loadPromptsFromJSONL, getUniqueCategories, getUniqueTypes } from '../utils/jsonlLoader';
import type { Prompt, FilterOptions } from '../types';

// Định nghĩa các hằng số
const HOT_IDS = [1, 2, 17, 18];

// Helper function để sắp xếp prompts với HOT prompts ở đầu
const sortPromptsWithHotFirst = (promptList: Prompt[]) => {
  return [...promptList].sort((a, b) => {
    const aIsHot = HOT_IDS.includes(parseInt(a.id));
    const bIsHot = HOT_IDS.includes(parseInt(b.id));
    if (aIsHot && !bIsHot) return -1;
    if (!aIsHot && bIsHot) return 1;
    return 0;
  });
};

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    type: '',
    searchTerm: ''
  });

  const categories = useMemo(() => getUniqueCategories(prompts), [prompts]);
  const types = useMemo(() => getUniqueTypes(prompts), [prompts]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadPromptsFromJSONL();
      const sortedData = sortPromptsWithHotFirst(data);
      setPrompts(sortedData);
      setFilteredPrompts(sortedData);
    } catch {
      setError('Không thể tải dữ liệu prompts. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const filterPrompts = async () => {
      setIsFiltering(true);
      await new Promise(resolve => setTimeout(resolve, 100));

      let filtered = prompts;

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(prompt =>
          prompt.title.toLowerCase().includes(searchLower) ||
          prompt.prompt.toLowerCase().includes(searchLower) ||
          prompt.description.toLowerCase().includes(searchLower) ||
          prompt.category.toLowerCase().includes(searchLower) ||
          prompt.tags.toLowerCase().includes(searchLower)
        );
      }

      if (filters.category) {
        filtered = filtered.filter(prompt => prompt.category === filters.category);
      }

      if (filters.type) {
        filtered = filtered.filter(prompt => prompt.type === filters.type);
      }

      const sortedFiltered = sortPromptsWithHotFirst(filtered);
      setFilteredPrompts(sortedFiltered);
      setAnimationKey(prev => prev + 1);
      setIsFiltering(false);
    };

    filterPrompts();
  }, [prompts, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const clearFilters = () => {
    setFilters({ category: '', type: '', searchTerm: '' });
  };

  return {
    prompts,
    filteredPrompts,
    loading,
    error,
    isFiltering,
    animationKey,
    filters,
    categories,
    types,
    hotIds: HOT_IDS,
    loadData,
    handleFilterChange,
    handleSearchChange,
    clearFilters
  };
};
