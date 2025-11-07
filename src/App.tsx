import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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
import { usePrompts } from './hooks/usePrompts';
import FilteringIndicator from './components/FilteringIndicator';
import { getUniqueCategories, getUniqueTypes } from './utils/jsonlLoader';
import type { Prompt } from './types';
import ContributionPage from './components/ContributionPage';

function App() {
  const {
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
  } = usePrompts();

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = getUniqueCategories(prompts);
  const types = getUniqueTypes(prompts);

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
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30">
          <Header
            onSearchChange={handleSearchChange}
            searchTerm={filters.searchTerm}
          />
          <Routes>
            <Route path="/" element={
              <>
                <FilterBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  categories={categories}
                  types={types}
                  isFiltering={isFiltering}
                />
                <main className="container mx-auto px-4 py-8">
                  <div className={`transition-all duration-300 ${isFiltering ? 'opacity-75' : 'opacity-100'}`}>
                    <StatsSection
                      totalPrompts={prompts.length}
                      totalCategories={categories.length}
                      totalTypes={types.length}
                    />
                  </div>
                  <div className={`transition-all duration-500 ${isFiltering ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                    {isFiltering ? (
                      <FilteringIndicator />
                    ) : filteredPrompts.length === 0 ? (
                      <div key={`empty-${animationKey}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <EmptyState onClearFilters={() => handleFilterChange({ category: '', type: '', searchTerm: '' })} />
                      </div>
                    ) : (
                      <div key={`grid-${animationKey}`} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <PromptGrid prompts={filteredPrompts} onPromptClick={handleCardClick} hotIds={hotIds} />
                      </div>
                    )}
                  </div>
                </main>
              </>
            } />
            <Route path="/contribution" element={<ContributionPage />} />
          </Routes>
          <Footer totalPrompts={prompts.length} totalCategories={categories.length} />
          <PromptModal
            prompt={selectedPrompt}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            hotIds={hotIds}
          />
          <ScrollToTop />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
