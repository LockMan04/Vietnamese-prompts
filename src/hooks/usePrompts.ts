
import { useState, useEffect } from 'react';
import { loadPromptsFromJSONL } from '../utils/jsonlLoader';
import type { Prompt, FilterOptions } from '../types';

// Danh sách ID của các prompts "HOT"
const hotIds = [1, 2, 17, 18];

// Helper function để sắp xếp prompts, đưa mục "HOT" lên đầu
const sortPromptsWithHotFirst = (promptList: Prompt[]) => {
  return [...promptList].sort((a, b) => {
    const aIsHot = hotIds.includes(parseInt(a.id));
    const bIsHot = hotIds.includes(parseInt(b.id));

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

  // Tải dữ liệu lần đầu
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

  // Logic lọc và sắp xếp
  useEffect(() => {
    const filterPrompts = async () => {
      setIsFiltering(true);
      await new Promise(resolve => setTimeout(resolve, 100)); // Delay nhỏ cho animation

      let filtered = prompts;

      // Lọc theo từ khóa tìm kiếm
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

      // Lọc theo category
      if (filters.category) {
        filtered = filtered.filter(prompt => prompt.category === filters.category);
      }

      // Lọc theo type
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

  return {
    prompts,
    filteredPrompts,
    loading,
    error,
    isFiltering,
    animationKey,
    filters,
    hotIds,
    loadData,
    handleFilterChange,
    handleSearchChange
  };
};
