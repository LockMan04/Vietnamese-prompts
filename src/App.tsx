import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import PromptModal from './components/PromptModal';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import StatsSection from './components/StatsSection';
import EmptyState from './components/EmptyState';
import PromptGrid from './components/PromptGrid';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { loadPromptsFromCSV, getUniqueCategories, getUniqueTypes } from './utils/csvLoader';
import type { Prompt, FilterOptions } from './types';

function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Hot prompt IDs - bạn có thể cập nhật danh sách này
  const hotIds = [1, 2, 17, 18];
  
  // Helper function để sắp xếp prompts với HOT prompts ở đầu
  const sortPromptsWithHotFirst = (promptList: Prompt[]) => {
    return [...promptList].sort((a, b) => {
      const aIsHot = hotIds.includes(parseInt(a.id));
      const bIsHot = hotIds.includes(parseInt(b.id));
      
      // Nếu a là hot và b không hot, a lên trước
      if (aIsHot && !bIsHot) return -1;
      // Nếu b là hot và a không hot, b lên trước
      if (!aIsHot && bIsHot) return 1;
      // Nếu cả hai cùng hot hoặc cùng không hot, giữ nguyên thứ tự ban đầu
      return 0;
    });
  };
  
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    type: '',
    searchTerm: ''
  });

  const categories = getUniqueCategories(prompts);
  const types = getUniqueTypes(prompts);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadPromptsFromCSV();
      
      // Sắp xếp để đưa HOT prompts lên đầu ngay từ khi load
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

  // Debounced filtering with animation
  useEffect(() => {
    const filterPrompts = async () => {
      setIsFiltering(true);
      
      // Add small delay to show filtering animation  
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let filtered = prompts;

      // Filter by search term
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

      // Filter by category
      if (filters.category) {
        filtered = filtered.filter(prompt => prompt.category === filters.category);
      }

      // Filter by type
      if (filters.type) {
        filtered = filtered.filter(prompt => prompt.type === filters.type);
      }

      // Sắp xếp để đưa HOT prompts lên đầu
      const sortedFiltered = sortPromptsWithHotFirst(filtered);

      setFilteredPrompts(sortedFiltered);
      setAnimationKey(prev => prev + 1);
      setIsFiltering(false);
    };

    filterPrompts();
  }, [prompts, filters]);

  const handleSearchChange = (searchTerm: string) => {
    setFilters({ ...filters, searchTerm });
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleCardClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPrompt(null);
  };

  if (loading) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider>
        <ErrorScreen onRetry={loadData} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30">
        <Header
          onSearchChange={handleSearchChange}
          searchTerm={filters.searchTerm}
        />
        
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          categories={categories}
          types={types}
          isFiltering={isFiltering}
        />

        <main className="container mx-auto px-4 py-8">
          {/* Stats */}
          <div className={`transition-all duration-300 ${isFiltering ? 'opacity-75' : 'opacity-100'}`}>
            <StatsSection 
              totalPrompts={prompts.length}
              totalCategories={categories.length}
              totalTypes={types.length}
            />
          </div>

          {/* Results */}
          <div className={`transition-all duration-500 ${isFiltering ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            {isFiltering ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#0c97fa' }}></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 opacity-20" style={{ borderColor: '#0c97fa' }}></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Đang lọc kết quả...</p>
                </div>
              </div>
            ) : filteredPrompts.length === 0 ? (
              <div key={`empty-${animationKey}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <EmptyState onClearFilters={() => setFilters({ category: '', type: '', searchTerm: '' })} />
              </div>
            ) : (
              <div key={`grid-${animationKey}`} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <PromptGrid prompts={filteredPrompts} onPromptClick={handleCardClick} hotIds={hotIds} />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer totalPrompts={prompts.length} totalCategories={categories.length} />
        
        {/* Modal */}
        <PromptModal 
          prompt={selectedPrompt}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          hotIds={hotIds}
        />
        
        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
