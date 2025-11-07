import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import PromptModal from './components/PromptModal';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { usePrompts } from './hooks/usePrompts';
import { useModal } from './hooks/useModal';

function App() {
  const {
    prompts,
    filteredPrompts,
    loading,
    error,
    isFiltering,
    filters,
    categories,
    types,
    hotIds,
    loadData,
    handleFilterChange,
    handleSearchChange,
    clearFilters
  } = usePrompts();

  const { selectedPrompt, isModalOpen, openModal, closeModal } = useModal();
  const [animationKey] = useState(0);

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

        <MainContent
          totalPrompts={prompts.length}
          totalCategories={categories.length}
          totalTypes={types.length}
          filteredPrompts={filteredPrompts}
          isFiltering={isFiltering}
          animationKey={animationKey}
          onPromptClick={openModal}
          onClearFilters={clearFilters}
          hotIds={hotIds}
        />

        <Footer totalPrompts={prompts.length} totalCategories={categories.length} />
        
        <PromptModal 
          prompt={selectedPrompt}
          isOpen={isModalOpen}
          onClose={closeModal}
          hotIds={hotIds}
        />
        
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;
