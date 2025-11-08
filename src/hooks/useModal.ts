import { useState, useCallback } from 'react';
import type { Prompt } from '../types';

export const useModal = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
    // Update URL with prompt ID
    const url = new URL(window.location.href);
    url.searchParams.set('prompt', prompt.id);
    window.history.pushState({}, '', url.toString());
  }, []);

  const closeModal = useCallback(() => {
    // Đóng modal ngay lập tức
    setIsModalOpen(false);
    setSelectedPrompt(null);
    // Remove prompt from URL
    const url = new URL(window.location.href);
    url.searchParams.delete('prompt');
    // Sử dụng replaceState để không tạo history entry
    window.history.replaceState({}, '', url.toString());
  }, []);

  return {
    selectedPrompt,
    isModalOpen,
    openModal,
    closeModal,
  };
};
