import { useState } from 'react';
import type { Prompt } from '../types';

export const useModal = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPrompt(null);
  };

  return {
    selectedPrompt,
    isModalOpen,
    openModal,
    closeModal,
  };
};

