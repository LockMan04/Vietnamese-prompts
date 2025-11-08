import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    categories,
    types,
    hotIds,
    loadData,
    handleFilterChange,
    handleSearchChange,
    clearFilters,
    isFavorite,
    toggleFavorite,
    toggleShowFavorites,
  } = usePrompts();

  const { selectedPrompt, isModalOpen, openModal, closeModal } = useModal();

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
                  onToggleFavorites={toggleShowFavorites}
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
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                />
              </>
            } />
            <Route path="/contribution" element={<ContributionPage />} />
          </Routes>
          <Footer totalPrompts={prompts.length} totalCategories={categories.length} />
          <PromptModal 
            prompt={selectedPrompt}
            isOpen={isModalOpen}
            onClose={closeModal}
            hotIds={hotIds}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
          <ScrollToTop />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
