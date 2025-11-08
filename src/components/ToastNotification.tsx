import { Check } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
}

const ToastNotification = ({ message, isVisible }: ToastNotificationProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[60] animate-in slide-in-from-right-full">
      <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
        <Check className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default ToastNotification;

