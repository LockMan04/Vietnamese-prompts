
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { loadPromptsFromJSONL, getUniqueCategories, getUniqueTypes } from '../utils/jsonlLoader';
import type { Prompt, FilterOptions } from '../types';
import { useFavorites } from './useFavorites';

// Định nghĩa các hằng số
const HOT_IDS = [1, 2, 17, 18];

// Helper function để sắp xếp prompts với favorites ở đầu, sau đó HOT prompts
const sortPromptsWithFavoritesAndHotFirst = (promptList: Prompt[], favoriteIds: string[]) => {
  return [...promptList].sort((a, b) => {
    const aIsFavorite = favoriteIds.includes(a.id);
    const bIsFavorite = favoriteIds.includes(b.id);
    const aIsHot = HOT_IDS.includes(parseInt(a.id));
    const bIsHot = HOT_IDS.includes(parseInt(b.id));

    // Favorites luôn ở đầu
    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;

    // Trong cùng nhóm favorites hoặc non-favorites, HOT ở trước
    if (aIsFavorite && bIsFavorite) {
      if (aIsHot && !bIsHot) return -1;
      if (!aIsHot && bIsHot) return 1;
    }

    if (!aIsFavorite && !bIsFavorite) {
      if (aIsHot && !bIsHot) return -1;
      if (!aIsHot && bIsHot) return 1;
    }

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
    searchTerm: '',
    showFavorites: false,
  });

  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  const categories = useMemo(() => getUniqueCategories(prompts), [prompts]);
  const types = useMemo(() => getUniqueTypes(prompts), [prompts]);
  const prevFiltersRef = useRef<FilterOptions>(filters);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadPromptsFromJSONL();
      // Sắp xếp sẽ được xử lý bởi useEffect khi favoriteIds thay đổi
      setPrompts(data);
    } catch {
      setError('Không thể tải dữ liệu prompts. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Effect để filter và sắp xếp - chỉ tăng animationKey khi filters thay đổi
  useEffect(() => {
    const filterPrompts = async () => {
      const isActuallyFiltering = filters.searchTerm || filters.category || filters.type || filters.showFavorites;
      
      // Kiểm tra xem filters có thay đổi không (không phải chỉ favoriteIds)
      const filtersChanged = 
        prevFiltersRef.current.searchTerm !== filters.searchTerm ||
        prevFiltersRef.current.category !== filters.category ||
        prevFiltersRef.current.type !== filters.type ||
        prevFiltersRef.current.showFavorites !== filters.showFavorites;

      // Chỉ hiển thị loading animation khi filters thay đổi, không phải khi chỉ toggle favorite
      if (filtersChanged && isActuallyFiltering) {
        setIsFiltering(true);
        await new Promise(resolve => setTimeout(resolve, 100));
      } else if (!isActuallyFiltering) {
        setIsFiltering(false);
      }

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

      if (filters.showFavorites) {
        filtered = filtered.filter(prompt => favoriteIds.includes(prompt.id));
      }

      // Luôn sắp xếp với favorites ở đầu
      const sortedFiltered = sortPromptsWithFavoritesAndHotFirst(filtered, favoriteIds);
      setFilteredPrompts(sortedFiltered);
      
      // Chỉ tăng animationKey khi filters thay đổi, KHÔNG phải khi chỉ favoriteIds thay đổi
      // Điều này tránh việc re-animate toàn bộ grid khi chỉ toggle favorite
      if (filtersChanged) {
        setAnimationKey(prev => prev + 1);
        setIsFiltering(false);
      }
      
      // Cập nhật prevFiltersRef sau khi xử lý
      prevFiltersRef.current = filters;
    };

    filterPrompts();
  }, [prompts, filters, favoriteIds]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const clearFilters = () => {
    setFilters({ category: '', type: '', searchTerm: '', showFavorites: false });
  };

  const toggleShowFavorites = () => {
    setFilters(prev => ({
      ...prev,
      showFavorites: !prev.showFavorites
    }));
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
    clearFilters,
    toggleFavorite,
    isFavorite,
    toggleShowFavorites,
  };
};
