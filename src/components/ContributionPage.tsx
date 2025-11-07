import React, { useState } from 'react';
import { FileText, MessageCircle, Tag, Type, Github, ArrowRight } from 'lucide-react';

const ContributionPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    prompt: '',
    category: '',
    type: '',
    description: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, prompt, category, type, description, tags } = formData;
    const issueTitle = `[PROMPT] ${title}`;
    const issueBody = `
**Tiêu đề:** ${title}

**Mô tả:** ${description || 'Không có mô tả'}

**Prompt:**
\`\`\`
${prompt}
\`\`\`

**Danh mục:** ${category}
**Loại:** ${type}
**Tags:** ${tags || 'Không có tags'}
    `;
    const url = `https://github.com/LockMan04/Vietnamese-prompts/issues/new?labels=%C4%90%E1%BB%81+xu%E1%BA%A5t+Prompt&template=prompt-suggestion.md&title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
    window.open(url, '_blank');
  };

  const typeOptions = [
    { value: '', label: 'Chọn loại prompt' },
    { value: 'text', label: 'Văn bản' },
    { value: 'text-to-image', label: 'Tạo hình ảnh' },
    { value: 'text-to-video', label: 'Tạo video' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 mb-4">
          <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Đóng góp Prompt
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Đóng góp prompt của bạn để giúp cộng đồng. Form sẽ tự động tạo một issue trên GitHub với thông tin bạn cung cấp.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4" />
              <span>Tiêu đề <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Nhập tiêu đề cho prompt của bạn"
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent vp-ring-color transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4" />
              <span>Mô tả</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả ngắn gọn về prompt này"
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent vp-ring-color transition-all duration-200 resize-none"
            />
          </div>

          {/* Prompt */}
          <div>
            <label htmlFor="prompt" className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <MessageCircle className="w-4 h-4" />
              <span>Nội dung Prompt <span className="text-red-500">*</span></span>
            </label>
            <textarea
              id="prompt"
              name="prompt"
              rows={6}
              value={formData.prompt}
              onChange={handleChange}
              placeholder="Nhập nội dung prompt của bạn ở đây..."
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent vp-ring-color transition-all duration-200 resize-none font-mono text-sm"
              required
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Prompt sẽ được hiển thị trong code block trên GitHub
            </p>
          </div>

          {/* Category and Type Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Tag className="w-4 h-4" />
                <span>Danh mục <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Ví dụ: Marketing, Giáo dục, Công nghệ..."
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent vp-ring-color transition-all duration-200"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Type className="w-4 h-4" />
                <span>Loại <span className="text-red-500">*</span></span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent vp-ring-color transition-all duration-200"
                required
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="w-4 h-4" />
              <span>Tags</span>
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Ví dụ: marketing, content, seo (phân cách bằng dấu phẩy)"
              className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent vp-ring-color transition-all duration-200"
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Phân cách các tags bằng dấu phẩy
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              className="btn-vp-primary-large w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-white text-base sm:text-lg hover:scale-105 active:scale-95"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Tạo Issue trên GitHub</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
              Bằng cách gửi form này, bạn sẽ được chuyển đến trang tạo issue trên GitHub với thông tin đã điền sẵn.
            </p>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span>Hướng dẫn</span>
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <li className="flex items-start space-x-2">
            <span className="font-medium">•</span>
            <span>Điền đầy đủ các trường bắt buộc (có dấu <span className="text-red-500">*</span>)</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-medium">•</span>
            <span>Kiểm tra kỹ nội dung prompt trước khi gửi</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-medium">•</span>
            <span>Issue sẽ được tạo trên GitHub và admin sẽ xem xét</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-medium">•</span>
            <span>Bạn có thể theo dõi tiến trình của issue trên GitHub</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContributionPage;
