import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import PromptModal from './components/PromptModal';
import LoadingScreen from './components/LoadingScreen';
import ErrorScreen from './components/ErrorScreen';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import KeyboardShortcutsHelp from './components/KeyboardShortcutsHelp';
import SectionErrorBoundary from './components/SectionErrorBoundary';
import { usePrompts } from './hooks/usePrompts';
import { useModal } from './hooks/useModal';
import ContributionPage from './components/ContributionPage';

// Component bên trong Router để sử dụng useModal
function AppContent() {
  const [showShortcuts, setShowShortcuts] = useState(false);
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

  // Handle deep linking - open modal if URL has prompt ID khi prompts load xong
  useEffect(() => {
    if (!loading && prompts.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const promptId = urlParams.get('prompt');
      if (promptId && !isModalOpen) {
        const prompt = prompts.find((p) => p.id === promptId);
        if (prompt) {
          // Chỉ mở modal một lần khi load trang với URL có prompt ID
          openModal(prompt);
        }
      }
    }
    // Chỉ chạy một lần khi prompts load xong
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, prompts]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen onRetry={loadData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30">
      <SectionErrorBoundary sectionName="Header">
        <Header
          onSearchChange={handleSearchChange}
          searchTerm={filters.searchTerm}
          onShowShortcuts={() => setShowShortcuts(true)}
        />
      </SectionErrorBoundary>

      <Routes>
        <Route path="/" element={
          <>
            <SectionErrorBoundary sectionName="Filter Bar">
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                categories={categories}
                types={types}
                isFiltering={isFiltering}
                onToggleFavorites={toggleShowFavorites}
              />
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Main Content">
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
            </SectionErrorBoundary>
          </>
        } />
        <Route path="/contribution" element={
          <SectionErrorBoundary sectionName="Contribution Page">
            <ContributionPage />
          </SectionErrorBoundary>
        } />
      </Routes>

      <SectionErrorBoundary sectionName="Footer">
        <Footer totalPrompts={prompts.length} totalCategories={categories.length} />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Prompt Modal">
        <PromptModal 
          prompt={selectedPrompt}
          isOpen={isModalOpen}
          onClose={closeModal}
          hotIds={hotIds}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />
      </SectionErrorBoundary>

      <ScrollToTop />

      <SectionErrorBoundary sectionName="Keyboard Shortcuts Help">
        <KeyboardShortcutsHelp
          isOpen={showShortcuts}
          onClose={() => setShowShortcuts(false)}
        />
      </SectionErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;
