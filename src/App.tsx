import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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
import RecentPromptsDrawer from './components/RecentPromptsDrawer';
import { usePrompts } from './hooks/usePrompts';
import { useModal } from './hooks/useModal';
import { useRecentPrompts } from './hooks/useRecentPrompts';
import type { Prompt } from './types';
import ContributionPage from './components/ContributionPage';

// Component bên trong Router để sử dụng useModal
function AppContent() {
  const navigate = useNavigate();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showRecentPrompts, setShowRecentPrompts] = useState(false);
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
    sortOrder,
    handleSortChange,
  } = usePrompts();

  const { selectedPrompt, isModalOpen, openModal, closeModal } = useModal();
  const { recentPrompts, addRecentPrompt, removeRecentPrompt, clearRecentPrompts } = useRecentPrompts();

  // Handle GitHub Pages 404.html redirect
  // When GitHub Pages serves 404.html, it redirects to /?/path
  // We need to convert this back to a normal path for React Router
  useEffect(() => {
    const search = window.location.search;
    
    // Check if this is a redirect from 404.html (format: /?/path)
    if (search.startsWith('?/')) {
      const redirectPath = search.slice(2).split('&')[0].replace(/~and~/g, '&');
      // Extract query params and hash if any
      const remainingSearch = search.includes('&') ? '?' + search.split('&').slice(1).join('&').replace(/~and~/g, '&') : '';
      const hash = window.location.hash;
      
      // Navigate to the correct path using React Router
      navigate(redirectPath + remainingSearch + hash, { replace: true });
    }
  }, [navigate]);

  // Handle opening modal - lưu vào recent prompts
  const handleOpenModal = (prompt: Prompt) => {
    openModal(prompt);
    addRecentPrompt(prompt);
  };

  // Handle deep linking - open modal if URL has prompt ID khi prompts load xong
  useEffect(() => {
    if (!loading && prompts.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const promptId = urlParams.get('prompt');
      if (promptId && !isModalOpen) {
        const prompt = prompts.find((p) => p.id === promptId);
        if (prompt) {
          // Chỉ mở modal một lần khi load trang với URL có prompt ID
          handleOpenModal(prompt);
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
          onShowRecentPrompts={() => setShowRecentPrompts(true)}
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
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
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
                onPromptClick={handleOpenModal}
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

      <SectionErrorBoundary sectionName="Recent Prompts Drawer">
        <RecentPromptsDrawer
          isOpen={showRecentPrompts}
          onClose={() => setShowRecentPrompts(false)}
          recentPrompts={recentPrompts}
          onPromptClick={handleOpenModal}
          onRemovePrompt={removeRecentPrompt}
          onClearAll={clearRecentPrompts}
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
