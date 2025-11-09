
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { loadPromptsFromJSONL, getUniqueCategories, getUniqueTypes } from '../utils/jsonlLoader';
import type { Prompt, FilterOptions, SortOrder } from '../types';
import { useFavorites } from './useFavorites';
import { HOT_IDS, SEARCH_DEBOUNCE_DELAY } from '../constants';
import { useDebounce } from './useDebounce';

// Helper function để sắp xếp prompts
const sortPrompts = (promptList: Prompt[], favoriteIds: string[], sortOrder: SortOrder) => {
  const clonedList = [...promptList];
  return clonedList.sort((a, b) => {
    const aIsFavorite = favoriteIds.includes(a.id);
    const bIsFavorite = favoriteIds.includes(b.id);
    const aIsHot = HOT_IDS.includes(parseInt(a.id));
    const bIsHot = HOT_IDS.includes(parseInt(b.id));

    // Ưu tiên 1: Favorites
    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;

    // Ưu tiên 2: HOT prompts (trong cùng nhóm favorite hoặc non-favorite)
    if (aIsHot && !bIsHot) return -1;
    if (!aIsHot && bIsHot) return 1;

    // Ưu tiên 3: Sắp xếp theo lựa chọn của user
    // Chỉ áp dụng sắp xếp này nếu cả hai item không phải là special (fav/hot) hoặc cùng là special
    switch (sortOrder) {
      case 'id-desc':
        return parseInt(b.id) - parseInt(a.id);
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'id-asc':
      default:
        return parseInt(a.id) - parseInt(b.id);
    }
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
  const [sortOrder, setSortOrder] = useState<SortOrder>('id-asc');

  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();
  const categories = useMemo(() => getUniqueCategories(prompts), [prompts]);
  const types = useMemo(() => getUniqueTypes(prompts), [prompts]);
  const prevFiltersRef = useRef<FilterOptions>(filters);

  // Debounce searchTerm để giảm số lần filter khi user đang gõ
  // Delay 300ms - đủ ngắn để cảm thấy responsive, đủ dài để giảm số lần filter
  const debouncedSearchTerm = useDebounce(filters.searchTerm, SEARCH_DEBOUNCE_DELAY);

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
  // Sử dụng debouncedSearchTerm để filter, nhưng vẫn check filters.searchTerm để hiển thị loading
  useEffect(() => {
    const filterPrompts = async () => {
      // Sử dụng debouncedSearchTerm cho filtering thực tế
      const isActuallyFiltering = debouncedSearchTerm || filters.category || filters.type || filters.showFavorites;
      
      // Kiểm tra xem filters có thay đổi không (sử dụng debouncedSearchTerm cho search)
      const filtersChanged = 
        prevFiltersRef.current.searchTerm !== debouncedSearchTerm ||
        prevFiltersRef.current.category !== filters.category ||
        prevFiltersRef.current.type !== filters.type ||
        prevFiltersRef.current.showFavorites !== filters.showFavorites;

      // Hiển thị loading khi:
      // 1. User đang gõ (filters.searchTerm !== debouncedSearchTerm) - đang chờ debounce
      // 2. Hoặc filters khác thay đổi và có filter active
      const isTyping = filters.searchTerm !== debouncedSearchTerm;
      
      if ((filtersChanged && isActuallyFiltering) || (isTyping && filters.searchTerm)) {
        setIsFiltering(true);
        // Chỉ delay nếu không phải đang gõ (để không delay quá nhiều)
        if (!isTyping) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } else if (!isActuallyFiltering && !isTyping) {
        setIsFiltering(false);
      }

      let filtered = prompts;

      // Sử dụng debouncedSearchTerm thay vì filters.searchTerm
      if (debouncedSearchTerm) {
        const searchLower = debouncedSearchTerm.toLowerCase();
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

      // Sắp xếp prompts dựa trên sortOrder
      const sortedFiltered = sortPrompts(filtered, favoriteIds, sortOrder);
      setFilteredPrompts(sortedFiltered);
      
      // Chỉ tăng animationKey khi filters hoặc sortOrder thay đổi
      const sortOrderChanged = prevFiltersRef.current.sortOrder !== sortOrder;
      if (filtersChanged || sortOrderChanged) {
        setAnimationKey(prev => prev + 1);
        setIsFiltering(false);
      }
      
      // Cập nhật prevFiltersRef sau khi xử lý
      prevFiltersRef.current = {
        ...filters,
        searchTerm: debouncedSearchTerm,
        sortOrder: sortOrder,
      };
    };

    filterPrompts();
  }, [prompts, filters, favoriteIds, debouncedSearchTerm, sortOrder]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const handleSortChange = (newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
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
    sortOrder,
    categories,
    types,
    hotIds: HOT_IDS,
    loadData,
    handleFilterChange,
    handleSearchChange,
    handleSortChange,
    clearFilters,
    toggleFavorite,
    isFavorite,
    toggleShowFavorites,
  };
};
