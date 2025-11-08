import { FileText, Image, Video } from 'lucide-react';
import type { Prompt } from '../types';

export const getTypeIcon = (type: Prompt['type']) => {
  switch (type) {
    case 'text':
      return <FileText className="w-4 h-4" />;
    case 'text-to-image':
      return <Image className="w-4 h-4" />;
    case 'text-to-video':
      return <Video className="w-4 h-4" />;
  }
};

export const getTypeLabel = (type: Prompt['type']) => {
  switch (type) {
    case 'text':
      return 'Văn bản';
    case 'text-to-image':
      return 'Tạo hình ảnh';
    case 'text-to-video':
      return 'Tạo video';
  }
};

export const getTypeColor = (type: Prompt['type']) => {
  switch (type) {
    case 'text':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'text-to-image':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'text-to-video':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
  }
};

