import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean; // Require Ctrl (Windows/Linux) or Cmd (Mac) - set to true to enable
  metaKey?: boolean; // Alias for ctrlKey - works on both platforms
  shiftKey?: boolean;
  altKey?: boolean;
  handler: (event: KeyboardEvent) => void;
  description?: string;
}

/**
 * Hook để xử lý keyboard shortcuts
 * @param shortcuts - Mảng các keyboard shortcuts
 * @param enabled - Có bật keyboard shortcuts không (mặc định: true)
 */
export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[], enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        // Check key match (case-insensitive for letter keys)
        const eventKey = event.key.toLowerCase();
        const shortcutKey = shortcut.key.toLowerCase();
        if (eventKey !== shortcutKey) return;

        // Check Ctrl/Meta modifier
        // If shortcut requires Ctrl or Meta, accept either Ctrl (Windows/Linux) or Meta (Mac)
        const needsModifier = shortcut.ctrlKey || shortcut.metaKey;
        const hasModifier = event.ctrlKey || event.metaKey;
        
        if (needsModifier && !hasModifier) return;
        if (!needsModifier && hasModifier) return;

        // Check Shift modifier
        if (shortcut.shiftKey !== undefined && event.shiftKey !== shortcut.shiftKey) return;
        
        // Check Alt modifier
        if (shortcut.altKey !== undefined && event.altKey !== shortcut.altKey) return;

        // Don't trigger if user is typing in input/textarea
        // Exception: Allow Escape to close modals even when typing
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
          if (shortcut.key !== 'Escape' && shortcut.key.toLowerCase() !== 'escape') return;
        }

        event.preventDefault();
        shortcut.handler(event);
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, enabled]);
};

// Helper để check nếu là Mac
export const isMac = () => {
  return typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
};

// Format keyboard shortcut để hiển thị
export const formatShortcut = (shortcut: Omit<KeyboardShortcut, 'handler'>): string => {
  const parts: string[] = [];
  const mac = isMac();
  
  if (shortcut.ctrlKey || shortcut.metaKey) {
    parts.push(mac ? '⌘' : 'Ctrl');
  }
  if (shortcut.shiftKey) {
    parts.push('Shift');
  }
  if (shortcut.altKey) {
    parts.push(mac ? '⌥' : 'Alt');
  }
  
  // Format key
  let key = shortcut.key;
  if (key === ' ') {
    key = 'Space';
  } else if (key === 'Escape' || key.toLowerCase() === 'escape') {
    key = 'Esc';
  } else if (key.length === 1) {
    key = key.toUpperCase();
  }
  
  parts.push(key);
  
  // Mac: "⌘K", Windows: "Ctrl + K"
  return mac ? parts.join('') : parts.join(' + ');
};

